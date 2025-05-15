// src/utils/validators.ts

export function validateTelemetryData(data: any): boolean {
    const requiredFields = ['sensorId', 'timestamp', 'reading'];
    const hasRequiredFields = requiredFields.every(field => field in data);
    
    if (!hasRequiredFields) {
        return false;
    }

    const { reading } = data;
    const hasValidReading = typeof reading.temperature === 'number' &&
                            typeof reading.power === 'number' &&
                            typeof reading.status === 'string';

    return hasValidReading;
}

export function validateAlertData(data: any): boolean {
    const requiredFields = ['alertType', 'message', 'timestamp'];
    const hasRequiredFields = requiredFields.every(field => field in data);
    
    return hasRequiredFields;
}