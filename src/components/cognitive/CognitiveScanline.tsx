interface Props {
  opacity?: number;
  duration?: number;
}

/**
 * CognitiveScanline — extremely subtle horizontal scan overlay.
 */
export function CognitiveScanline({ opacity = 0.04, duration = 8 }: Props) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div
        className="absolute left-0 right-0 h-[2px]"
        style={{
          background: `linear-gradient(90deg, transparent, hsl(var(--intent-primary) / ${opacity * 12}), transparent)`,
          animation: `scan-line ${duration}s ease-in-out infinite`,
          opacity,
        }}
      />
    </div>
  );
}
