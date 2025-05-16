import { Layout } from "@/components/layout/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GitBranch, GitMerge, Code2, Rocket, Shield, Cpu, Users, Database } from "lucide-react";

export default function AboutPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">About TelemetryIQ</h1>
          <p className="text-muted-foreground">
            Learn about the satellite telemetry monitoring platform and its features.
          </p>
        </div>
        
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="technology">Technology</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="version">Version</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md w-10 h-10 bg-primary/10 flex items-center justify-center">
                    <Rocket className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>TelemetryIQ Platform</CardTitle>
                    <CardDescription>Next-generation satellite telemetry analysis</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="prose prose-sm dark:prose-invert max-w-none">
                <p>
                  TelemetryIQ is an advanced telemetry and anomaly detection system designed for
                  satellite operations. The platform enables real-time monitoring, analysis, and 
                  anomaly detection for critical satellite systems.
                </p>
                
                <Separator className="my-4" />
                
                <h3 className="text-lg font-medium mt-0">Mission</h3>
                <p>
                  Our mission is to provide satellite operators with the most reliable, accurate,
                  and intuitive telemetry analysis platform available. We aim to help satellite teams
                  detect and respond to anomalies before they become critical issues.
                </p>
                
                <h3 className="text-lg font-medium">Key Features</h3>
                <ul>
                  <li>Real-time telemetry monitoring with millisecond precision</li>
                  <li>AI-powered anomaly detection with adaptive learning</li>
                  <li>Multi-sensor support with flexible data handling</li>
                  <li>Customizable alert thresholds and notification options</li>
                  <li>Comprehensive dashboards and visualization tools</li>
                  <li>Support for both consistent and intermittent data connections</li>
                </ul>
                
                <h3 className="text-lg font-medium">Use Cases</h3>
                <ul>
                  <li><strong>Satellite Fleet Management:</strong> Monitor multiple satellites from a central dashboard</li>
                  <li><strong>Critical Component Monitoring:</strong> Track power systems, thermal control, attitude determination</li>
                  <li><strong>Anomaly Prevention:</strong> Detect subtle deviations before they become critical failures</li>
                  <li><strong>Payload Performance:</strong> Ensure optimal operation of scientific and commercial payloads</li>
                </ul>
              </CardContent>
            </Card>
            
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <CardTitle>Built for Reliability</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    TelemetryIQ is engineered for 99.99% uptime with redundant systems,
                    automatic failover, and comprehensive data protection. Our unique approach
                    handles both consistent low-bandwidth connections and intermittent high-bandwidth
                    bursts from various satellite operation profiles.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Cpu className="h-5 w-5 text-primary" />
                    <CardTitle>Intelligent Analysis</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Our AI-powered analysis engine processes millions of data points to establish
                    normal operational patterns. It then detects subtle deviations that could
                    indicate potential issues, adapting to each satellite's unique characteristics
                    over time for increasingly accurate anomaly detection.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="technology" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Code2 className="h-5 w-5 text-primary" />
                  <CardTitle>Technology Stack</CardTitle>
                </div>
                <CardDescription>
                  The core technologies powering TelemetryIQ
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Frontend</h3>
                    <div className="grid gap-2 md:grid-cols-2">
                      <div className="flex items-center gap-2 border rounded-md p-2">
                        <div className="h-9 w-9 rounded-md flex items-center justify-center bg-black">
                          <svg viewBox="0 0 24 24" height="24" width="24" className="text-white">
                            <path
                              fill="currentColor"
                              d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">Next.js</h4>
                          <p className="text-xs text-muted-foreground">React framework</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 border rounded-md p-2">
                        <div className="h-9 w-9 rounded-md flex items-center justify-center bg-blue-600">
                          <svg viewBox="0 0 24 24" height="20" width="20" fill="none" className="text-white">
                            <path
                              d="M13.325 3.05011L8.66741 20.4323C8.35437 21.3023 7.45839 21.8307 6.54446 21.6702C5.63052 21.5097 4.9817 20.7249 5.00002 19.8F0"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M13.325 3.05011L19.1553 20.0336C19.5026 20.9084 20.4533 21.3292 21.3299 21.0437C22.2064 20.7582 22.7498 19.8635 22.5663 18.9361L19.1553 3.05011"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M2 12.9581H22"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">Tailwind CSS</h4>
                          <p className="text-xs text-muted-foreground">Utility-first CSS</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 border rounded-md p-2">
                        <div className="h-9 w-9 rounded-md flex items-center justify-center bg-blue-500">
                          <svg viewBox="0 0 24 24" height="20" width="20" className="text-white">
                            <path
                              fill="currentColor"
                              d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">TypeScript</h4>
                          <p className="text-xs text-muted-foreground">Type safety</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 border rounded-md p-2">
                        <div className="h-9 w-9 rounded-md flex items-center justify-center bg-slate-800">
                          <svg viewBox="0 0 24 24" height="24" width="24" className="text-white">
                            <path
                              fill="currentColor"
                              d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38a2.167 2.167 0 0 0-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44a23.476 23.476 0 0 0-3.107-.534A23.892 23.892 0 0 0 12.769 4.7c1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442a22.73 22.73 0 0 0-3.113.538 15.02 15.02 0 0 1-.254-1.42c-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87a25.64 25.64 0 0 1-4.412.005 26.64 26.64 0 0 1-1.183-1.86c-.372-.64-.71-1.29-1.018-1.946a25.17 25.17 0 0 1 1.013-1.954c.38-.66.773-1.286 1.18-1.868A25.245 25.245 0 0 1 12 8.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933a25.952 25.952 0 0 0-1.345-2.32zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493a23.966 23.966 0 0 0-1.1-2.98c.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98a23.142 23.142 0 0 0-1.086 2.964c-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39a25.819 25.819 0 0 0 1.341-2.338zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143a22.005 22.005 0 0 1-2.006-.386c.18-.636.406-1.287.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295a1.185 1.185 0 0 1-.553-.132c-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">React</h4>
                          <p className="text-xs text-muted-foreground">UI library</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Backend</h3>
                    <div className="grid gap-2 md:grid-cols-2">
                      <div className="flex items-center gap-2 border rounded-md p-2">
                        <div className="h-9 w-9 rounded-md flex items-center justify-center bg-green-600">
                          <svg viewBox="0 0 24 24" height="24" width="24" className="text-white">
                            <path
                              fill="currentColor"
                              d="M12 1.85c-.27 0-.55.07-.78.2l-7.44 4.3c-.48.28-.78.8-.78 1.36v8.58c0 .56.3 1.08.78 1.36l1.95 1.12c.95.46 1.27.47 1.71.47 1.4 0 2.21-.85 2.21-2.33V8.44c0-.12-.1-.22-.22-.22H8.5c-.13 0-.23.1-.23.22v8.47c0 .66-.68 1.31-1.77.76L4.45 16.5a.26.26 0 0 1-.11-.21V7.71c0-.09.04-.17.11-.21l7.44-4.29c.06-.04.16-.04.22 0l7.44 4.29c.07.04.11.12.11.21v8.58c0 .08-.04.16-.11.21l-7.44 4.29c-.06.04-.16.04-.23 0L10 19.65c-.08-.03-.16-.04-.21-.01-.53.3-.63.36-1.12.51-.12.04-.31.11.07.32l2.48 1.47c.24.14.5.21.78.21s.54-.07.78-.21l7.44-4.29c.48-.28.78-.8.78-1.36V7.71c0-.56-.3-1.08-.78-1.36l-7.44-4.3c-.23-.13-.5-.2-.78-.2M14 8c-2.12 0-3.39.89-3.39 2.39 0 1.61 1.26 2.08 3.3 2.28 2.43.24 2.62.6 2.62 1.08 0 .83-.67 1.18-2.23 1.18-1.98 0-2.4-.49-2.55-1.47a.226.226 0 0 0-.22-.18h-.96c-.12 0-.21.09-.21.22 0 1.24.68 2.74 3.94 2.74 2.35 0 3.7-.93 3.7-2.55 0-1.61-1.08-2.03-3.37-2.34-2.31-.3-2.54-.46-2.54-1 0-.45.2-1.05 1.91-1.05 1.5 0 2.09.33 2.32 1.36.02.1.11.17.21.17h.97c.05 0 .11-.02.15-.07.04-.04.07-.1.05-.16C19.25 8.57 17.89 8 14 8Z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">Node.js</h4>
                          <p className="text-xs text-muted-foreground">JavaScript runtime</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 border rounded-md p-2">
                        <div className="h-9 w-9 rounded-md flex items-center justify-center bg-gray-600">
                          <svg viewBox="0 0 24 24" height="24" width="24" className="text-white">
                            <path
                              fill="currentColor"
                              d="M24 18.588a1.529 1.529 0 01-1.543 1.5 1.507 1.507 0 01-1.543-1.5 1.5 1.5 0 011.543-1.5 1.528 1.528 0 011.543 1.5M23.5 16.5H1.866a.766.766 0 00-.768.762v3.814h22.4zm-23.5-1.5a1.5 1.5 0 011.5-1.5 1.5 1.5 0 011.5 1.5 1.5 1.5 0 01-1.5 1.5 1.5 1.5 0 01-1.5-1.5M1.5 13.5h21v-6a.76.76 0 00-.764-.764H2.264A.766.766 0 001.5 7.5z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">Express</h4>
                          <p className="text-xs text-muted-foreground">Web framework</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 border rounded-md p-2">
                        <div className="h-9 w-9 rounded-md flex items-center justify-center bg-blue-700">
                          <Database className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">MongoDB</h4>
                          <p className="text-xs text-muted-foreground">NoSQL database</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 border rounded-md p-2">
                        <div className="h-9 w-9 rounded-md flex items-center justify-center bg-orange-600">
                          <svg viewBox="0 0 24 24" height="20" width="20" className="text-white" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.9819 8.67578C18.7281 8.67578 18.5234 8.88047 18.5234 9.13422C18.5234 9.38797 18.7281 9.59266 18.9819 9.59266C19.2356 9.59266 19.4403 9.38797 19.4403 9.13422C19.4403 8.88047 19.2356 8.67578 18.9819 8.67578Z" fill="currentColor" />
                            <path d="M5.00166 11.5C4.74791 11.5 4.54322 11.7047 4.54322 11.9584C4.54322 12.2122 4.74791 12.4169 5.00166 12.4169C5.25541 12.4169 5.4601 12.2122 5.4601 11.9584C5.4601 11.7047 5.25541 11.5 5.00166 11.5Z" fill="currentColor" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M15.7207 2.25781H8.27876C7.53541 2.25781 6.93066 2.86256 6.93066 3.60591V20.3941C6.93066 21.1374 7.53541 21.7422 8.27876 21.7422H15.7207C16.4641 21.7422 17.0688 21.1374 17.0688 20.3941V3.60591C17.0688 2.86256 16.4641 2.25781 15.7207 2.25781ZM15.7207 3.60591V20.3941H8.27876L8.27954 3.60591H15.7207Z" fill="currentColor" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">AWS Lambda</h4>
                          <p className="text-xs text-muted-foreground">Serverless computing</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Data Processing</h3>
                    <div className="grid gap-2 md:grid-cols-2">
                      <div className="flex items-center gap-2 border rounded-md p-2">
                        <div className="h-9 w-9 rounded-md flex items-center justify-center bg-yellow-600">
                          <svg viewBox="0 0 24 24" height="24" width="24" fill="currentColor" className="text-white">
                            <path d="M12.334 0c-1.112.003-2.226.008-3.333.032H8.999L9 .035a119.787 119.787 0 012.371-.007L12 .027c.094 0 .193-.02.303-.027h.031c-.641.02-1.283.045-1.923.087.979-.046 1.969-.055 2.954-.07.13-.001 3.207-.016 3.324.01.106.024.192.094.154.19-.059.107-.209.074-.318.068-.364-.021-.73-.03-1.095-.04-.256-.01-.51-.015-.765-.023l-.753.001-.42.002.012 1.186c.436-.018.877.016 1.315-.023.099-.007.209-.046.288.023.083.07.1.19.1.291-.002.148.023.307-.061.441-.062.094-.188.107-.291.096-.147-.009-.295-.007-.443-.006h-.294v.244c0 .21-.002 1.355-.002 1.53.444-.006.889.011 1.333-.025.094-.009.204-.034.285.03.124.098.104.287.11.433 0 .115.027.249-.055.34-.08.089-.209.087-.315.083a63.994 63.994 0 00-1.358-.02v.87c.461.007.924.001 1.384.017.119.01.262-.018.35.08.114.136.059.338.069.503-.015.118.05.256-.052.351-.073.07-.186.074-.283.07-.489-.001-.979-.01-1.468-.002v1.001c.511-.007 1.025.017 1.533-.019.1-.013.222-.037.302.047.118.118.086.3.089.452.002.115.023.24-.06.334-.08.09-.217.079-.328.08a64.469 64.469 0 00-1.535.006v.948c.404.016.814-.032 1.218.015.107.012.231.02.297.11.086.113.069.27.071.407.01.131.073.276-.027.393-.058.07-.159.091-.246.089a35.026 35.026 0 01-1.313-.007v.966c.469.01.94-.01 1.408.013.094.01.195.017.256.092.086.105.07.258.073.389.012.14.064.312-.059.418-.08.071-.199.068-.3.066-.458-.002-.915-.006-1.377-.001l.001.13v.852a11.97 11.97 0 001.416.005c.1-.005.21-.012.287.064.13.125.094.322.099.487.002.086-.019.18-.095.226-.086.05-.184.033-.276.035a49.597 49.597 0 01-1.432.006v1.8c.478.003.955.005 1.432-.004.102-.01.211-.016.299.049.137.093.139.282.146.433.01.125.03.278-.084.365-.062.046-.139.06-.213.058a63.801 63.801 0 00-1.58-.007v1.001c.549.007 1.097.002 1.645.006.099.001.206.001.284.07.095.084.108.217.11.337.01.148.024.312-.08.433-.057.066-.157.075-.242.075a83.333 83.333 0 01-1.717.01v1.007c.478-.008.955.003 1.432-.008.103-.005.217-.014.302.06.111.097.106.255.113.387.012.151.031.336-.101.442-.07.057-.169.055-.255.056-.497.002-.993-.005-1.49.001v1.001c.417-.005.835.01 1.251-.013.133-.002.277-.023.38.074.09.084.097.215.102.333.007.152.015.341-.108.448-.069.06-.17.054-.256.056-.456.003-.911-.001-1.366.003l-.003 1.04c.461.004.923-.003 1.384.005.136.004.297.001.381.12.074.112.071.257.073.387.013.142.04.309-.07.424-.068.07-.174.079-.266.077-.5.002-1-.004-1.499.003l.001 1.012c.447.002.896.001 1.343.001.117.001.24-.012.331.073.083.075.102.196.101.305.008.151.029.317-.071.445-.064.082-.178.09-.275.09-.477.003-.955.002-1.431.003l.001.987c.46.003.921-.003 1.381.005.098.001.203 0 .285.059.126.083.133.25.141.389.01.174.061.402-.109.521-.069.048-.157.054-.239.054-.486.004-.972 0-1.458.004v.972c.466.008.933-.003 1.4.006.14.005.303-.003.403.115.075.088.081.21.086.323.01.151.022.322-.074.443-.058.072-.16.084-.25.084-.522.003-1.043.002-1.564.002l.001 1.062c.434-.003.871.032 1.305-.005.266-.023.582.007.676-.315.027-.129.02-.263.021-.394.009-.284.007-.57.001-.854-.001-.067.015-.142.08-.174.099-.04.215-.02.298.048.096.084.087.224.09.342.004.304.058.618-.06.91-.08.2-.273.319-.465.364-.13.027-.264.02-.396.02H1.05c-.056 0-.117.005-.17-.017-.1-.053-.102-.187-.099-.286.001-.122-.023-.256.048-.363.051-.075.148-.091.233-.09.284-.004.57-.001.854-.001h.32l.001-22.874-1.174-.001c-.119.006-.247-.003-.348-.074-.045-.04-.06-.068-.069-.111V.633c.007-.043.02-.072.048-.1.058-.057.119-.076.212-.081.046-.004.097-.003.148-.003H12c.112 0 .224-.001.334 0zm-.331.27H1.365v.23h10.637zm-.35.501H1.365v22.875h10.284zM12.981.308c-.11.005-.219.007-.329.013a35.356 35.356 0 00-.334.016.299.299 0 00.028.001l.315-.007.324-.02-.004-.003z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">TensorFlow</h4>
                          <p className="text-xs text-muted-foreground">Machine learning</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 border rounded-md p-2">
                        <div className="h-9 w-9 rounded-md flex items-center justify-center bg-purple-600">
                          <svg viewBox="0 0 24 24" height="24" width="24" className="text-white">
                            <path
                              fill="currentColor"
                              d="M16.934 8.519a1.044 1.044 0 0 0-.303.23l-2.432 2.433-3.745 3.744a.998.998 0 0 0 0 1.414l2.43 2.428a.998.998 0 0 0 1.414 0l2.433-2.432a.998.998 0 0 0 0-1.414l-2.433-2.432a.998.998 0 0 1 0-1.414l1.323-1.323.11-.11a.999.999 0 0 0 0-1.414l-.11-.11-.702-.7a1.042 1.042 0 0 0-.985-.272zm-5.728-2.896a1.044 1.044 0 0 0-.985.272l-.702.701-.11.11a.999.999 0 0 0 0 1.414l.11.11 1.323 1.322a.998.998 0 0 1 0 1.414L8.5 13.292a.998.998 0 0 0 0 1.414l2.432 2.432a.998.998 0 0 0 1.414 0l2.433-2.432a.998.998 0 0 0 0-1.414l-2.433-2.432a.998.998 0 0 1 0-1.414l2.433-2.432a.998.998 0 0 0 0-1.414l-2.432-2.428a.998.998 0 0 0-1.414 0l-2.432 2.432a1.04 1.04 0 0 0-.211.246zm12.562.493l-.11-.11-.702-.702a1.042 1.042 0 0 0-.985-.272 1.04 1.04 0 0 0-.212.246l-2.432 2.432a.998.998 0 0 0 0 1.414l2.433 2.432a.998.998 0 0 1 0 1.414l-2.433 2.432a.998.998 0 0 0 0 1.414l2.432 2.432a.998.998 0 0 0 1.414 0l2.433-2.432a.998.998 0 0 0 0-1.414l-2.433-2.432a.998.998 0 0 1 0-1.414l1.323-1.322.11-.11a.999.999 0 0 0 0-1.414zM12.32 17.431l-.902.902a1.332 1.332 0 0 1-1.885 0l-2.861-2.86a1.333 1.333 0 0 1 0-1.886l.901-.902-1.333-1.333-1.223 1.223a2.666 2.666 0 0 0 0 3.771l4.001 4.001a2.666 2.666 0 0 0 3.772 0l1.223-1.223z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">Apache Kafka</h4>
                          <p className="text-xs text-muted-foreground">Real-time data streaming</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="team" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <CardTitle>The Team</CardTitle>
                </div>
                <CardDescription>
                  The experts behind TelemetryIQ
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <div className="rounded-lg border p-4">
                    <div className="flex flex-col items-center text-center">
                      <div className="h-24 w-24 rounded-full bg-muted mb-4">
                        <div className="h-24 w-24 rounded-full flex items-center justify-center text-2xl font-semibold bg-primary text-primary-foreground">
                          JD
                        </div>
                      </div>
                      <h3 className="text-lg font-medium">Dr. Jane Doe</h3>
                      <p className="text-sm text-muted-foreground mb-2">Chief Scientist</p>
                      <p className="text-sm">
                        Former NASA aerospace engineer with 15+ years of experience in satellite telemetry systems.
                      </p>
                    </div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="flex flex-col items-center text-center">
                      <div className="h-24 w-24 rounded-full bg-muted mb-4">
                        <div className="h-24 w-24 rounded-full flex items-center justify-center text-2xl font-semibold bg-primary/90 text-primary-foreground">
                          JS
                        </div>
                      </div>
                      <h3 className="text-lg font-medium">John Smith</h3>
                      <p className="text-sm text-muted-foreground mb-2">Lead Engineer</p>
                      <p className="text-sm">
                        Distributed systems specialist with expertise in real-time data processing pipelines.
                      </p>
                    </div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="flex flex-col items-center text-center">
                      <div className="h-24 w-24 rounded-full bg-muted mb-4">
                        <div className="h-24 w-24 rounded-full flex items-center justify-center text-2xl font-semibold bg-primary/80 text-primary-foreground">
                          SR
                        </div>
                      </div>
                      <h3 className="text-lg font-medium">Sarah Reynolds</h3>
                      <p className="text-sm text-muted-foreground mb-2">ML Specialist</p>
                      <p className="text-sm">
                        PhD in AI with focus on anomaly detection in time-series data from space systems.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="version" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <GitBranch className="h-5 w-5 text-primary" />
                  <CardTitle>Version Information</CardTitle>
                </div>
                <CardDescription>
                  Current system version and recent updates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h3 className="text-base font-medium">Current Version</h3>
                      <p className="text-sm text-muted-foreground">Latest stable release</p>
                    </div>
                    <div className="rounded-md bg-primary/10 px-3 py-1 text-primary">v2.5.3</div>
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="text-sm font-medium">Release Date</h3>
                    <p className="text-sm">May 10, 2025</p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Recent Updates</h3>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div>
                        <div className="flex h-8 w-8 items-center justify-center rounded-full border">
                          <GitMerge className="h-4 w-4" />
                        </div>
                        <div className="mx-auto h-full w-px bg-border"></div>
                      </div>
                      <div className="space-y-1 pb-4">
                        <h4 className="text-sm font-medium">v2.5.3</h4>
                        <div className="text-xs text-muted-foreground">May 10, 2025</div>
                        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                          <li>Fixed issue with anomaly detection on low-earth orbit satellites</li>
                          <li>Improved real-time data visualization performance</li>
                          <li>Enhanced dark mode support</li>
                        </ul>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div>
                        <div className="flex h-8 w-8 items-center justify-center rounded-full border">
                          <GitMerge className="h-4 w-4" />
                        </div>
                        <div className="mx-auto h-full w-px bg-border"></div>
                      </div>
                      <div className="space-y-1 pb-4">
                        <h4 className="text-sm font-medium">v2.5.0</h4>
                        <div className="text-xs text-muted-foreground">April 28, 2025</div>
                        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                          <li>Added support for multi-satellite fleet management</li>
                          <li>Integrated new machine learning model for improved anomaly detection</li>
                          <li>Enhanced API with webhook support</li>
                          <li>Updated user interface with modern design</li>
                        </ul>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div>
                        <div className="flex h-8 w-8 items-center justify-center rounded-full border">
                          <GitMerge className="h-4 w-4" />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-sm font-medium">v2.4.2</h4>
                        <div className="text-xs text-muted-foreground">March 15, 2025</div>
                        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                          <li>Performance optimizations for large data sets</li>
                          <li>Fixed authentication issues with API endpoints</li>
                          <li>Improved data import/export functionality</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
