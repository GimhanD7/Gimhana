<?php
declare(strict_types=1);

$requestHost = strtolower(explode(':', $_SERVER['HTTP_HOST'] ?? '')[0]);
$isProduction = $requestHost === 'sudesh.sudeshmaths.com';
$databaseConfigPath = __DIR__ . ($isProduction ? '/config.production.php' : '/config.local.php');
$databaseOverride = is_file($databaseConfigPath) ? require $databaseConfigPath : [];

return [
    'database' => [
        'host' => $databaseOverride['host'] ?? getenv('PORTFOLIO_DB_HOST') ?: '127.0.0.1',
        'port' => $databaseOverride['port'] ?? getenv('PORTFOLIO_DB_PORT') ?: '3306',
        'name' => $databaseOverride['name'] ?? getenv('PORTFOLIO_DB_NAME') ?: 'gimhana_portfolio',
        'user' => $databaseOverride['user'] ?? getenv('PORTFOLIO_DB_USER') ?: 'root',
        'password' => $databaseOverride['password'] ?? getenv('PORTFOLIO_DB_PASSWORD') ?: '',
        'charset' => 'utf8mb4',
    ],
    'session_name' => 'gimhana_admin',
    'allowed_origins' => array_values(array_filter(array_map(
        'trim',
        explode(',', getenv('PORTFOLIO_ALLOWED_ORIGINS') ?: implode(',', [
            'http://localhost:3000',
            'http://127.0.0.1:3000',
            'https://gimhan.me',
            'https://www.gimhan.me',
        ]))
    ))),
];
