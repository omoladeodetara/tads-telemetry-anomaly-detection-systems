import { TelemetrySimulator } from './utils/simulator';

console.log('Starting telemetry simulation...');
console.log('Press Ctrl+C to stop');

const simulator = new TelemetrySimulator();
simulator.startSimulation(2000).catch(error => {
    console.error('Simulation error:', error);
});

// Log that simulation has started
console.log('Simulator is running and sending data every 2 seconds...');
