import { cn } from "@/lib/utils";

interface SpinnerProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

function Spinner({ className, size = "md" }: SpinnerProps) {
  const sizeClasses = {
    sm: "size-1.5",
    md: "size-2",
    lg: "size-3",
  };

  return (
    <div
      className={cn("flex items-center justify-center gap-1", className)}
      role="status"
      aria-label="Loading"
    >
      <span
        className={cn("bg-industrial-accent animate-pulse", sizeClasses[size])}
        style={{
          animationDelay: "0ms",
          animationDuration: "800ms",
        }}
      />
      <span
        className={cn("bg-industrial-accent animate-pulse", sizeClasses[size])}
        style={{
          animationDelay: "200ms",
          animationDuration: "800ms",
        }}
      />
      <span
        className={cn("bg-industrial-accent animate-pulse", sizeClasses[size])}
        style={{
          animationDelay: "400ms",
          animationDuration: "800ms",
        }}
      />
    </div>
  );
}

// Full-page loading state
function LoadingScreen({ message }: { message?: string }) {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center gap-4">
      <Spinner size="lg" />
      {message && (
        <span className="text-[10px] text-industrial-text-tertiary uppercase tracking-wider">
          {message}
        </span>
      )}
    </div>
  );
}

export { Spinner, LoadingScreen };
