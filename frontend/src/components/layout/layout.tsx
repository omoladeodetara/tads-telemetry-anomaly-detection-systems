import { Header } from "./header";
import { Sidebar } from "./sidebar";
import { TelemetryProvider } from "@/context/telemetry-context";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <TelemetryProvider>
      <div className="flex h-screen">
        <div className="hidden md:block md:w-64">
          <Sidebar />
        </div>
        <div className="flex flex-col flex-1 w-full overflow-hidden">
          <Header />
          <main className="flex-1 overflow-auto p-4 bg-muted/10">
            {children}
          </main>
        </div>
      </div>
    </TelemetryProvider>
  );
}
