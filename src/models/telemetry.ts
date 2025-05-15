// src/models/telemetry.ts

export class Telemetry {
    sensorId: string;
    timestamp: string;
    reading: {
        temperature: number;
        power: number;
        status: string;
    };

    constructor(sensorId: string, timestamp: string, reading: { temperature: number; power: number; status: string }) {
        this.sensorId = sensorId;
        this.timestamp = timestamp;
        this.reading = reading;
    }
}