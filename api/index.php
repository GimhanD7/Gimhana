<?php
declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

$action = $_GET['action'] ?? 'projects';

if ($action === 'health') {
    require_method('GET');
    db()->query('SELECT 1');
    respond(['status' => 'ok']);
}

if ($action === 'session') {
    require_method('GET');
    respond([
        'authenticated' => is_authenticated(),
        'username' => $_SESSION['username'] ?? null,
        'csrfToken' => is_authenticated() ? csrf_token() : null,
    ]);
}

if ($action === 'login') {
    require_method('POST');
    $input = body();
    $username = clean_string($input['username'] ?? '', 80, true);
    $password = is_string($input['password'] ?? null) ? $input['password'] : '';

    $statement = db()->prepare('SELECT id, username, password_hash FROM admins WHERE username = ? LIMIT 1');
    $statement->execute([$username]);
    $admin = $statement->fetch();

    if (!$admin || !password_verify($password, $admin['password_hash'])) {
        usleep(350000);
        respond(['error' => 'Invalid username or password.'], 401);
    }

    session_regenerate_id(true);
    $_SESSION['admin_id'] = (int) $admin['id'];
    $_SESSION['username'] = $admin['username'];
    unset($_SESSION['csrf_token']);

    respond([
        'authenticated' => true,
        'username' => $admin['username'],
        'csrfToken' => csrf_token(),
    ]);
}

if ($action === 'logout') {
    require_method('POST');
    require_auth();
    require_csrf();
    $_SESSION = [];
    if (ini_get('session.use_cookies')) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000, $params['path'], '', $params['secure'], $params['httponly']);
    }
    session_destroy();
    respond(['authenticated' => false]);
}

if ($action === 'reorder-projects') {
    require_method('POST');
    require_auth();
    require_csrf();

    $input = body();
    $orderedIds = is_array($input['projectIds'] ?? null) ? $input['projectIds'] : [];
    $orderedIds = array_values(array_unique(array_filter(array_map(
        fn ($id) => filter_var($id, FILTER_VALIDATE_INT, ['options' => ['min_range' => 1]]) ?: null,
        $orderedIds
    ))));

    if ($orderedIds === [] || count($orderedIds) > 500) {
        respond(['error' => 'A valid project order is required.'], 422);
    }

    $pdo = db();
    try {
        $pdo->beginTransaction();
        $statement = $pdo->prepare('UPDATE projects SET display_order = ? WHERE id = ?');
        foreach ($orderedIds as $position => $projectId) {
            $statement->execute([$position, $projectId]);
        }
        $pdo->commit();
        respond(['reordered' => true]);
    } catch (Throwable $error) {
        if ($pdo->inTransaction()) {
            $pdo->rollBack();
        }
        respond(['error' => 'Unable to save project order.'], 500);
    }
}

if ($action === 'projects') {
    require_method('GET', 'POST');

    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $rows = db()->query('SELECT id FROM projects ORDER BY display_order, id DESC')->fetchAll();
        $projects = array_values(array_filter(array_map(
            fn ($row) => load_project((int) $row['id']),
            $rows
        )));
        respond(['projects' => $projects]);
    }

    require_auth();
    require_csrf();
    $project = project_payload(body());
    $pdo = db();
    try {
        $pdo->beginTransaction();
        $statement = $pdo->prepare(
            'INSERT INTO projects (title, period, description, category, image, display_order)
             VALUES (?, ?, ?, ?, ?, (SELECT next_order FROM (SELECT COALESCE(MAX(display_order), -1) + 1 AS next_order FROM projects) AS value))'
        );
        $statement->execute([
            $project['title'], $project['period'], $project['description'],
            $project['category'], $project['image'],
        ]);
        $id = (int) $pdo->lastInsertId();
        replace_relations($pdo, $id, $project);
        $pdo->commit();
        respond(['project' => load_project($id)], 201);
    } catch (Throwable $error) {
        if ($pdo->inTransaction()) {
            $pdo->rollBack();
        }
        respond(['error' => 'Unable to create project.'], 500);
    }
}

if ($action === 'project') {
    $id = filter_input(INPUT_GET, 'id', FILTER_VALIDATE_INT);
    if (!$id) {
        respond(['error' => 'A valid project ID is required.'], 400);
    }

    require_method('GET', 'PUT', 'DELETE');

    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $project = load_project($id);
        $project ? respond(['project' => $project]) : respond(['error' => 'Project not found.'], 404);
    }

    require_auth();
    require_csrf();

    if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
        $statement = db()->prepare('DELETE FROM projects WHERE id = ?');
        $statement->execute([$id]);
        if ($statement->rowCount() === 0) {
            respond(['error' => 'Project not found.'], 404);
        }
        respond(['deleted' => true]);
    }

    $project = project_payload(body());
    $pdo = db();
    try {
        $pdo->beginTransaction();
        $statement = $pdo->prepare(
            'UPDATE projects SET title = ?, period = ?, description = ?, category = ?, image = ? WHERE id = ?'
        );
        $statement->execute([
            $project['title'], $project['period'], $project['description'],
            $project['category'], $project['image'], $id,
        ]);
        if ($statement->rowCount() === 0 && load_project($id) === null) {
            $pdo->rollBack();
            respond(['error' => 'Project not found.'], 404);
        }
        replace_relations($pdo, $id, $project);
        $pdo->commit();
        respond(['project' => load_project($id)]);
    } catch (Throwable $error) {
        if ($pdo->inTransaction()) {
            $pdo->rollBack();
        }
        respond(['error' => 'Unable to update project.'], 500);
    }
}

respond(['error' => 'API route not found.'], 404);
