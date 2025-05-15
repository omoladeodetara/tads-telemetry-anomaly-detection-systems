import { Telemetry } from '../models/telemetry';
import { BufferService } from '../services/buffer';

export class IntermittentConnector {
    private buffer: BufferService;

    constructor() {
        this.buffer = new BufferService();
    }

    async sendData(data: Telemetry): Promise<void> {
        this.buffer.addToIntermittentBuffer(data);
        // When connection is available, process buffer
        if (this.isConnectionAvailable()) {
            const buffer = this.buffer.getIntermittentBuffer();
            // Process the buffer here
            // Clear the buffer after processing
            this.buffer.clearIntermittentBuffer();
        }
    }

    private isConnectionAvailable(): boolean {
        // Simulate intermittent connection
        return Math.random() > 0.5;
    }
}