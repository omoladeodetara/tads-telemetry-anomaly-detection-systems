// src/types/index.ts

export interface TelemetryData {
    sensorId: string;
    timestamp: string; // ISO8601 format
    reading: {
        temperature: number;
        power: number;
        status: string;
    };
}

export interface AlertData {
    alertType: string;
    message: string;
    timestamp: string; // ISO8601 format
}