// src/models/alert.ts

export class Alert {
    alertType: string;
    message: string;
    timestamp: Date;
    sensorId?: string;

    constructor(alertType: string, message: string, sensorId?: string) {
        this.alertType = alertType;
        this.message = message;
        this.timestamp = new Date();
        this.sensorId = sensorId;
    }
}