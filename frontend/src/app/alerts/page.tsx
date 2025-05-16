import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { fetchAnomalies, clearAnomalies } from "@/services/api";
import { AlertData } from "@/types";
import { useEffect, useState } from "react";
import { AlertCircle, Bell, CheckCircle, RefreshCw, XCircle } from "lucide-react";

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<AlertData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [clearingAlerts, setClearingAlerts] = useState(false);

  // Load alerts on page load
  useEffect(() => {
    loadAlerts();
  }, []);

  // Function to load alerts from API
  async function loadAlerts() {
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchAnomalies();
      setAlerts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load alerts");
    } finally {
      setLoading(false);
    }
  }

  // Function to clear all alerts
  async function handleClearAlerts() {
    if (clearingAlerts || alerts.length === 0) return;
    
    setClearingAlerts(true);
    
    try {
      await clearAnomalies();
      setAlerts([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to clear alerts");
    } finally {
      setClearingAlerts(false);
    }
  }

  // Group alerts by criticality
  const criticalAlerts = alerts.filter(alert => 
    alert.alertType.includes("Critical") || 
    alert.message.includes("critical") ||
    alert.severity === "critical"
  );
  
  const warningAlerts = alerts.filter(alert => 
    !criticalAlerts.includes(alert)
  );

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Alerts</h1>
            <p className="text-muted-foreground">
              View and manage system alerts and anomalies.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={loadAlerts} disabled={loading}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
            <Button 
              variant="destructive" 
              size="sm" 
              onClick={handleClearAlerts} 
              disabled={clearingAlerts || alerts.length === 0}
            >
              <XCircle className="mr-2 h-4 w-4" />
              Clear All
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">
              All Alerts
              <span className="ml-2 rounded bg-muted px-1.5 py-0.5 text-xs">
                {alerts.length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="critical">
              Critical
              <span className="ml-2 rounded bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400 px-1.5 py-0.5 text-xs">
                {criticalAlerts.length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="warnings">
              Warnings
              <span className="ml-2 rounded bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-400 px-1.5 py-0.5 text-xs">
                {warningAlerts.length}
              </span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            {loading ? (
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-center">
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                      <span className="text-sm text-muted-foreground">Loading alerts...</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : error ? (
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 text-red-600">
                    <AlertCircle className="h-5 w-5" />
                    <span>{error}</span>
                  </div>
                </CardContent>
              </Card>
            ) : alerts.length === 0 ? (
              <Card>
                <CardContent className="pt-6 pb-10 text-center">
                  <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-green-50 flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold">All Clear</h3>
                  <p className="text-muted-foreground mt-1">No alerts detected in the system.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {alerts.map((alert, index) => (
                  <AlertCard key={index} alert={alert} />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="critical" className="space-y-4">
            {!loading && !error && criticalAlerts.length === 0 ? (
              <Card>
                <CardContent className="pt-6 pb-10 text-center">
                  <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-green-50 flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold">No Critical Alerts</h3>
                  <p className="text-muted-foreground mt-1">No critical issues detected.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {criticalAlerts.map((alert, index) => (
                  <AlertCard key={index} alert={alert} />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="warnings" className="space-y-4">
            {!loading && !error && warningAlerts.length === 0 ? (
              <Card>
                <CardContent className="pt-6 pb-10 text-center">
                  <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-green-50 flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold">No Warnings</h3>
                  <p className="text-muted-foreground mt-1">No warning issues detected.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {warningAlerts.map((alert, index) => (
                  <AlertCard key={index} alert={alert} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}

function AlertCard({ alert }: { alert: AlertData }) {
  const isCritical = 
    alert.alertType.includes("Critical") || 
    alert.message.includes("critical") ||
    alert.severity === "critical";
    
  const timestamp = new Date(alert.timestamp);
  const formattedTime = timestamp.toLocaleTimeString();
  const formattedDate = timestamp.toLocaleDateString();
  
  return (
    <Card className={isCritical ? "border-red-200" : "border-amber-200"}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isCritical ? (
              <div className="h-2 w-2 rounded-full bg-red-500"></div>
            ) : (
              <div className="h-2 w-2 rounded-full bg-amber-500"></div>
            )}
            <CardTitle className="text-base">{alert.alertType}</CardTitle>
          </div>
          <div className="text-xs text-muted-foreground">
            {formattedTime} · {formattedDate}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{alert.message}</p>
        {alert.sensor && (
          <div className="mt-2 text-xs flex items-center">
            <span className="font-medium text-muted-foreground">Sensor:</span>
            <span className="ml-1">{alert.sensor}</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-0">
        <div className="flex justify-end w-full">
          <Button variant="ghost" size="sm">View Details</Button>
          <Button variant="ghost" size="sm">Acknowledge</Button>
        </div>
      </CardFooter>
    </Card>
  );
}
