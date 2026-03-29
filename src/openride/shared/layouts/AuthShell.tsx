import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type AuthShellProps = {
  className?: string;
  formPanel: ReactNode;
  reverseDesktop?: boolean;
  visualPanel?: ReactNode;
};

export function AuthShell({ className, formPanel, reverseDesktop = false, visualPanel }: AuthShellProps) {
  return (
    <main
      className={cn(
        "w-full max-w-7xl mx-auto flex flex-col overflow-hidden rounded-[2rem] shadow-2xl",
        reverseDesktop ? "lg:flex-row-reverse" : "lg:flex-row",
        className,
      )}
    >
      {visualPanel}
      {formPanel}
    </main>
  );
}
