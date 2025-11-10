<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use Illuminate\Support\Facades\DB;

// Check if migration exists
    DB::table('migrations')->insert([
        'migration' => '2025_10_21_000000_create_sessions_table',
        'batch' => 1
    ]);
    echo "Sessions migration marked as done.\n";
} else {
    echo "Sessions migration already exists.\n";
}
