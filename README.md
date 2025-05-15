# TADS Telemetry Anomaly Detection System

## Overview
The TADS Telemetry Anomaly Detection System is designed to process real-time telemetry data from satellites, detect anomalies, and manage alerts. The system supports both consistent and intermittent data connections, ensuring robust data handling and analysis.

## Features
- Real-time telemetry data processing
- Anomaly detection based on predefined thresholds
- Support for steady, low-bandwidth connections
- Management of periodic, high-bandwidth bursts
- Configurable alerting mechanisms

## Project Structure
```
tads-telemetry-system
├── src
│   ├── connectors        # Contains connection handling classes
│   ├── handlers          # Contains data ingestion and anomaly detection functions
│   ├── models            # Contains data models for telemetry and alerts
│   ├── services          # Contains services for buffering, processing, and monitoring
│   ├── utils             # Contains utility functions and constants
│   └── types             # Contains TypeScript interfaces and types
├── test                  # Contains integration and unit tests
├── serverless.yml       # Configuration for AWS Lambda deployment
├── package.json          # npm configuration file
├── tsconfig.json         # TypeScript configuration file
└── README.md             # Project documentation
```

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd tads-telemetry-system
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure AWS credentials for deployment.

4. Deploy the application:
   ```bash
   serverless deploy
   ```

## Usage
- The system can be integrated with satellite telemetry data sources.
- Configure alert thresholds in the `constants.ts` file.
- Use the `ingestData` function to process incoming telemetry data.
- Monitor alerts through the `MonitorService`.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for discussion.

## License
This project is licensed under the MIT License.