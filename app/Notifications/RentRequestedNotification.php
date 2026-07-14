<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class RentRequestedNotification extends Notification
{
    use Queueable;

    public $rentRequest;

    /**
     * Create a new notification instance.
     */
    public function __construct($rentRequest)
    {
        $this->rentRequest = $rentRequest;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database']; // We only want database notification for now
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'rent_request_id' => $this->rentRequest->id,
            'car_id' => $this->rentRequest->car_id,
            'car_name' => $this->rentRequest->car->name,
            'client_id' => $this->rentRequest->client_id,
            'client_name' => $this->rentRequest->client->name,
            'message' => "{$this->rentRequest->client->name} requested to rent your {$this->rentRequest->car->name}."
        ];
    }
}
