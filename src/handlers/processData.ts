import { Telemetry } from '../models/telemetry';

export function processData(data: Telemetry): Telemetry {
    // Apply any data processing logic here
    // For example: data normalization, smoothing, etc.
    
    console.log(`Processed data from sensor ${data.sensorId}:`, 
        `Temp: ${data.reading.temperature.toFixed(1)}°C, ` +
        `Power: ${data.reading.power.toFixed(1)}W, ` +
        `Status: ${data.reading.status}`);
    
    return data;
}

// For backward compatibility, keeping the old function name
export function processIncomingData(data: Telemetry): void {
    // This is now just a wrapper for the buffer service which is handled in the ingestData function
    console.log(`Legacy processing called for sensor ${data.sensorId}`);
}
