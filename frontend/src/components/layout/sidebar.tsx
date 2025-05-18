import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Home, BarChart2, Database, Bell, Settings, Info } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const pathname = usePathname();
  
  return (
    <div className="flex h-screen flex-col border-r bg-background">
      <div className="flex h-14 items-center border-b px-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold"
        >
          <span className="text-primary">TelemetryIQ</span>
          <span className="rounded-md bg-primary px-1.5 py-0.5 text-xs text-primary-foreground">
            BETA
          </span>
        </Link>
      </div>
      <ScrollArea className="flex-1">
        <nav className="flex flex-col gap-2 p-2">
          <Link href="/">
            <Button 
              variant={pathname === "/" ? "secondary" : "ghost"} 
              className="w-full justify-start"
              asChild
            >
              <div>
                <Home className="mr-2 h-4 w-4" />
                Home
              </div>
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button 
              variant={pathname === "/dashboard" ? "secondary" : "ghost"} 
              className="w-full justify-start"
              asChild
            >
              <div>
                <BarChart2 className="mr-2 h-4 w-4" />
                Analytics
              </div>
            </Button>
          </Link>
          <Link href="/data-entry">
            <Button 
              variant={pathname === "/data-entry" ? "secondary" : "ghost"} 
              className="w-full justify-start"
              asChild
            >
              <div>
                <Database className="mr-2 h-4 w-4" />
                Data Entry
              </div>
            </Button>
          </Link>
          <Link href="/telemetry">
            <Button 
              variant={pathname === "/telemetry" ? "secondary" : "ghost"} 
              className="w-full justify-start"
              asChild
            >
              <div>
                <Database className="mr-2 h-4 w-4" />
                Telemetry
              </div>
            </Button>
          </Link>
          <Link href="/alerts">
            <Button 
              variant={pathname === "/alerts" ? "secondary" : "ghost"} 
              className="w-full justify-start"
              asChild
            >
              <div>
                <Bell className="mr-2 h-4 w-4" />
                Alerts
              </div>
            </Button>
          </Link>
          <Link href="/systems">
            <Button 
              variant={pathname === "/systems" ? "secondary" : "ghost"} 
              className="w-full justify-start"
              asChild
            >
              <div>
                <Database className="mr-2 h-4 w-4" />
                Systems
              </div>
            </Button>
          </Link>
          <Link href="/settings">
            <Button 
              variant={pathname === "/settings" ? "secondary" : "ghost"} 
              className="w-full justify-start"
              asChild
            >
              <div>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </div>
            </Button>
          </Link>
          <Link href="/about">
            <Button 
              variant={pathname === "/about" ? "secondary" : "ghost"} 
              className="w-full justify-start"
              asChild
            >
              <div>
                <Info className="mr-2 h-4 w-4" />
                About
              </div>
            </Button>
          </Link>
        </nav>
      </ScrollArea>
    </div>
  );
}
