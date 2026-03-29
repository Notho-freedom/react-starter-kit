import { useEffect, type FormEvent, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  openRideFixedThemeClasses,
  useOpenRideTheme,
  type OpenRideFixedThemeId,
} from "@/openride/shared/theme";

type OpenRidePageFrameProps = {
  bodyClassName: string;
  children: ReactNode;
  className?: string;
  fixedThemeId?: OpenRideFixedThemeId;
  onClickCapture?: (event: MouseEvent<HTMLDivElement>) => void;
  onSubmitCapture?: (event: FormEvent<HTMLDivElement>) => void;
  pageId: string;
  title: string;
};

export function OpenRidePageFrame({
  bodyClassName,
  children,
  className,
  fixedThemeId,
  onClickCapture,
  onSubmitCapture,
  pageId,
  title,
}: OpenRidePageFrameProps) {
  const { theme, themeId } = useOpenRideTheme();
  const appliedThemeId = fixedThemeId ?? themeId;
  const appliedThemeClassName = fixedThemeId
    ? openRideFixedThemeClasses[fixedThemeId]
    : theme.className;

  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <div
      className={cn("openride-page", bodyClassName, appliedThemeClassName, className)}
      data-openride-page={pageId}
      data-openride-theme={appliedThemeId}
      onClickCapture={onClickCapture}
      onSubmitCapture={onSubmitCapture}
    >
      {children}
    </div>
  );
}
