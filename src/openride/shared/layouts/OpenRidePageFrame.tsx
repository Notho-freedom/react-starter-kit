import { useEffect, type FormEvent, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type OpenRidePageFrameProps = {
  bodyClassName: string;
  children: ReactNode;
  className?: string;
  onClickCapture?: (event: MouseEvent<HTMLDivElement>) => void;
  onSubmitCapture?: (event: FormEvent<HTMLDivElement>) => void;
  pageId: string;
  title: string;
};

export function OpenRidePageFrame({
  bodyClassName,
  children,
  className,
  onClickCapture,
  onSubmitCapture,
  pageId,
  title,
}: OpenRidePageFrameProps) {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <div
      className={cn("openride-page", bodyClassName, className)}
      data-openride-page={pageId}
      onClickCapture={onClickCapture}
      onSubmitCapture={onSubmitCapture}
    >
      {children}
    </div>
  );
}
