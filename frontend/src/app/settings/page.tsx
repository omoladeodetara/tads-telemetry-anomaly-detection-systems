import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bell, Cloud, Server, Settings, ShieldCheck } from "lucide-react";

export default function SettingsPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Configure your satellite telemetry monitoring system.
          </p>
        </div>
        
        <Tabs defaultValue="general" className="space-y-4">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="anomaly-detection">Anomaly Detection</TabsTrigger>
            <TabsTrigger value="api">API</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>System Preferences</CardTitle>
                <CardDescription>Configure general system settings.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="refreshInterval" className="text-right">
                      Refresh Interval
                    </Label>
                    <div className="col-span-3 flex items-center gap-2">
                      <Input 
                        id="refreshInterval" 
                        defaultValue="5" 
                        className="max-w-[80px]" 
                      />
                      <span className="text-sm text-muted-foreground">seconds</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="dataRetention" className="text-right">
                      Data Retention
                    </Label>
                    <div className="col-span-3">
                      <Select defaultValue="30">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select retention period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="7">7 days</SelectItem>
                          <SelectItem value="30">30 days</SelectItem>
                          <SelectItem value="90">90 days</SelectItem>
                          <SelectItem value="365">1 year</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="timeZone" className="text-right">
                      Time Zone
                    </Label>
                    <div className="col-span-3">
                      <Select defaultValue="UTC">
                        <SelectTrigger className="w-[240px]">
                          <SelectValue placeholder="Select time zone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="UTC">UTC</SelectItem>
                          <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                          <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                          <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                          <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                          <SelectItem value="Europe/London">London (GMT)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Dashboard Mode</Label>
                    <div className="col-span-3 flex items-center space-x-2">
                      <Switch id="live-mode" defaultChecked />
                      <Label htmlFor="live-mode">Live Updates</Label>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Display Units</Label>
                    <div className="col-span-3">
                      <div className="flex items-center space-x-2 mb-2">
                        <Switch id="celsius" defaultChecked />
                        <Label htmlFor="celsius">Celsius (°C)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="metric-power" defaultChecked />
                        <Label htmlFor="metric-power">Metric Power Units (W)</Label>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Interface Settings</CardTitle>
                <CardDescription>Customize the user interface.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Theme</Label>
                  <div className="col-span-3">
                    <Select defaultValue="system">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Date Format</Label>
                  <div className="col-span-3">
                    <Select defaultValue="ISO">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ISO">ISO (YYYY-MM-DD)</SelectItem>
                        <SelectItem value="US">US (MM/DD/YYYY)</SelectItem>
                        <SelectItem value="EU">EU (DD/MM/YYYY)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Animations</Label>
                  <div className="col-span-3 flex items-center space-x-2">
                    <Switch id="animations" defaultChecked />
                    <Label htmlFor="animations">Enable Animations</Label>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-primary" />
                  <CardTitle>Notification Settings</CardTitle>
                </div>
                <CardDescription>Configure how you receive notifications and alerts.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="critical-alerts">Critical Alerts</Label>
                    <Switch id="critical-alerts" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="warning-alerts">Warning Alerts</Label>
                    <Switch id="warning-alerts" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="system-notifications">System Notifications</Label>
                    <Switch id="system-notifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="maintenance-notifications">Maintenance Notifications</Label>
                    <Switch id="maintenance-notifications" defaultChecked />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Notification Methods</h3>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-notifications">Email</Label>
                    <Switch id="email-notifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sms-notifications">SMS</Label>
                    <Switch id="sms-notifications" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="browser-notifications">Browser</Label>
                    <Switch id="browser-notifications" defaultChecked />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Email Settings</CardTitle>
                <CardDescription>Configure email notification recipients.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="primary-email" className="text-right">
                      Primary Email
                    </Label>
                    <Input 
                      id="primary-email" 
                      placeholder="admin@example.com" 
                      className="col-span-3" 
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="secondary-email" className="text-right">
                      Secondary Email
                    </Label>
                    <Input 
                      id="secondary-email" 
                      placeholder="team@example.com" 
                      className="col-span-3" 
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="anomaly-detection" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  <CardTitle>Anomaly Detection Parameters</CardTitle>
                </div>
                <CardDescription>Configure thresholds and detection settings.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Temperature Thresholds</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="temp-low">Low Warning (°C)</Label>
                      <Input id="temp-low" defaultValue="15" type="number" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="temp-high">High Warning (°C)</Label>
                      <Input id="temp-high" defaultValue="75" type="number" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="temp-critical-low">Low Critical (°C)</Label>
                      <Input id="temp-critical-low" defaultValue="5" type="number" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="temp-critical-high">High Critical (°C)</Label>
                      <Input id="temp-critical-high" defaultValue="90" type="number" />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <h3 className="text-sm font-medium">Power Thresholds</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="power-low">Low Warning (W)</Label>
                      <Input id="power-low" defaultValue="100" type="number" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="power-high">High Warning (W)</Label>
                      <Input id="power-high" defaultValue="1000" type="number" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="power-critical-low">Low Critical (W)</Label>
                      <Input id="power-critical-low" defaultValue="50" type="number" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="power-critical-high">High Critical (W)</Label>
                      <Input id="power-critical-high" defaultValue="1200" type="number" />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <h3 className="text-sm font-medium">Detection Settings</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="detection-sensitivity">Detection Sensitivity</Label>
                        <Select defaultValue="medium">
                          <SelectTrigger id="detection-sensitivity">
                            <SelectValue placeholder="Select sensitivity" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="consecutive-readings">Consecutive Readings</Label>
                        <Input 
                          id="consecutive-readings" 
                          defaultValue="3" 
                          type="number" 
                          min="1"
                          max="10"
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="ml-detection">ML-powered Detection</Label>
                      <Switch id="ml-detection" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="anomaly-learning">Adaptive Learning</Label>
                      <Switch id="anomaly-learning" defaultChecked />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="api" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Cloud className="h-5 w-5 text-primary" />
                  <CardTitle>API Configuration</CardTitle>
                </div>
                <CardDescription>Configure API settings and access controls.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="api-url">API Endpoint</Label>
                  <Input id="api-url" defaultValue="http://localhost:3000/api" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="api-key">API Key</Label>
                    <Button variant="outline" size="sm">Generate New Key</Button>
                  </div>
                  <div className="relative">
                    <Input 
                      id="api-key" 
                      defaultValue="sk_test_TgJJ5YvTg4AMvDqEEE4aBz9z" 
                      className="pr-20" 
                      type="password"
                    />
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="absolute right-1 top-1 h-7"
                    >
                      Show
                    </Button>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Rate Limiting</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="rate-limit">Requests per minute</Label>
                      <Input id="rate-limit" defaultValue="60" type="number" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="burst-limit">Burst limit</Label>
                      <Input id="burst-limit" defaultValue="100" type="number" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Authentication</h3>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="enable-auth">Enable Authentication</Label>
                    <Switch id="enable-auth" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="require-https">Require HTTPS</Label>
                    <Switch id="require-https" defaultChecked />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Server className="h-5 w-5 text-primary" />
                  <CardTitle>Webhook Settings</CardTitle>
                </div>
                <CardDescription>Configure webhooks for external integrations.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="enable-webhooks">Enable Webhooks</Label>
                  <Switch id="enable-webhooks" defaultChecked />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="webhook-url">Webhook URL</Label>
                  <Input id="webhook-url" placeholder="https://example.com/webhook" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="webhook-secret">Webhook Secret</Label>
                  <Input id="webhook-secret" type="password" />
                </div>
                
                <div className="space-y-2">
                  <Label>Webhook Events</Label>
                  <div className="grid gap-2">
                    <div className="flex items-center gap-2">
                      <Switch id="event-anomaly" defaultChecked />
                      <Label htmlFor="event-anomaly">Anomaly Detected</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch id="event-system" defaultChecked />
                      <Label htmlFor="event-system">System Status Change</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch id="event-telemetry" />
                      <Label htmlFor="event-telemetry">Telemetry Data (High volume)</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
