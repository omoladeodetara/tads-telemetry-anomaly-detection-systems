import { Telemetry } from '../models/telemetry';
import { Alert } from '../models/alert';
import { ALERT_THRESHOLDS } from '../utils/constants';

export function detectAnomalies(data: Telemetry[]): Alert[] {
    const alerts: Alert[] = [];

    data.forEach((telemetry) => {
        // Check for temperature anomalies
        if (telemetry.reading.temperature > ALERT_THRESHOLDS.temperature.high) {
            alerts.push(new Alert(
                'TemperatureAlert', 
                `High temperature detected for sensor ${telemetry.sensorId} (${telemetry.reading.temperature.toFixed(1)}°C)`
            ));
        }
        if (telemetry.reading.temperature < ALERT_THRESHOLDS.temperature.low) {
            alerts.push(new Alert(
                'TemperatureAlert', 
                `Low temperature detected for sensor ${telemetry.sensorId} (${telemetry.reading.temperature.toFixed(1)}°C)`
            ));
        }
        
        // Check for power anomalies
        if (telemetry.reading.power > ALERT_THRESHOLDS.power.high) {
            alerts.push(new Alert(
                'PowerAlert', 
                `High power usage detected for sensor ${telemetry.sensorId} (${telemetry.reading.power.toFixed(1)}W)`
            ));
        }
        if (telemetry.reading.power < ALERT_THRESHOLDS.power.low) {
            alerts.push(new Alert(
                'PowerAlert', 
                `Low power usage detected for sensor ${telemetry.sensorId} (${telemetry.reading.power.toFixed(1)}W)`
            ));
        }
        
        // Check for status anomalies
        if (telemetry.reading.status.toUpperCase() !== 'OPERATIONAL') {
            alerts.push(new Alert(
                'StatusAlert', 
                `Abnormal status for sensor ${telemetry.sensorId}: ${telemetry.reading.status}`
            ));
        }
    });

    return alerts;
}