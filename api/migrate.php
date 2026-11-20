<?php
declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

try {
    $pdo = db();
    auto_migrate($pdo);

    if (PHP_SAPI === 'cli') {
        echo "Database schema auto-migrated successfully.\n";
        echo "All tables are ready. No default data was inserted.\n";
    } else {
        respond([
            'status' => 'ok',
            'message' => 'Database schema auto-migrated successfully. No default data was inserted.',
        ]);
    }
} catch (Throwable $e) {
    if (PHP_SAPI === 'cli') {
        fwrite(STDERR, "Migration failed: " . $e->getMessage() . "\n");
        exit(1);
    } else {
        respond(['error' => 'Migration failed: ' . $e->getMessage()], 500);
    }
}
