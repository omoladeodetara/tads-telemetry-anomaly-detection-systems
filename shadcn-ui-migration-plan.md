# Migration Plan: Converting to Shadcn UI

## 1. Project Overview and Analysis

Current project stack:
- Express.js for the backend
- Static HTML/CSS for the frontend
- Bootstrap for UI components
- Chart.js for data visualization

Shadcn UI stack requirements:
- React
- Tailwind CSS
- Radix UI (for accessibility)

## 2. Migration Strategy

Since Shadcn UI requires React and the current project uses static HTML/CSS, the migration will involve significant changes:

### Step 1: Set up a Next.js or React frontend project

1. Create a new directory for the frontend application
2. Initialize a new Next.js project using TypeScript:

```powershell
mkdir -p frontend
cd frontend
npx create-next-app@latest . --typescript --tailwind --eslint
```

### Step 2: Install and Configure Shadcn UI

1. Install dependencies:
```powershell
npm install -D @types/node autoprefixer postcss tailwindcss
npm install lucide-react @radix-ui/react-icons class-variance-authority clsx tailwind-merge
```

2. Initialize Shadcn UI:
```powershell
npx shadcn-ui@latest init
```

3. Configure Shadcn UI (during initialization):
   - Style: Default
   - Base color: Slate
   - Global CSS: src/app/globals.css
   - CSS variables: yes
   - React Server Components: yes
   - Components directory: src/components
   - Utility directory: src/lib/utils

### Step 3: Install Required Shadcn UI Components

Based on the current UI, these components will be needed:

```powershell
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add dropdown-menu
npx shadcn-ui@latest add sidebar
npx shadcn-ui@latest add tabs
npx shadcn-ui@latest add table
npx shadcn-ui@latest add form
npx shadcn-ui@latest add input
npx shadcn-ui@latest add select
npx shadcn-ui@latest add avatar
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add sheet
npx shadcn-ui@latest add toast
npx shadcn-ui@latest add toggle
```

### Step 4: Configure API Proxying

1. Set up API proxying in Next.js to forward requests to the Express backend
2. Create a `.env.local` file to store the API URL:

```
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### Step 5: Component Migration Structure

Create the following component structure:

```
src/
  components/
    ui/            # Shadcn UI base components
    layout/
      sidebar.tsx  # Main navigation sidebar
      header.tsx   # App header
    dashboard/
      overview.tsx # Main dashboard overview
      charts/      # Chart components
      alerts/      # Alert components
    home/          # Components for the home page
    shared/        # Shared components
  app/
    page.tsx       # Home page
    dashboard/
      page.tsx     # Dashboard page
    settings/
      page.tsx     # Settings page
  lib/
    utils.ts       # Utility functions
  services/
    api.ts         # API service for backend communication
```

## 3. Detailed Component Migration Plan

### Layout Components

1. **Sidebar Component**
   - Migrate from Bootstrap to Shadcn UI Sheet or standard sidebar
   - Create components/layout/sidebar.tsx

2. **Header Component**
   - Replace Bootstrap header with Shadcn UI components
   - Create components/layout/header.tsx

### Page Migrations

1. **Home Page**
   - Convert static HTML/CSS to React components
   - Use Shadcn UI Card, Button, Badge components

2. **Dashboard Page**
   - Convert the dashboard to React components
   - Implement Chart.js within React components
   - Use Shadcn UI Card, Table, Tabs components

### Component Examples

1. **Button Component Example**:
   ```tsx
   import { Button } from "@/components/ui/button";
   
   <Button>
     <IconName className="mr-2 h-4 w-4" />
     Button Text
   </Button>
   ```

2. **Card Component Example**:
   ```tsx
   import {
     Card,
     CardContent,
     CardDescription,
     CardFooter,
     CardHeader,
     CardTitle,
   } from "@/components/ui/card";
   
   <Card>
     <CardHeader>
       <CardTitle>Card Title</CardTitle>
       <CardDescription>Card Description</CardDescription>
     </CardHeader>
     <CardContent>
       <p>Card Content</p>
     </CardContent>
     <CardFooter>
       <p>Card Footer</p>
     </CardFooter>
   </Card>
   ```

3. **Sidebar Component Example**:
   ```tsx
   import { Button } from "@/components/ui/button";
   import { ScrollArea } from "@/components/ui/scroll-area";
   import { cn } from "@/lib/utils";
   import { Home, BarChart, Settings, Bell, Info } from "lucide-react";
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
             <span>TelemetryIQ</span>
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
               >
                 <Home className="mr-2 h-4 w-4" />
                 Home
               </Button>
             </Link>
             {/* Add other navigation items */}
           </nav>
         </ScrollArea>
       </div>
     );
   }
   ```

## 4. API Integration

1. Create a service for API communication:

```tsx
// src/services/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export async function fetchTelemetryData() {
  const response = await fetch(`${API_URL}/telemetry/latest`);
  if (!response.ok) {
    throw new Error('Failed to fetch telemetry data');
  }
  return response.json();
}

