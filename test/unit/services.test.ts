import { BufferService } from '../../src/services/buffer';
import { ProcessorService } from '../../src/services/processor';
import { MonitorService } from '../../src/services/monitor';

describe('BufferService', () => {
    let bufferService: BufferService;

    beforeEach(() => {
        bufferService = new BufferService();
    });

    it('should initialize with an empty buffer', () => {
        expect(bufferService.getBuffer()).toEqual([]);
    });

    it('should add data to the buffer', () => {
        bufferService.addToBuffer({ sensorId: '1', timestamp: new Date().toISOString(), reading: { temperature: 25, power: 100, status: 'ok' } });
        expect(bufferService.getBuffer().length).toBe(1);
    });
});

describe('ProcessorService', () => {
    let processorService: ProcessorService;

    beforeEach(() => {
        processorService = new ProcessorService();
    });

    it('should process telemetry data correctly', () => {
        const result = processorService.process({ sensorId: '1', timestamp: new Date().toISOString(), reading: { temperature: 25, power: 100, status: 'ok' } });
        expect(result).toBeTruthy();
    });
});

describe('MonitorService', () => {
    let monitorService: MonitorService;

    beforeEach(() => {
        monitorService = new MonitorService();
    });

    it('should trigger an alert when threshold is exceeded', () => {
        const alert = monitorService.checkThreshold({ sensorId: '1', timestamp: new Date().toISOString(), reading: { temperature: 100, power: 100, status: 'alert' } });
        expect(alert).toBeDefined();
    });
});