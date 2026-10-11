<?php
require __DIR__ . '/bootstrap.php';

$username = $argv[1] ?? null;
$password = $argv[2] ?? null;

if (!$username || !$password) {
    echo "Usage: php add_admin_cli.php <username> <password>\n";
    exit(1);
}

$hash = password_hash($password, PASSWORD_DEFAULT);
$stmt = db()->prepare('INSERT INTO admins (username, password_hash) VALUES (?, ?)');

try {
    $stmt->execute([$username, $hash]);
    echo "Admin '$username' added successfully.\n";
} catch (PDOException $e) {
    if ($e->getCode() === '23000') {
        echo "Error: Username '$username' already exists.\n";
    } else {
        echo "Database error: " . $e->getMessage() . "\n";
    }
}
