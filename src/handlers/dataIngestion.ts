import { Telemetry } from '../models/telemetry';
import { BufferService } from '../services/buffer';

const bufferService = new BufferService();

export function ingestData(data: Telemetry): void {
    // Validate incoming data
    if (!data.sensorId || !data.timestamp || !data.reading) {
        throw new Error('Invalid telemetry data');
    }

    // Manage buffering
    bufferService.addData(data);
}