import { Telemetry } from '../models/telemetry';
import { BufferService } from '../services/buffer';

const bufferService = new BufferService();

export function ingestData(data: Telemetry): Telemetry {
    // Validate incoming data
    if (!data.sensorId || !data.timestamp || !data.reading) {
        throw new Error('Invalid telemetry data');
    }

    // Add to consistent buffer for real-time processing
    bufferService.addToConsistentBuffer(data);
    
    console.log(`Ingested data from sensor ${data.sensorId}:`, 
        `Temp: ${data.reading.temperature}°C, ` +
        `Power: ${data.reading.power}W, ` +
        `Status: ${data.reading.status}`);
    
    // Return the data for any additional processing
    return data;
}