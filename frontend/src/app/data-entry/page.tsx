import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { sendTelemetryData } from "@/services/api";
import { TelemetryData } from "@/types";

const formSchema = z.object({
  sensorId: z.string().min(1, "Sensor ID is required"),
  temperature: z.coerce
    .number()
    .min(-100, "Temperature must be at least -100°C")
    .max(200, "Temperature must be at most 200°C"),
  power: z.coerce
    .number()
    .min(0, "Power must be at least 0W")
    .max(2000, "Power must be at most 2000W"),
  status: z.enum(["OPERATIONAL", "WARNING", "CRITICAL"]),
});

export default function DataEntryPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sensorId: "SENSOR001",
      temperature: 25,
      power: 500,
      status: "OPERATIONAL",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    setError(null);
    
    try {
      const telemetryData: TelemetryData = {
        sensorId: values.sensorId,
        timestamp: new Date().toISOString(),
        reading: {
          temperature: values.temperature,
          power: values.power,
          status: values.status,
        },
      };
      
      const result = await sendTelemetryData(telemetryData);
      setResponse(result);
      
      // Reset form after successful submission
      form.reset({
        sensorId: values.sensorId,
        temperature: 25,
        power: 500,
        status: "OPERATIONAL",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setIsSubmitting(false);
    }
  }

  function generateRandomData() {
    // Generate random values
    const temp = Math.floor(Math.random() * 70) - 10; // -10 to 60
    const power = Math.floor(Math.random() * 1000) + 200; // 200 to 1200
    
    // Determine status based on values
    let status: "OPERATIONAL" | "WARNING" | "CRITICAL" = "OPERATIONAL";
    
    if (temp > 50 || power > 1000) {
      status = "WARNING";
    }
    
    if (temp > 60 || power > 1100) {
      status = "CRITICAL";
    }
    
    // Update form
    form.setValue("temperature", temp);
    form.setValue("power", power);
    form.setValue("status", status);
  }

  function generateAnomalyData() {
    // Generate anomaly values
    const anomalyType = Math.random() > 0.5 ? "temperature" : "power";
    
    if (anomalyType === "temperature") {
      const temp = Math.floor(Math.random() * 50) + 70; // 70 to 120
      form.setValue("temperature", temp);
      form.setValue("status", "CRITICAL");
    } else {
      const power = Math.floor(Math.random() * 500) + 1300; // 1300 to 1800
      form.setValue("power", power);
      form.setValue("status", "CRITICAL");
    }
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Data Entry</h1>
          <p className="text-muted-foreground">
            Submit telemetry data manually or generate test data.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Submit Telemetry Data</CardTitle>
              <CardDescription>
                Enter telemetry values or use the generator buttons.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="sensorId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sensor ID</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a sensor" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="SENSOR001">SENSOR001</SelectItem>
                            <SelectItem value="SENSOR002">SENSOR002</SelectItem>
                            <SelectItem value="SENSOR003">SENSOR003</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="temperature"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Temperature (°C)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormDescription>
                          Normal range: 15°C to 75°C
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="power"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Power (W)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormDescription>
                          Normal range: 100W to 1000W
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="OPERATIONAL">OPERATIONAL</SelectItem>
                            <SelectItem value="WARNING">WARNING</SelectItem>
                            <SelectItem value="CRITICAL">CRITICAL</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex space-x-2 pt-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={generateRandomData}
                    >
                      Generate Normal Data
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={generateAnomalyData}
                      className="bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700"
                    >
                      Generate Anomaly
                    </Button>
                  </div>
                  
                  <div className="pt-4">
                    <Button type="submit" disabled={isSubmitting} className="w-full">
                      {isSubmitting ? "Submitting..." : "Submit Data"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Response</CardTitle>
              <CardDescription>
                Server response from the latest data submission.
              </CardDescription>
            </CardHeader>
            <CardContent className="min-h-[300px]">
              {error ? (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600">
                  <p className="font-semibold">Error</p>
                  <p>{error}</p>
                </div>
              ) : response ? (
                <div className="space-y-4">
                  <div className="p-3 bg-green-50 border border-green-200 rounded-md text-green-600">
                    <p className="font-semibold">Success</p>
                    <p>{response.message}</p>
                  </div>
                  
                  {response.anomaliesDetected > 0 && (
                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-md text-amber-600">
                      <p className="font-semibold">Anomaly Detected!</p>
                      <p>The system detected {response.anomaliesDetected} anomalies in the submitted data.</p>
                    </div>
                  )}
                  
                  <div>
                    <p className="text-sm font-medium">Full Response:</p>
                    <pre className="mt-2 rounded-md bg-muted p-4 overflow-auto text-xs">
                      {JSON.stringify(response, null, 2)}
                    </pre>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-sm text-muted-foreground">Submit data to see the response here.</p>
                </div>
              )}
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <p className="text-xs text-muted-foreground">
                Data will be processed by the telemetry system and checked for anomalies.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
