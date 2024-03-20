<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('sessions', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->foreignId('room_id')->constrained();
            $table->string('title', 255);
            $table->string('speaker', 45);
            $table->mediumText('description');
            $table->dateTime('start');
            $table->dateTime('end');
            $table->decimal('cost', 9, 2);
            $table->enum('type', ['talk', 'workshop']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::drop('sessions');
    }
};
