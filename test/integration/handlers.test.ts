import { ingestData } from '../../src/handlers/dataIngestion';
import { detectAnomalies } from '../../src/handlers/anomalyDetection';
import { Telemetry } from '../../src/models/telemetry';
import { Alert } from '../../src/models/alert';

describe('Data Ingestion Handler', () => {
    it('should process incoming telemetry data correctly', () => {
        const telemetryData = new Telemetry('sensor1', new Date().toISOString(), { temperature: 25, power: 100, status: 'ok' });
        const result = ingestData(telemetryData);
        expect(result).toBeTruthy();
    });
});

describe('Anomaly Detection Handler', () => {
    it('should detect anomalies in telemetry data', () => {
        const telemetryData = new Telemetry('sensor1', new Date().toISOString(), { temperature: 100, power: 100, status: 'ok' });
        const alert = detectAnomalies(telemetryData);
        expect(alert).toBeInstanceOf(Alert);
        expect(alert.alertType).toBe('anomaly');
    });
});