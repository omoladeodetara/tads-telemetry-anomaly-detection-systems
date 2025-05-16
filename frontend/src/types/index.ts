// src/types/index.ts

/**
 * Represents telemetry data from a satellite
 */
export interface TelemetryData {
  id?: string;                // Unique identifier (optional for new data)
  sensorId: string;           // Identifier for the sensor
  timestamp: string;          // ISO8601 format
  reading: {
    temperature: number;      // Temperature in degrees Celsius
    power: number;            // Power consumption in watts
    status: string;           // Operational status (e.g., "OPERATIONAL", "WARNING", "CRITICAL")
    signal?: number;          // Signal strength (optional)
    orbit?: string;           // Orbit information (optional)
    position?: {              // Position information (optional)
      x: number;
      y: number;
      z: number;
    };
  };
  metadata?: {               // Optional metadata
    mission?: string;        // Mission identifier
    satellite?: string;      // Satellite identifier
    sourceSystem?: string;   // Source system identifier
    version?: string;        // Data format version
  };
}

/**
 * Represents an alert or anomaly
 */
export interface AlertData {
  id?: string;                              // Unique identifier (optional for new data)
  alertType: string;                        // Type of alert (e.g., "TEMPERATURE_HIGH")
  message: string;                          // Human-readable message
  timestamp: string;                        // ISO8601 format
  sensor?: string;                          // Related sensor ID (optional)
  severity?: 'warning' | 'critical';        // Severity level
  status?: 'active' | 'acknowledged' | 'resolved'; // Alert status
  metadata?: {                              // Optional metadata
    detectionMethod?: string;               // How the anomaly was detected
    confidence?: number;                    // Confidence score (0-1)
    relatedAlerts?: string[];               // IDs of related alerts
  };
}

/**
 * System metrics data
 */
export interface SystemMetrics {
  cpuUsage: number;               // CPU usage percentage
  memoryUsage: number;            // Memory usage percentage
  diskSpace: number;              // Available disk space in GB
  uptime: number;                 // System uptime in seconds
  lastReboot: string;             // ISO8601 date of last reboot
  activeConnections: number;      // Number of active connections
  alertsProcessed: number;        // Number of alerts processed
  dataPointsCollected: number;    // Number of data points collected
  apiResponseTime: number;        // Average API response time in ms
}

/**
 * Sensor information
 */
export interface Sensor {
  id: string;                     // Unique identifier
  name: string;                   // Display name
  type: string;                   // Sensor type
  location: string;               // Physical location
  status: string;                 // Operational status
  lastSeen: string;               // ISO8601 date of last contact
  batteryLevel?: number;          // Battery level percentage (optional)
  firmware?: string;              // Firmware version (optional)
  capabilities?: string[];        // List of capabilities (optional)
}

/**
 * User settings
 */
export interface UserSettings {
  id: string;                     // User ID
  notifications: {
    email: boolean;               // Email notifications enabled
    sms: boolean;                 // SMS notifications enabled
    push: boolean;                // Push notifications enabled
    slack: boolean;               // Slack notifications enabled
  };
  dashboardLayout: string;        // Dashboard layout preference
  theme: 'light' | 'dark' | 'system'; // UI theme preference
  refreshRate: number;            // Data refresh rate in seconds
  timezone: string;               // Preferred timezone
}

/**
 * API response for health check
 */
export interface HealthCheckResponse {
  status: 'ok' | 'error';         // Status of the API
  version: string;                // API version
  timestamp: string;              // ISO8601 timestamp
  uptime: number;                 // API uptime in seconds
  message?: string;               // Optional message
}
