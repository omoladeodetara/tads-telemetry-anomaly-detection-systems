'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  fetchTelemetryData, 
  fetchAnomalies, 
  checkHealth, 
  fetchSystemMetrics,
  fetchSensors
} from '@/services/api';
import { TelemetryData, AlertData, SystemMetrics, Sensor, HealthCheckResponse } from '@/types';

interface TelemetryContextType {
  telemetryData: TelemetryData[];
  alerts: AlertData[];
  systemMetrics: SystemMetrics | null;
  healthStatus: HealthCheckResponse | null;
  sensors: Sensor[];
  loading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
  refreshInterval: number;
  setRefreshInterval: (interval: number) => void;
}

const defaultContextValue: TelemetryContextType = {
  telemetryData: [],
  alerts: [],
  systemMetrics: null,
  healthStatus: null,
  sensors: [],
  loading: false,
  error: null,
  refreshData: async () => {},
  refreshInterval: 30000, // Default refresh interval: 30 seconds
  setRefreshInterval: () => {},
};

const TelemetryContext = createContext<TelemetryContextType>(defaultContextValue);

export function TelemetryProvider({ children }: { children: ReactNode }) {
  const [telemetryData, setTelemetryData] = useState<TelemetryData[]>([]);
  const [alerts, setAlerts] = useState<AlertData[]>([]);
  const [systemMetrics, setSystemMetrics] = useState<SystemMetrics | null>(null);
  const [healthStatus, setHealthStatus] = useState<HealthCheckResponse | null>(null);
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshInterval, setRefreshInterval] = useState(30000); // 30 seconds default
  
  const refreshData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch data in parallel for efficiency
      const [telemetry, anomalies, health, metrics, sensorData] = await Promise.all([
        fetchTelemetryData(100), // Limit to 100 most recent data points
        fetchAnomalies(),
        checkHealth(),
        fetchSystemMetrics().catch(() => null), // Optional endpoint
        fetchSensors().catch(() => [])          // Optional endpoint
      ]);
      
      setTelemetryData(telemetry);
      setAlerts(anomalies);
      setHealthStatus(health);
      
      if (metrics) {
        setSystemMetrics(metrics);
      }
      
      if (sensorData && Array.isArray(sensorData)) {
        setSensors(sensorData);
      }
    } catch (err) {
      console.error('Error fetching telemetry data:', err);
      setError('Failed to load telemetry data. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // Refresh data on initial load
  useEffect(() => {
    refreshData();
  }, []);
  
  // Set up auto-refresh on interval
  useEffect(() => {
    if (refreshInterval <= 0) return;
    
    const intervalId = setInterval(() => {
      refreshData();
    }, refreshInterval);
    
    return () => clearInterval(intervalId);
  }, [refreshInterval]);
  
  const value = {
    telemetryData,
    alerts,
    systemMetrics,
    healthStatus,
    sensors,
    loading,
    error,
    refreshData,
    refreshInterval,
    setRefreshInterval,
  };
  
  return (
    <TelemetryContext.Provider value={value}>
      {children}
    </TelemetryContext.Provider>
  );
}

export function useTelemetry() {
  const context = useContext(TelemetryContext);
  if (context === undefined) {
    throw new Error('useTelemetry must be used within a TelemetryProvider');
  }
  return context;
}
