// src/services/buffer.ts
import { Telemetry } from '../models/telemetry';

export class BufferService {
    private consistentBuffer: Telemetry[] = [];
    private intermittentBuffer: Telemetry[] = [];
    private maxBufferSize: number = 1000; // Limit buffer size to prevent memory issues

    constructor(maxBufferSize: number = 1000) {
        this.maxBufferSize = maxBufferSize;
    }

    public addToConsistentBuffer(data: Telemetry): void {
        this.consistentBuffer.push(data);
        // Maintain buffer size
        if (this.consistentBuffer.length > this.maxBufferSize) {
            this.consistentBuffer.shift(); // Remove oldest data
        }
    }

    public addToIntermittentBuffer(data: Telemetry): void {
        this.intermittentBuffer.push(data);
        // Maintain buffer size
        if (this.intermittentBuffer.length > this.maxBufferSize) {
            this.intermittentBuffer.shift(); // Remove oldest data
        }
    }

    public getConsistentBuffer(): Telemetry[] {
        return this.consistentBuffer;
    }

    public getIntermittentBuffer(): Telemetry[] {
        return this.intermittentBuffer;
    }

    public getLatestData(count: number = 10): Telemetry[] {
        return this.consistentBuffer.slice(-count);
    }

    public getDataByTimeRange(startTime: Date, endTime: Date): Telemetry[] {
        return this.consistentBuffer.filter(data => {
            const timestamp = new Date(data.timestamp);
            return timestamp >= startTime && timestamp <= endTime;
        });
    }

    public clearConsistentBuffer(): void {
        this.consistentBuffer = [];
    }

    public clearIntermittentBuffer(): void {
        this.intermittentBuffer = [];
    }
}