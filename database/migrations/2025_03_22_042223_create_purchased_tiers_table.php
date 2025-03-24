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
        Schema::create('purchased_tiers', function (Blueprint $table) {
            $table->uuid('purchased_tier_id')->primary();
            $table->uuid('tier_id');
            $table->uuid('user_id');
            $table->timestamps();

            $table->foreign('tier_id')->references('tier_id')->on('tiers')->onDelete('cascade');
            $table->foreign('user_id')->references('user_id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('purchased_tiers');
    }
};
