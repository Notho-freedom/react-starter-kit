import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { OpenRideIcon } from "@/openride/shared/icons";
import { useOpenRideWorkflow } from "@/openride/shared/workflows";
import { useAuth } from "@/openride/shared/auth";
import { useProfile } from "@/integrations/supabase/hooks";

type DashboardTopBarProps = {
  actions?: ReactNode;
  leading?: ReactNode;
  subtitle?: string;
  title: string;
  titleMeta?: ReactNode;
};

type DashboardTopBarSearchProps = {
  placeholder: string;
  rounded?: "full" | "lg";
  shortcut?: string;
  widthClassName?: string;
};

type DashboardTopBarIconButtonProps = {
  badge?: ReactNode;
  children: ReactNode;
  className?: string;
  shape?: "full" | "lg";
};

type DashboardTopBarProfileChipProps = {
  name: string;
  rating?: string;
  subtitle: string;
};

type DashboardTopBarActionGroupProps = {
  children?: ReactNode;
  profileName?: string;
  profileSubtitle?: string;
  searchPlaceholder?: string;
  searchShortcut?: string;
  searchWidthClassName?: string;
};

export function DashboardTopBar({
  actions,
  leading,
  subtitle,
  title,
  titleMeta,
}: DashboardTopBarProps) {
  const hasSubtitle = Boolean(subtitle);

  return (
    <header
      id="top-header"
      className="sticky top-0 z-40 flex h-20 shrink-0 items-center justify-between border-b border-gray-800/50 glass-panel px-6 lg:px-10"
    >
      <div className="flex min-w-0 items-center gap-4">
        {leading}
        <div
          className={cn(
            "min-w-0",
            hasSubtitle ? "flex flex-col" : "flex items-center gap-4 flex-wrap",
          )}
        >
          <div className="min-w-0">
            <h1 className="text-xl font-semibold text-white md:text-2xl">{title}</h1>
            {subtitle ? <p className="text-xs text-gray-400">{subtitle}</p> : null}
          </div>
          {titleMeta ? <div className="flex items-center gap-3 flex-wrap">{titleMeta}</div> : null}
        </div>
      </div>

      {actions ? <div className="ml-4 flex min-w-0 items-center gap-4">{actions}</div> : null}
    </header>
  );
}

export function DashboardTopBarSearch({
  placeholder,
  rounded = "lg",
  shortcut,
  widthClassName = "w-48 lg:w-64",
}: DashboardTopBarSearchProps) {
  return (
    <div className="relative hidden md:block">
      <OpenRideIcon
        name="magnifying-glass"
        className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400"
      />
      <input
        type="text"
        placeholder={placeholder}
        className={cn(
          "input-field py-2 text-sm",
          rounded === "full" ? "rounded-full pl-10 pr-4" : "rounded-lg pl-9 pr-8",
          widthClassName,
        )}
      />
      {shortcut ? (
        <div className="absolute right-2 top-1/2 -translate-y-1/2 rounded bg-white/10 px-1.5 py-0.5 text-[10px] text-gray-400">
          {shortcut}
        </div>
      ) : null}
    </div>
  );
}

export function DashboardTopBarIconButton({
  badge,
  children,
  className,
  shape = "lg",
}: DashboardTopBarIconButtonProps) {
  return (
    <button
      className={cn(
        "relative flex items-center justify-center border text-gray-400 transition-colors hover:text-white",
        shape === "full"
          ? "h-10 w-10 rounded-full bg-brand-surface border-gray-700"
          : "h-9 w-9 rounded-lg bg-brand-surface border-white/10",
        className,
      )}
      type="button"
    >
      {children}
      {badge}
    </button>
  );
}

export function DashboardTopBarProfileChip({
  name,
  rating = "4.8",
  subtitle,
}: DashboardTopBarProfileChipProps) {
  const { user: authUser } = useAuth();
  const { data: profile } = useProfile(authUser?.id);
  const avatarUrl = (profile?.avatar_url as string) || "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg";
  const displayName = profile ? `${profile.first_name || ""} ${profile.last_name || ""}`.trim() || name : name;

  return (
    <div className="ml-2 flex cursor-pointer items-center gap-3 rounded-lg border-l border-white/10 p-1.5 pl-4 transition-colors hover:bg-white/5">
      <div className="hidden text-right lg:block">
        <p className="text-sm font-medium text-white">{displayName}</p>
        <p className="text-xs text-gray-400">{subtitle}</p>
      </div>
      <div className="relative">
        <img
          src={avatarUrl}
          alt={displayName}
          className="h-9 w-9 rounded-full border border-white/20"
        />
        <div className="absolute -bottom-1 -right-1 rounded-full border border-brand-background bg-brand-error px-1 text-[9px] font-bold text-white">
          {rating}
        </div>
      </div>
      <OpenRideIcon name="chevron-down" className="text-xs text-gray-500" />
    </div>
  );
}

export function DashboardTopBarActionGroup({
  children,
  profileName = "Ronald R.",
  profileSubtitle = "Membre depuis 2023",
  searchPlaceholder,
  searchShortcut,
  searchWidthClassName,
}: DashboardTopBarActionGroupProps) {
  const workflow = useOpenRideWorkflow();
  const { user: authUser } = useAuth();
  const { data: profile } = useProfile(authUser?.id);
  
  const unreadCount = workflow.conversations.filter((conversation) => conversation.unread).length;
  const displayName = profile
    ? `${profile.first_name || ""} ${profile.last_name || ""}`.trim() || workflow.user?.fullName || profileName
    : workflow.user?.fullName || profileName;
  const subtitle = profile?.created_at
    ? `Membre depuis ${new Date(profile.created_at as string).getFullYear()}`
    : workflow.user?.memberSince ? `Membre depuis ${workflow.user.memberSince}` : profileSubtitle;
  const rating = workflow.user?.rating ? workflow.user.rating.toFixed(1) : "4.8";

  return (
    <div className="flex min-w-0 items-center gap-3">
      {searchPlaceholder ? (
        <DashboardTopBarSearch
          placeholder={searchPlaceholder}
          shortcut={searchShortcut}
          widthClassName={searchWidthClassName}
        />
      ) : null}

      {children ? <div className="hidden items-center gap-2 lg:flex">{children}</div> : null}

      <div className="flex items-center gap-2">
        <DashboardTopBarIconButton>
          <OpenRideIcon name="moon" className="text-sm" />
        </DashboardTopBarIconButton>

        <button className="relative flex h-9 items-center gap-2 rounded-lg border border-white/10 bg-brand-surface px-3 text-gray-400 transition-colors hover:text-white" type="button">
          <OpenRideIcon name="bell" className="text-sm" />
          <span className="rounded-full bg-brand-error px-1.5 text-[10px] text-white">
            {unreadCount} New
          </span>
        </button>
      </div>

      <DashboardTopBarProfileChip name={displayName} rating={rating} subtitle={subtitle} />
    </div>
  );
}
