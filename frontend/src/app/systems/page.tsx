'use client';

import { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { checkHealth } from '@/services/api';
import { AlertCircle, Battery, Loader2, RefreshCw, Satellite, Server, Shield, Wifi } from 'lucide-react';

interface SystemStatus {
  name: string;
  status: 'operational' | 'warning' | 'critical' | 'unknown';
  details: string;
  lastUpdated: string;
  metrics?: {
    [key: string]: {
      value: number;
      unit: string;
      status: 'normal' | 'warning' | 'critical';
    };
  };
}

// Sample systems data - would be replaced by actual API calls
const initialSystems: SystemStatus[] = [
  {
    name: 'Power Subsystem',
    status: 'operational',
    details: 'All power systems functioning normally',
    lastUpdated: new Date().toISOString(),
    metrics: {
      batteryLevel: {
        value: 87,
        unit: '%',
        status: 'normal',
      },
      powerConsumption: {
        value: 550,
        unit: 'W',
        status: 'normal',
      },
      solarArrayOutput: {
        value: 780,
        unit: 'W',
        status: 'normal',
      },
    },
  },
  {
    name: 'Thermal Control',
    status: 'operational',
    details: 'Temperature regulation within expected parameters',
    lastUpdated: new Date().toISOString(),
    metrics: {
      internalTemp: {
        value: 25.3,
        unit: '°C',
        status: 'normal',
      },
      externalTemp: {
        value: -15.7,
        unit: '°C',
        status: 'normal',
      },
      heaterPower: {
        value: 120,
        unit: 'W',
        status: 'normal',
      },
    },
  },
  {
    name: 'Communications',
    status: 'warning',
    details: 'Minor signal degradation detected in backup channel',
    lastUpdated: new Date().toISOString(),
    metrics: {
      signalStrength: {
        value: 72,
        unit: '%',
        status: 'warning',
      },
      dataRate: {
        value: 128,
        unit: 'Kbps',
        status: 'normal',
      },
      errorRate: {
        value: 0.05,
        unit: '%',
        status: 'normal',
      },
    },
  },
  {
    name: 'Propulsion System',
    status: 'operational',
    details: 'All thrusters operational, fuel levels nominal',
    lastUpdated: new Date().toISOString(),
    metrics: {
      fuelLevel: {
        value: 68,
        unit: '%',
        status: 'normal',
      },
      pressure: {
        value: 290,
        unit: 'kPa',
        status: 'normal',
      },
      thrusterEfficiency: {
        value: 95,
        unit: '%',
        status: 'normal',
      },
    },
  },
  {
    name: 'Data Processing',
    status: 'critical',
    details: 'Memory corruption detected in secondary storage unit',
    lastUpdated: new Date().toISOString(),
    metrics: {
      cpuUsage: {
        value: 42,
        unit: '%',
        status: 'normal',
      },
      memoryUsage: {
        value: 82,
        unit: '%',
        status: 'warning',
      },
      diskErrors: {
        value: 12,
        unit: 'count',
        status: 'critical',
      },
    },
  },
];

export default function SystemsPage() {
  const [systems, setSystems] = useState<SystemStatus[]>(initialSystems);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiHealth, setApiHealth] = useState<{ status: string; message: string } | null>(null);
  const [healthLoading, setHealthLoading] = useState(false);

  // Function to check API health
  async function checkApiHealth() {
    setHealthLoading(true);
    try {
      const health = await checkHealth();
      setApiHealth(health);
      setError(null);
    } catch (err) {
      setError('Failed to check API health');
      setApiHealth(null);
    } finally {
      setHealthLoading(false);
    }
  }

  // Load API health on page load
  useEffect(() => {
    checkApiHealth();
    
    // Set up auto-refresh every 2 minutes
    const intervalId = setInterval(() => {
      checkApiHealth();
    }, 120000);
    
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Systems</h1>
            <p className="text-muted-foreground">
              Monitor the status of satellite subsystems.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={checkApiHealth} disabled={healthLoading}>
              <RefreshCw className={`mr-2 h-4 w-4 ${healthLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Server className="h-5 w-5 text-primary" />
                <CardTitle>Backend API Health</CardTitle>
              </div>
              <CardDescription>Current status of the telemetry API server</CardDescription>
            </CardHeader>
            <CardContent>
              {healthLoading ? (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : error ? (
                <div className="flex items-center gap-2 text-red-600">
                  <AlertCircle className="h-5 w-5" />
                  <span>{error}</span>
                </div>
              ) : apiHealth ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className={`h-3 w-3 rounded-full ${
                      apiHealth.status === 'healthy' ? 'bg-green-500' : 'bg-red-500'
                    }`} />
                    <span className="font-medium">
                      {apiHealth.status === 'healthy' ? 'Operational' : 'Service Disruption'}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{apiHealth.message}</p>
                </div>
              ) : (
                <div className="py-4 text-center text-muted-foreground">
                  No health data available
                </div>
              )}
            </CardContent>
            <CardFooter>
              <p className="text-xs text-muted-foreground">
                Last checked: {new Date().toLocaleString()}
              </p>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Satellite className="h-5 w-5 text-primary" />
                <CardTitle>System Overview</CardTitle>
              </div>
              <CardDescription>Status of all satellite systems</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-600">
                      {systems.filter(s => s.status === 'operational').length}
                    </div>
                    <p className="text-xs text-muted-foreground">Operational</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-yellow-600">
                      {systems.filter(s => s.status === 'warning').length}
                    </div>
                    <p className="text-xs text-muted-foreground">Warnings</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-red-600">
                      {systems.filter(s => s.status === 'critical').length}
                    </div>
                    <p className="text-xs text-muted-foreground">Critical</p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  {systems.map((system, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`h-2 w-2 rounded-full ${
                          system.status === 'operational' ? 'bg-green-500' :
                          system.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                        }`} />
                        <span className="text-sm">{system.name}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {new Date(system.lastUpdated).toLocaleTimeString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="power" className="space-y-4">
          <TabsList className="grid grid-cols-5 md:w-auto">
            <TabsTrigger value="power">Power</TabsTrigger>
            <TabsTrigger value="thermal">Thermal</TabsTrigger>
            <TabsTrigger value="comms">Comms</TabsTrigger>
            <TabsTrigger value="propulsion">Propulsion</TabsTrigger>
            <TabsTrigger value="data">Data</TabsTrigger>
          </TabsList>
          
          {systems.map((system, index) => (
            <TabsContent key={index} value={system.name.toLowerCase().split(' ')[0]}>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {system.name === 'Power Subsystem' ? (
                        <Battery className="h-5 w-5 text-primary" />
                      ) : system.name === 'Thermal Control' ? (
                        <Thermometer className="h-5 w-5 text-primary" />
                      ) : system.name === 'Communications' ? (
                        <Wifi className="h-5 w-5 text-primary" />
                      ) : system.name === 'Propulsion System' ? (
                        <Rocket className="h-5 w-5 text-primary" />
                      ) : (
                        <Server className="h-5 w-5 text-primary" />
                      )}
                      <CardTitle>{system.name}</CardTitle>
                    </div>
                    <div className={`px-2 py-1 text-xs rounded-full ${
                      system.status === 'operational' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' :
                      system.status === 'warning' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100' : 
                      'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
                    }`}>
                      {system.status.toUpperCase()}
                    </div>
                  </div>
                  <CardDescription>{system.details}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {system.metrics && Object.entries(system.metrics).map(([key, metric], metricIndex) => (
                    <div key={metricIndex} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <h4 className="text-sm font-medium">{formatMetricName(key)}</h4>
                          <div className="text-2xl font-bold">
                            {metric.value} <span className="text-sm font-normal">{metric.unit}</span>
                          </div>
                        </div>
                        <div className={`h-9 w-9 rounded-full flex items-center justify-center ${
                          metric.status === 'normal' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-100' :
                          metric.status === 'warning' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-100' : 
                          'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-100'
                        }`}>
                          <Shield className="h-5 w-5" />
                        </div>
                      </div>
                      
                      {isPercentage(metric.unit) && (
                        <Progress 
                          value={metric.value} 
                          className={`h-2 ${
                            metric.status === 'normal' ? 'bg-muted' :
                            metric.status === 'warning' ? 'bg-yellow-200' : 'bg-red-200'
                          }`}
                          indicatorClassName={
                            metric.status === 'normal' ? 'bg-green-600' :
                            metric.status === 'warning' ? 'bg-yellow-600' : 'bg-red-600'
                          }
                        />
                      )}
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <p className="text-xs text-muted-foreground">
                    Last updated: {new Date(system.lastUpdated).toLocaleString()}
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </Layout>
  );
}

// Helper function to format metric names
function formatMetricName(key: string): string {
  // Convert camelCase to Title Case with spaces
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase());
}

// Helper function to check if a unit is a percentage
function isPercentage(unit: string): boolean {
  return unit === '%';
}

// Thermometer and Rocket icons are defined inline since they weren't imported
function Thermometer(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />
      <path d="M12 9a1 1 0 0 0-1 1v4a1 1 0 0 0 2 0v-4a1 1 0 0 0-1-1Z" />
    </svg>
  );
}

function Rocket(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}
