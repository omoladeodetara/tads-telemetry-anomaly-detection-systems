import { Telemetry } from '../models/telemetry';
import { ALERT_THRESHOLDS } from './constants';

export class TelemetrySimulator {
    private sensorIds: string[] = ['SENSOR001', 'SENSOR002', 'SENSOR003'];
    private baseTemp: number = 25;
    private basePower: number = 500;
    private anomalyFrequency: number = 0.2; // 20% chance of anomaly
    private simulationActive: boolean = false;
    private intervalId: NodeJS.Timeout | null = null;

    // Add patterns for more realistic data
    private tempPattern: number[] = [0, 1, 2, 1, 0, -1, -2, -1]; // Temperature oscillation pattern
    private patternIndex: number = 0;

    generateTelemetry(): Telemetry {
        const sensorId = this.sensorIds[Math.floor(Math.random() * this.sensorIds.length)];
        const isAnomaly = Math.random() < this.anomalyFrequency;

        // Apply pattern for more realistic changes over time
        this.patternIndex = (this.patternIndex + 1) % this.tempPattern.length;
        const patternFactor = this.tempPattern[this.patternIndex];

        let temperature = this.baseTemp + patternFactor + (Math.random() * 4 - 2);
        let power = this.basePower + (patternFactor * 20) + (Math.random() * 100 - 50);
        let status = 'OPERATIONAL';

        if (isAnomaly) {
            // Generate anomalous data
            const anomalyType = Math.floor(Math.random() * 3); // 0: temp, 1: power, 2: both
            
            if (anomalyType === 0 || anomalyType === 2) {
                // Temperature anomaly
                if (Math.random() < 0.5) {
                    // High temperature
                    temperature = ALERT_THRESHOLDS.temperature.high + (Math.random() * 20);
                } else {
                    // Low temperature
                    temperature = ALERT_THRESHOLDS.temperature.low - (Math.random() * 10);
                }
            }
            
            if (anomalyType === 1 || anomalyType === 2) {
                // Power anomaly
                if (Math.random() < 0.5) {
                    // High power
                    power = ALERT_THRESHOLDS.power.high + (Math.random() * 200);
                } else {
                    // Low power
                    power = ALERT_THRESHOLDS.power.low - (Math.random() * 50);
                }
            }
            
            // Set status based on severity
            if (temperature > ALERT_THRESHOLDS.temperature.high + 10 || 
                power > ALERT_THRESHOLDS.power.high + 100) {
                status = 'CRITICAL';
            } else {
                status = 'WARNING';
            }
        }

        return new Telemetry(
            sensorId,
            new Date().toISOString(),
            {
                temperature,
                power,
                status
            }
        );
    }

    async startSimulation(interval: number = 5000): Promise<void> {
        if (this.simulationActive) {
            console.log('Simulation already running');
            return;
        }

        this.simulationActive = true;
        
        // Send initial data immediately
        this.sendData();
        
        // Then set up interval
        this.intervalId = setInterval(() => {
            this.sendData();
        }, interval);
        
        console.log(`Simulation started - sending data every ${interval/1000} seconds`);
    }
    
    stopSimulation(): void {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
            this.simulationActive = false;
            console.log('Simulation stopped');
        }
    }
    
    private async sendData(): Promise<void> {
        const data = this.generateTelemetry();
        try {
            const response = await fetch('http://localhost:3000/api/telemetry', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                console.log(`Telemetry sent for sensor ${data.sensorId}:`, 
                    `Temp: ${data.reading.temperature.toFixed(1)}°C, ` +
                    `Power: ${data.reading.power.toFixed(1)}W, ` +
                    `Status: ${data.reading.status}`);
            }
        } catch (error) {
            console.error('Failed to send telemetry:', error);
        }
    }
    
    // Add methods to configure the simulator
    setAnomalyFrequency(frequency: number): void {
        if (frequency < 0 || frequency > 1) {
            throw new Error('Frequency must be between 0 and 1');
        }
        this.anomalyFrequency = frequency;
    }
    
    setBaseline(temperature: number, power: number): void {
        this.baseTemp = temperature;
        this.basePower = power;
    }
    
    addSensor(sensorId: string): void {
        if (!this.sensorIds.includes(sensorId)) {
            this.sensorIds.push(sensorId);
        }
    }
    
    removeSensor(sensorId: string): void {
        this.sensorIds = this.sensorIds.filter(id => id !== sensorId);
        if (this.sensorIds.length === 0) {
            throw new Error('Cannot remove all sensors');
        }
    }
}
