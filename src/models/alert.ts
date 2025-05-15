// src/models/alert.ts

export class Alert {
    alertType: string;
    message: string;
    timestamp: Date;

    constructor(alertType: string, message: string) {
        this.alertType = alertType;
        this.message = message;
        this.timestamp = new Date();
    }
}