<?php
declare(strict_types=1);

return [
    'database' => [
        'host' => getenv('PORTFOLIO_DB_HOST') ?: '127.0.0.1',
        'port' => getenv('PORTFOLIO_DB_PORT') ?: '3306',
        'name' => getenv('PORTFOLIO_DB_NAME') ?: 'gimhana_portfolio',
        'user' => getenv('PORTFOLIO_DB_USER') ?: 'root',
        'password' => getenv('PORTFOLIO_DB_PASSWORD') ?: '',
        'charset' => 'utf8mb4',
    ],
    'session_name' => 'gimhana_admin',
];
