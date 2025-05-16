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
          <Link href="/" legacyBehavior>
            <Button 
              variant={pathname === "/" ? "secondary" : "ghost"} 
              className="w-full justify-start"
            >
              <Home className="mr-2 h-4 w-4" />
              Home
            </Button>
          </Link>
          <Link href="/dashboard" legacyBehavior>
            <Button 
              variant={pathname === "/dashboard" ? "secondary" : "ghost"} 
              className="w-full justify-start"
            >
              <BarChart2 className="mr-2 h-4 w-4" />
              Analytics
            </Button>
          </Link>
          <Link href="/data-entry" legacyBehavior>
            <Button 
              variant={pathname === "/data-entry" ? "secondary" : "ghost"} 
              className="w-full justify-start"
            >
              <Database className="mr-2 h-4 w-4" />
              Data Entry
            </Button>
          </Link>
          <div className="h-px my-2 bg-border"></div>
          <Link href="/alerts" legacyBehavior>
            <Button 
              variant={pathname === "/alerts" ? "secondary" : "ghost"} 
              className="w-full justify-start"
            >
              <Bell className="mr-2 h-4 w-4" />
              Alerts
            </Button>
          </Link>
          <Link href="/settings" legacyBehavior>
            <Button 
              variant={pathname === "/settings" ? "secondary" : "ghost"} 
              className="w-full justify-start"
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </Link>
          <Link href="/about" legacyBehavior>
            <Button 
              variant={pathname === "/about" ? "secondary" : "ghost"} 
              className="w-full justify-start"
            >
              <Info className="mr-2 h-4 w-4" />
              About
            </Button>
          </Link>
        </nav>
      </ScrollArea>
      <div className="p-4 border-t">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <span className="text-xs font-medium">U</span>
            </div>
            <div>
              <p className="text-sm font-medium">Account</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
