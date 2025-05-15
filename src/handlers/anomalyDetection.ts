import { Telemetry } from '../models/telemetry';
import { Alert } from '../models/alert';
import { ALERT_THRESHOLDS } from '../utils/constants';

export function detectAnomalies(data: Telemetry[]): Alert[] {
    const alerts: Alert[] = [];

    data.forEach((telemetry) => {
        if (telemetry.reading.temperature > ALERT_THRESHOLDS.temperature) {
            alerts.push(new Alert('TemperatureAlert', `High temperature detected for sensor ${telemetry.sensorId}`, telemetry.timestamp));
        }
        if (telemetry.reading.power > ALERT_THRESHOLDS.power) {
            alerts.push(new Alert('PowerAlert', `High power usage detected for sensor ${telemetry.sensorId}`, telemetry.timestamp));
        }
        // Additional anomaly checks can be added here
    });

    return alerts;
}