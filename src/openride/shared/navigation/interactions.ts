import type { FormEvent, MouseEvent } from "react";
import type { NavigateFunction } from "react-router-dom";

export function preventDefaultSubmit(event: FormEvent<HTMLDivElement>) {
  event.preventDefault();
}

export function preventHashAnchor(event: MouseEvent<HTMLElement | HTMLDivElement>) {
  const target = event.target as HTMLElement | null;
  const hashAnchor = target?.closest<HTMLAnchorElement>('a[href="#"]');

  if (hashAnchor) {
    event.preventDefault();
  }
}

export function handleOpenRideRouteClick(
  event: MouseEvent<HTMLDivElement>,
  navigate: NavigateFunction,
) {
  const target = event.target as HTMLElement | null;
  const routeElement = target?.closest<HTMLElement>("[data-openride-route]");

  if (routeElement?.dataset.openrideRoute) {
    event.preventDefault();
    navigate(routeElement.dataset.openrideRoute);
    return true;
  }

  const hashAnchor = target?.closest<HTMLAnchorElement>('a[href="#"]');
  if (hashAnchor) {
    event.preventDefault();
  }

  return false;
}
