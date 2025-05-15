omoladeodetara: If you we goin to create a prompt to give an ai in an ide to buit this what will it be?

GitHub Copilot: Here's a detailed prompt to guide an AI in building this telemetry and anomaly detection system:

# System Design Prompt

Build a telemetry and anomaly detection system for satellites with these key requirements:

### Core Functionality
- Process real-time telemetry data from multiple satellites
- Support two distinct connection types:
  1. Consistent connectors (steady, low-bandwidth)
  2. Intermittent connectors (periodic, high-bandwidth bursts)
- Detect anomalies in sensor readings (e.g., temperature thresholds)
- Handle out-of-order data processing

### Technical Requirements

1. **Data Ingestion**
```typescript
- Implement buffering mechanisms:
  - Adaptive jitter buffer for consistent connectors
  - Throttled buffer for intermittent connectors
- Support at-least-once delivery
- Handle data deduplication
```

2. **State Management**
```typescript
- Implement hysteresis for state transitions
- Track alert states with configurable thresholds
- Support both stateless processing and stateful monitoring
```

3. **Processing Pipeline**
```typescript
- Process individual data points in real-time
- Support parallel processing using AWS Lambda
- Maintain data order using timestamps
- Implement reconciliation mechanisms
```

4. **Monitoring & Alerting**
```typescript
- Real-time anomaly detection
- Configurable alert thresholds
- Support for different alert types
- Alert correlation analysis
```

### Performance Requirements
- Processing latency < 1 second
- System uptime > 99.9%
- Zero data loss
- Support for high-volume data ingestion

### Architecture Constraints
- Use AWS services (Lambda, Ground Station)
- Implement microservices architecture
- Support horizontal scaling
- Follow event-driven design patterns

### Error Handling
- Implement retry mechanisms
- Handle network timeouts
- Support ground station failover
- Manage split-brain scenarios

### Sample Data Format
```json
{
  "sensorId": "string",
  "timestamp": "ISO8601",
  "reading": {
    "temperature": "number",
    "power": "number",
    "status": "string"
  }
}
```

Would you like me to break down any specific component of this system design prompt further?