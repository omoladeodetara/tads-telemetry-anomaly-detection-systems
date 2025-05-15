import express, { Request, Response } from 'express';
import path from 'path';
import { Telemetry } from './models/telemetry';
import { processData, processIncomingData } from './handlers/processData';
import { detectAnomalies } from './handlers/anomalyDetection';
import { BufferService } from './services/buffer';
import { ingestData } from './handlers/dataIngestion';
import { Alert } from './models/alert';

// Initialize services
const bufferService = new BufferService();

// Store detected anomalies
let detectedAnomalies: Alert[] = [];

const app = express();
app.use(express.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '../public')));

const PORT = process.env.PORT || 3000;

// Route for dashboard
app.get('/dashboard', (_req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../public/dashboard.html'));
});

// API Routes
app.post('/api/telemetry', (req: Request, res: Response) => {
    try {
        const telemetryData = req.body as Telemetry;
        
        // Process the data through our pipeline
        const ingestedData = ingestData(telemetryData);
        const processedData = processData(ingestedData);
        
        // Detect anomalies
        const anomalies = detectAnomalies([processedData]);
        
        // Store anomalies if detected
        if (anomalies && anomalies.length > 0) {
            detectedAnomalies = [...detectedAnomalies, ...anomalies];
            console.log('New anomalies detected:', anomalies);
        }
        
        res.status(200).json({ 
            message: 'Telemetry data received', 
            anomaliesDetected: anomalies?.length || 0 
        });
    } catch (error) {
        console.error('Error processing telemetry data:', error);
        res.status(400).json({ error: 'Invalid telemetry data' });
    }
});

app.get('/api/anomalies', (_req: Request, res: Response) => {
    res.status(200).json(detectedAnomalies);
});

// API endpoint to clear anomalies
app.delete('/api/anomalies', (_req: Request, res: Response) => {
    detectedAnomalies = [];
    res.status(200).json({ message: 'All anomalies cleared' });
});

// API endpoint to get the latest telemetry data
app.get('/api/telemetry', (_req: Request, res: Response) => {
    const latestData = bufferService.getLatestData(20); // Get the 20 most recent readings
    res.status(200).json(latestData);
});

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
    res.status(200).json({ status: 'ok' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`Dashboard available at http://localhost:${PORT}/dashboard`);
});
