import { CarFront } from "lucide-react";
import { cn } from "@/lib/utils";

type RideShareLogoIconProps = {
  className?: string;
  iconClassName?: string;
};

export function RideShareLogoIcon({ className, iconClassName }: RideShareLogoIconProps) {
  return (
    <div
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-purple to-brand-accent shadow-lg shadow-brand-purple/20",
        className,
      )}
    >
      <CarFront className={cn("h-5 w-5 text-white", iconClassName)} />
    </div>
  );
}
