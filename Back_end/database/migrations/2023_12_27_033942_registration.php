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
        Schema::create('registrations', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->foreignId('attendee_id')->constrained();
            $table->foreignId('ticket_id')->constrained(
                table: 'event_tickets',
                indexName: 'reg_ticket_id'
            );
            $table->datetime('registration_time');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::drop('registrations');
    }
};
