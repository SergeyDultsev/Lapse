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
        Schema::create('subscriptions', function (Blueprint $table) {
            $table->uuid('subscription_id')->primary();
            $table->uuid('subscriber_id');
            $table->uuid('target_id');
            $table->timestamps();

            $table->foreign('subscriber_id')->references('user_id')->on('users')->onDelete('cascade');
            $table->foreign('target_id')->references('user_id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('subscriptions');
    }
};
