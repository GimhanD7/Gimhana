<?php
declare(strict_types=1);

$config = require __DIR__ . '/config.php';

ini_set('display_errors', '0');
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('Referrer-Policy: same-origin');

$requestOrigin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($requestOrigin !== '' && in_array($requestOrigin, $config['allowed_origins'], true)) {
    header('Access-Control-Allow-Origin: ' . $requestOrigin);
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Allow-Headers: Content-Type, X-CSRF-Token');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Vary: Origin');
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    if ($requestOrigin === '' || !in_array($requestOrigin, $config['allowed_origins'], true)) {
        http_response_code(403);
    } else {
        http_response_code(204);
    }
    exit;
}

$isSecureRequest = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off';
session_name($config['session_name']);
session_set_cookie_params([
    'lifetime' => 0,
    'path' => '/',
    'secure' => $isSecureRequest,
    'httponly' => true,
    'samesite' => $isSecureRequest ? 'None' : 'Lax',
]);
session_start();

function respond(array $data, int $status = 200): never
{
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

function body(): array
{
    $raw = file_get_contents('php://input');
    if ($raw === false || $raw === '') {
        return [];
    }

    try {
        $value = json_decode($raw, true, 512, JSON_THROW_ON_ERROR);
    } catch (JsonException) {
        respond(['error' => 'Invalid JSON body.'], 400);
    }

    return is_array($value) ? $value : [];
}

function db(): PDO
{
    static $pdo = null;
    global $config;

    if ($pdo instanceof PDO) {
        return $pdo;
    }

    $database = $config['database'];
    $dsn = sprintf(
        'mysql:host=%s;port=%s;dbname=%s;charset=%s',
        $database['host'],
        $database['port'],
        $database['name'],
        $database['charset']
    );

    try {
        $pdo = new PDO($dsn, $database['user'], $database['password'], [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]);
    } catch (PDOException) {
        respond(['error' => 'Database connection failed. Check api/config.php and import database.sql.'], 503);
    }

    return $pdo;
}

function require_method(string ...$methods): void
{
    if (!in_array($_SERVER['REQUEST_METHOD'], $methods, true)) {
        header('Allow: ' . implode(', ', $methods));
        respond(['error' => 'Method not allowed.'], 405);
    }
}

function is_authenticated(): bool
{
    return isset($_SESSION['admin_id']) && is_int($_SESSION['admin_id']);
}

function require_auth(): void
{
    if (!is_authenticated()) {
        respond(['error' => 'Authentication required.'], 401);
    }
}

function csrf_token(): string
{
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }

    return $_SESSION['csrf_token'];
}

function require_csrf(): void
{
    $provided = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? '';
    if ($provided === '' || !hash_equals(csrf_token(), $provided)) {
        respond(['error' => 'Invalid security token. Refresh and try again.'], 419);
    }
}

function clean_string(mixed $value, int $maxLength, bool $required = false): string
{
    $value = trim(is_string($value) ? $value : '');
    if ($required && $value === '') {
        respond(['error' => 'Required project fields are missing.'], 422);
    }
    if (mb_strlen($value) > $maxLength) {
        respond(['error' => "A field exceeds the {$maxLength} character limit."], 422);
    }
    return $value;
}

function normalize_url(mixed $value, bool $allowDataImage = false): string
{
    $value = trim(is_string($value) ? $value : '');
    if ($value === '') {
        return '';
    }
    if ($allowDataImage && preg_match('#^data:image/(jpeg|png|webp);base64,#i', $value)) {
        return $value;
    }
    if (!filter_var($value, FILTER_VALIDATE_URL) || !preg_match('#^https?://#i', $value)) {
        respond(['error' => 'Image and project links must be valid HTTP(S) URLs.'], 422);
    }
    return $value;
}

function project_payload(array $input): array
{
    $technologies = array_values(array_unique(array_filter(array_map(
        fn ($item) => clean_string($item, 80),
        is_array($input['technologies'] ?? null) ? $input['technologies'] : []
    ))));

    $links = [];
    foreach (is_array($input['links'] ?? null) ? $input['links'] : [] as $link) {
        if (!is_array($link)) {
            continue;
        }
        $links[] = [
            'label' => clean_string($link['label'] ?? '', 100, true),
            'url' => normalize_url($link['url'] ?? ''),
        ];
    }

    $gallery = [];
    foreach (array_slice(is_array($input['gallery'] ?? null) ? $input['gallery'] : [], 0, 20) as $image) {
        $gallery[] = normalize_url($image, true);
    }

    return [
        'title' => clean_string($input['title'] ?? '', 180, true),
        'period' => clean_string($input['period'] ?? '', 100, true),
        'description' => clean_string($input['description'] ?? '', 10000, true),
        'category' => clean_string($input['category'] ?? 'Web Development', 100, true),
        'image' => normalize_url($input['image'] ?? '', true),
        'technologies' => $technologies,
        'links' => $links,
        'gallery' => $gallery,
    ];
}

function load_project(int $id): ?array
{
    $pdo = db();
    $statement = $pdo->prepare(
        'SELECT id, title, period, description, category, image, created_at, updated_at
         FROM projects WHERE id = ?'
    );
    $statement->execute([$id]);
    $project = $statement->fetch();
    if (!$project) {
        return null;
    }

    $technologyStatement = $pdo->prepare(
        'SELECT technology FROM project_technologies WHERE project_id = ? ORDER BY sort_order, id'
    );
    $technologyStatement->execute([$id]);
    $project['technologies'] = array_column($technologyStatement->fetchAll(), 'technology');

    $linkStatement = $pdo->prepare(
        'SELECT label, url FROM project_links WHERE project_id = ? ORDER BY sort_order, id'
    );
    $linkStatement->execute([$id]);
    $project['links'] = $linkStatement->fetchAll();

    $galleryStatement = $pdo->prepare(
        'SELECT image FROM project_gallery WHERE project_id = ? ORDER BY sort_order, id'
    );
    $galleryStatement->execute([$id]);
    $project['gallery'] = array_column($galleryStatement->fetchAll(), 'image');
    $project['id'] = (string) $project['id'];

    return $project;
}

function replace_relations(PDO $pdo, int $projectId, array $project): void
{
    foreach (['project_technologies', 'project_links', 'project_gallery'] as $table) {
        $statement = $pdo->prepare("DELETE FROM {$table} WHERE project_id = ?");
        $statement->execute([$projectId]);
    }

    $technologyStatement = $pdo->prepare(
        'INSERT INTO project_technologies (project_id, technology, sort_order) VALUES (?, ?, ?)'
    );
    foreach ($project['technologies'] as $index => $technology) {
        $technologyStatement->execute([$projectId, $technology, $index]);
    }

    $linkStatement = $pdo->prepare(
        'INSERT INTO project_links (project_id, label, url, sort_order) VALUES (?, ?, ?, ?)'
    );
    foreach ($project['links'] as $index => $link) {
        $linkStatement->execute([$projectId, $link['label'], $link['url'], $index]);
    }

    $galleryStatement = $pdo->prepare(
        'INSERT INTO project_gallery (project_id, image, sort_order) VALUES (?, ?, ?)'
    );
    foreach ($project['gallery'] as $index => $image) {
        $galleryStatement->execute([$projectId, $image, $index]);
    }
}
