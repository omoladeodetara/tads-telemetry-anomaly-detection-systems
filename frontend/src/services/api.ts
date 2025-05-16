import { AlertData, TelemetryData } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

/**
 * Fetches telemetry data from the backend
 * @param limit Optional limit for the number of records to return
 * @param startDate Optional start date for filtering (ISO string)
 * @param endDate Optional end date for filtering (ISO string)
 * @returns Promise with telemetry data array
 */
export async function fetchTelemetryData(limit?: number, startDate?: string, endDate?: string) {
  try {
    let url = `${API_URL}/telemetry`;
    
    // Add query parameters if provided
    const params = new URLSearchParams();
    if (limit) params.append('limit', limit.toString());
    if (startDate) params.append('start', startDate);
    if (endDate) params.append('end', endDate);
    
    // Append params to URL if any exist
    if ([...params].length > 0) {
      url += `?${params.toString()}`;
    }
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch telemetry data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching telemetry data:', error);
    throw error;
  }
}

/**
 * Fetches anomaly data from the backend
 * @param limit Optional limit for the number of records to return
 * @param severity Optional severity filter ('critical', 'warning', or undefined for all)
 * @returns Promise with anomaly data array
 */
export async function fetchAnomalies(limit?: number, severity?: 'critical' | 'warning') {
  try {
    let url = `${API_URL}/anomalies`;
    
    // Add query parameters if provided
    const params = new URLSearchParams();
    if (limit) params.append('limit', limit.toString());
    if (severity) params.append('severity', severity);
    
    // Append params to URL if any exist
    if ([...params].length > 0) {
      url += `?${params.toString()}`;
    }
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch anomalies');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching anomalies:', error);
    throw error;
  }
}

/**
 * Sends telemetry data to the backend
 * @param data The telemetry data to send
 * @returns Promise with the server response
 */
export async function sendTelemetryData(data: TelemetryData) {
  try {
    const response = await fetch(`${API_URL}/telemetry`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to send telemetry data');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error sending telemetry data:', error);
    throw error;
  }
}

/**
 * Updates an existing anomaly (e.g., mark as resolved)
 * @param id The ID of the anomaly to update
 * @param data The updated data
 * @returns Promise with the server response
 */
export async function updateAnomaly(id: string, data: Partial<AlertData>) {
  try {
    const response = await fetch(`${API_URL}/anomalies/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to update anomaly');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error updating anomaly:', error);
    throw error;
  }
}

/**
 * Clears all anomalies from the system
 * @returns Promise with the server response
 */
export async function clearAnomalies() {
  try {
    const response = await fetch(`${API_URL}/anomalies`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to clear anomalies');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error clearing anomalies:', error);
    throw error;
  }
}

/**
 * Checks the health of the API
 * @returns Promise with the health status
 */
export async function checkHealth() {
  try {
    const response = await fetch(`${API_URL}/health`);
    if (!response.ok) {
      throw new Error('API health check failed');
    }
    return await response.json();
  } catch (error) {
    console.error('Error checking API health:', error);
    return { status: 'error', message: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Fetches system metrics and status information
 * @returns Promise with system metrics
 */
export async function fetchSystemMetrics() {
  try {
    const response = await fetch(`${API_URL}/system/metrics`);
    if (!response.ok) {
      throw new Error('Failed to fetch system metrics');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching system metrics:', error);
    throw error;
  }
}

/**
 * Fetches sensor information
 * @param sensorId Optional sensor ID to filter by
 * @returns Promise with sensor data
 */
export async function fetchSensors(sensorId?: string) {
  try {
    let url = `${API_URL}/sensors`;
    if (sensorId) {
      url += `/${sensorId}`;
    }
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch sensor information');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching sensor information:', error);
    throw error;
  }
}
