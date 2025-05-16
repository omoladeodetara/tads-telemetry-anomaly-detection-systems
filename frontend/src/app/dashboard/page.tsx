'use client';

import { useState } from 'react';
import { Layout } from '@/components/layout/layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart } from '@/components/dashboard/charts/LineChart';
import { TelemetryData, AlertData } from '@/types';
import { Activity, AlertCircle, BarChart2, Bell, Zap, Thermometer } from 'lucide-react';
import { useTelemetry } from '@/context/telemetry-context';
import { formatRelativeTime, formatDateTime, formatNumber } from '@/lib/format';

export default function DashboardPage() {
  const { telemetryData, alerts: anomalies, loading, error, refreshData } = useTelemetry();

  // Function to prepare temperature chart data
  function getTemperatureChartData() {
    if (!telemetryData.length) return null;
    
    // Sort data by timestamp
    const sortedData = [...telemetryData]
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
      .slice(-24); // Last 24 data points
    
    return {
      labels: sortedData.map(item => {
        const date = new Date(item.timestamp);
        return date.toLocaleTimeString();
      }),
      datasets: [
        {
          label: 'Temperature (°C)',
          data: sortedData.map(item => item.reading.temperature),
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
    
    // Sort data by timestamp
    const sortedData = [...telemetryData]
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
      .slice(-24); // Last 24 data points
    
    return {
      labels: sortedData.map(item => {
        const date = new Date(item.timestamp);
        return date.toLocaleTimeString();
      }),
      datasets: [
        {
          label: 'Power (W)',
          data: sortedData.map(item => item.reading.power),
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
          fill: false,
        },
      ],
    };
  }

  // Get latest readings
  function getLatestReadings() {
    if (!telemetryData.length) return [];
    
    // Get unique sensor IDs
    const sensorIds = [...new Set(telemetryData.map((item: TelemetryData) => item.sensorId))];
    
    // Get latest reading for each sensor
    return sensorIds.map(sensorId => {
      const sensorData = telemetryData.filter((item: TelemetryData) => item.sensorId === sensorId);
      return sensorData.reduce((latest: TelemetryData, current: TelemetryData) => {
        const latestTime = new Date(latest.timestamp).getTime();
        const currentTime = new Date(current.timestamp).getTime();
        return currentTime > latestTime ? current : latest;
      }, sensorData[0]);
    });
  }

  const latestReadings = getLatestReadings();

  // Count anomalies by severity
  const criticalAnomalies = anomalies.filter((a: AlertData) => 
    a.alertType.includes('Critical') || a.message.includes('critical') || a.severity === 'critical'
  ).length;
  
  const warningAnomalies = anomalies.length - criticalAnomalies;

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Comprehensive overview of satellite telemetry and system status.
          </p>
        </div>        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex flex-col space-y-1">
                <CardTitle className="text-sm font-medium">Sensors</CardTitle>
                <CardDescription>Active sensors</CardDescription>
              </div>
              <Activity className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{latestReadings.length}</div>
              <p className="text-xs text-muted-foreground">
                {latestReadings.filter(r => r.reading.status === 'OPERATIONAL').length} operational
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex flex-col space-y-1">
                <CardTitle className="text-sm font-medium">Data Points</CardTitle>
                <CardDescription>Total readings</CardDescription>
              </div>
              <BarChart2 className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{telemetryData.length}</div>
              <p className="text-xs text-muted-foreground">
                Over the past 24 hours
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex flex-col space-y-1">
                <CardTitle className="text-sm font-medium">Critical Alerts</CardTitle>
                <CardDescription>High priority anomalies</CardDescription>
              </div>
              <AlertCircle className="h-5 w-5 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{criticalAnomalies}</div>
              <p className="text-xs text-muted-foreground">
                {criticalAnomalies > 0 ? 'Requires immediate attention' : 'No critical issues'}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex flex-col space-y-1">
                <CardTitle className="text-sm font-medium">Warnings</CardTitle>
                <CardDescription>Low priority anomalies</CardDescription>
              </div>
              <Bell className="h-5 w-5 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{warningAnomalies}</div>
              <p className="text-xs text-muted-foreground">
                {warningAnomalies > 0 ? 'Monitoring recommended' : 'No warnings detected'}
              </p>
            </CardContent>
          </Card>
        </div>
          <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="telemetry">Telemetry</TabsTrigger>
            <TabsTrigger value="anomalies">Anomalies</TabsTrigger>
            <TabsTrigger value="systems">Systems</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Telemetry Overview</CardTitle>
                  <CardDescription>
                    Satellite data metrics for the past 24 hours
                  </CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <div className="h-[300px]">
                    {loading ? (
                      <div className="flex items-center justify-center h-full bg-muted/10 rounded-md">
                        <p className="text-sm text-muted-foreground">Loading telemetry data...</p>
                      </div>
                    ) : (
                      <LineChart 
                        data={getTemperatureChartData() || {labels: [], datasets: []}} 
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                        }}
                      />
                    )}
                  </div>
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Recent Anomalies</CardTitle>
                  <CardDescription>
                    Latest detected system anomalies
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="flex items-center justify-center h-[200px]">
                      <p className="text-sm text-muted-foreground">Loading anomalies...</p>
                    </div>
                  ) : anomalies.length > 0 ? (
                    <div className="space-y-4">
                      {anomalies.slice(0, 3).map((anomaly, index) => (
                        <div key={index} className="flex items-center gap-4">
                          <div className={`w-2 h-2 rounded-full ${anomaly.severity === 'critical' ? 'bg-red-500' : 'bg-amber-500'}`}></div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium leading-none">
                              {anomaly.message}
                            </p>                            <p className="text-sm text-muted-foreground">
                              {formatRelativeTime(anomaly.timestamp)}
                            </p>
                          </div>
                          <div className="ml-auto font-medium">
                            {anomaly.severity === 'critical' ? 'Critical' : 'Warning'}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-[200px]">
                      <p className="text-sm text-muted-foreground">No anomalies detected</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="telemetry" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-1">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Detailed Telemetry Data</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">This tab will show detailed telemetry data.</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="anomalies" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-1">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Anomaly Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">This tab will show detailed anomaly analysis.</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="systems" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-1">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>System Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">This tab will show detailed system status information.</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
