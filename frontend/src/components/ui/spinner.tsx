'use client';

import { cn } from "@/lib/utils";

interface SpinnerProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Spinner({ className, size = 'md' }: SpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-3',
    lg: 'h-12 w-12 border-4',
  };

  return (
    <div
      className={cn(
        "inline-block animate-spin rounded-full border-solid border-current border-t-transparent text-primary",
        sizeClasses[size],
        className
      )}
    />
  );
}

interface LoadingProps {
  text?: string;
  fullScreen?: boolean;
  className?: string;
}

export function Loading({ text = 'Loading...', fullScreen = false, className }: LoadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3",
        fullScreen && "fixed inset-0 bg-background/80 backdrop-blur-sm z-50",
        !fullScreen && "h-[200px]",
        className
      )}
    >
      <Spinner size="lg" />
      {text && <p className="text-sm text-muted-foreground">{text}</p>}
    </div>
  );
}