export async function fetchAnomalies() {
  const response = await fetch(`${API_URL}/anomalies`);
  if (!response.ok) {
    throw new Error('Failed to fetch anomalies');
  }
  return response.json();
}
```

2. Add API endpoints to the Express backend for the new frontend:

```typescript
// Add to src/index.ts
app.get('/api/telemetry/latest', (_req: Request, res: Response) => {
  // Return latest telemetry data
});

app.get('/api/anomalies', (_req: Request, res: Response) => {
  // Return detected anomalies
  res.status(200).json(detectedAnomalies);
});
```

## 5. Chart Integration with React

1. Install React Chart.js libraries:
```powershell
npm install chart.js react-chartjs-2
```

2. Create chart components:
```tsx
// src/components/dashboard/charts/LineChart.tsx
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function LineChart({ data, options }: { data: any, options: ChartOptions<'line'> }) {
  return <Line data={data} options={options} />;
}
```

## 6. Theme Migration

1. Define Tailwind CSS theme in `tailwind.config.js` to match the current design:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--primary-color)",
          dark: "var(--primary-dark)",
        },
        secondary: "var(--secondary-color)",
        success: "var(--success-color)",
        warning: "var(--warning-color)",
        danger: "var(--danger-color)",
        // Add other custom colors
      },
      // Add other theme extensions
    },
  },
  plugins: [require("tailwindcss-animate")],
}
```

2. Create color tokens in `globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --primary-color: #4361ee;
    --primary-dark: #3a56d4;
    --secondary-color: #7209b7;
    --success-color: #38b000;
    --warning-color: #f48c06;
    --danger-color: #e5383b;
    
    /* Shadcn UI color variables */
    --background: 0 0% 100%;
    --foreground: 222.2 47.4% 11.2%;
    
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 47.4% 11.2%;
    
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    
    --card: 0 0% 100%;
    --card-foreground: 222.2 47.4% 11.2%;
    
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
    
    --secondary: 271 65% 37.5%;
    --secondary-foreground: 210 40% 98%;
    
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    
    --destructive: 0 100% 50%;
    --destructive-foreground: 210 40% 98%;
    
    --ring: 215 20.2% 65.1%;
    
    --radius: 0.5rem;
  }
  
  .dark {
    --background: 224 71% 4%;
    --foreground: 213 31% 91%;
    
    --muted: 223 47% 11%;
    --muted-foreground: 215.4 16.3% 56.9%;
    
    --accent: 216 34% 17%;
    --accent-foreground: 210 40% 98%;
    
    --popover: 224 71% 4%;
    --popover-foreground: 215 20.2% 65.1%;
    
    --border: 216 34% 17%;
    --input: 216 34% 17%;
    
    --card: 224 71% 4%;
    --card-foreground: 213 31% 91%;
    
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 1.2%;
    
    --secondary: 271 65% 37.5%;
    --secondary-foreground: 210 40% 98%;
    
    --destructive: 0 63% 31%;
    --destructive-foreground: 210 40% 98%;
    
    --ring: 216 34% 17%;
    
    --radius: 0.5rem;
  }
}
```

## 7. Implementation Timeline

1. **Week 1: Setup and Environment Configuration**
   - Set up Next.js project
   - Install and configure Shadcn UI
   - Configure API communication

2. **Week 2: Core Components Development**
   - Implement layout components (Sidebar, Header)
   - Create basic page structures

3. **Week 3: Feature Implementation**
   - Convert Home page
   - Convert Dashboard page
   - Implement Chart components

4. **Week 4: API Integration and Testing**
   - Connect to backend API
   - Test and debug
   - Implement dark mode toggle
   - Performance optimizations

## 8. Backend Integration

Since the Express backend is being retained, update it to serve the Next.js app in production:

```typescript
// In src/index.ts
import express, { Request, Response } from 'express';
import path from 'path';

const app = express();
app.use(express.json());

// API Routes
// ...existing routes

// In production, serve the Next.js app
if (process.env.NODE_ENV === 'production') {
  // Serve static files from Next.js build
  app.use(express.static(path.join(__dirname, '../frontend/out')));
  
  // Handle all other requests with Next.js app
  app.get('*', (_req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../frontend/out/index.html'));
  });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

## 9. Building and Deploying

1. Build the Next.js app:
```powershell
cd frontend
npm run build
```

2. For static export (if needed):
```powershell
cd frontend
npm run build
npm run export
```

3. Update deployment scripts to include both the backend and frontend.

## Conclusion

This migration plan provides a comprehensive path to convert the current Bootstrap-based static UI to a modern React-based UI using Shadcn UI. The approach maintains the existing Express backend while upgrading the frontend to use modern tools and techniques.

The migration will result in:
- Improved developer experience with modern React components
- Better accessibility with Radix UI primitives
- Consistent design system with Shadcn UI
- Easier maintenance with type-safe components
- Improved performance with Next.js
