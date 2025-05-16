'use client';

import { useEffect, useState } from 'react';
import { Layout } from '@/components/layout/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart } from '@/components/dashboard/charts/LineChart';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { fetchTelemetryData } from '@/services/api';
import { TelemetryData } from '@/types';
import { Thermometer, Zap, Activity, RotateCw, Calendar } from 'lucide-react';

export default function TelemetryPage() {
  const [telemetryData, setTelemetryData] = useState<TelemetryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeframe, setTimeframe] = useState('1h');

  useEffect(() => {
    loadTelemetryData();
    
    // Set up auto-refresh every 30 seconds
    const intervalId = setInterval(() => {
      loadTelemetryData();
    }, 30000);
    
    return () => clearInterval(intervalId);
  }, []);

  async function loadTelemetryData() {
    try {
      setLoading(true);
      const data = await fetchTelemetryData();
      setTelemetryData(data);
      setError(null);
    } catch (err) {
      setError('Failed to load telemetry data. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  // Function to prepare temperature chart data
  function getTemperatureChartData() {
    if (!telemetryData.length) return null;
    
    const filteredData = getFilteredData();
    
    return {
      labels: filteredData.map(item => {
        const date = new Date(item.timestamp);
        return date.toLocaleTimeString();
      }),
      datasets: [
        {
          label: 'Temperature (°C)',
          data: filteredData.map(item => item.reading.temperature),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          fill: false,
        },
      ],
    };
  }

  // Function to prepare power chart data
  function getPowerChartData() {
    if (!telemetryData.length) return null;
    
    const filteredData = getFilteredData();
    
    return {
      labels: filteredData.map(item => {
        const date = new Date(item.timestamp);
        return date.toLocaleTimeString();
      }),
      datasets: [
        {
          label: 'Power (W)',
          data: filteredData.map(item => item.reading.power),
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
          fill: false,
        },
      ],
    };
  }

  // Function to filter data based on selected timeframe
  function getFilteredData() {
    if (!telemetryData.length) return [];
    
    const now = new Date();
    let cutoff = new Date();
    
    switch (timeframe) {
      case '1h':
        cutoff = new Date(now.getTime() - 60 * 60 * 1000);
        break;
      case '6h':
        cutoff = new Date(now.getTime() - 6 * 60 * 60 * 1000);
        break;
      case '24h':
        cutoff = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        break;
      case '7d':
        cutoff = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      default:
        cutoff = new Date(now.getTime() - 60 * 60 * 1000);
    }
    
    return telemetryData
      .filter(item => new Date(item.timestamp) >= cutoff)
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  }

  // Function to get latest telemetry reading
  function getLatestReading() {
    if (!telemetryData.length) return null;
    
    return telemetryData.reduce((latest, current) => {
      const latestTime = new Date(latest.timestamp).getTime();
      const currentTime = new Date(current.timestamp).getTime();
      return currentTime > latestTime ? current : latest;
    }, telemetryData[0]);
  }

  const latestReading = getLatestReading();
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Telemetry Data</h1>
            <p className="text-muted-foreground">
              Monitor real-time satellite data and performance metrics.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <Select
                value={timeframe}
                onValueChange={setTimeframe}
              >
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1h">Last Hour</SelectItem>
                  <SelectItem value="6h">Last 6 Hours</SelectItem>
                  <SelectItem value="24h">Last 24 Hours</SelectItem>
                  <SelectItem value="7d">Last 7 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" size="sm" onClick={loadTelemetryData} disabled={loading}>
              <RotateCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>
        
        {loading && telemetryData.length === 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Skeleton className="h-[140px]" />
            <Skeleton className="h-[140px]" />
            <Skeleton className="h-[140px]" />
          </div>
        ) : error ? (
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 text-red-600">
                <Activity className="h-5 w-5" />
                <span>{error}</span>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="flex flex-col space-y-1">
                  <CardTitle className="text-sm font-medium">Temperature</CardTitle>
                  <CardDescription>Current satellite temperature</CardDescription>
                </div>
                <Thermometer className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {latestReading ? `${latestReading.reading.temperature.toFixed(1)}°C` : 'N/A'}
                </div>
                <p className="text-xs text-muted-foreground">
                  Last update: {latestReading ? new Date(latestReading.timestamp).toLocaleString() : 'N/A'}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="flex flex-col space-y-1">
                  <CardTitle className="text-sm font-medium">Power</CardTitle>
                  <CardDescription>Current power consumption</CardDescription>
                </div>
                <Zap className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {latestReading ? `${latestReading.reading.power.toFixed(0)} W` : 'N/A'}
                </div>
                <p className="text-xs text-muted-foreground">
                  Last update: {latestReading ? new Date(latestReading.timestamp).toLocaleString() : 'N/A'}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="flex flex-col space-y-1">
                  <CardTitle className="text-sm font-medium">Status</CardTitle>
                  <CardDescription>System operational status</CardDescription>
                </div>
                <Activity className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {latestReading ? (
                    <div className="flex items-center gap-2">
                      <div 
                        className={`h-3 w-3 rounded-full ${
                          latestReading.reading.status === 'OPERATIONAL' 
                            ? 'bg-green-500' 
                            : latestReading.reading.status === 'WARNING'
                            ? 'bg-amber-500'
                            : 'bg-red-500'
                        }`}
                      />
                      <span>{latestReading.reading.status}</span>
                    </div>
                  ) : (
                    'N/A'
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  Sensor: {latestReading ? latestReading.sensorId : 'N/A'}
                </p>
              </CardContent>
            </Card>
          </div>
        )}
        
        <Tabs defaultValue="temperature" className="space-y-4">
          <TabsList>
            <TabsTrigger value="temperature">Temperature</TabsTrigger>
            <TabsTrigger value="power">Power</TabsTrigger>
          </TabsList>
          
          <TabsContent value="temperature" className="space-y-4">
            <Card className="p-0">
              <CardHeader>
                <CardTitle>Temperature Over Time</CardTitle>
                <CardDescription>
                  Historical temperature readings (°C)
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading && telemetryData.length === 0 ? (
                  <div className="h-[350px] w-full flex items-center justify-center">
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                      <span className="text-sm text-muted-foreground">Loading data...</span>
                    </div>
                  </div>
                ) : telemetryData.length === 0 ? (
                  <div className="h-[350px] w-full flex items-center justify-center">
                    <p className="text-muted-foreground">No data available</p>
                  </div>
                ) : (
                  <div className="h-[350px] w-full">
                    <LineChart data={getTemperatureChartData() || {labels: [], datasets: []}} />
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <p className="text-xs text-muted-foreground">
                  Timeframe: {
                    timeframe === '1h' ? 'Last Hour' : 
                    timeframe === '6h' ? 'Last 6 Hours' : 
                    timeframe === '24h' ? 'Last 24 Hours' : 
                    'Last 7 Days'
                  }
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="power" className="space-y-4">
            <Card className="p-0">
              <CardHeader>
                <CardTitle>Power Consumption Over Time</CardTitle>
                <CardDescription>
                  Historical power consumption readings (W)
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading && telemetryData.length === 0 ? (
                  <div className="h-[350px] w-full flex items-center justify-center">
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                      <span className="text-sm text-muted-foreground">Loading data...</span>
                    </div>
                  </div>
                ) : telemetryData.length === 0 ? (
                  <div className="h-[350px] w-full flex items-center justify-center">
                    <p className="text-muted-foreground">No data available</p>
                  </div>
                ) : (
                  <div className="h-[350px] w-full">
                    <LineChart data={getPowerChartData() || {labels: [], datasets: []}} />
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <p className="text-xs text-muted-foreground">
                  Timeframe: {
                    timeframe === '1h' ? 'Last Hour' : 
                    timeframe === '6h' ? 'Last 6 Hours' : 
                    timeframe === '24h' ? 'Last 24 Hours' : 
                    'Last 7 Days'
                  }
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
