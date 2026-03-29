import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardShell, OpenRidePageFrame } from "@/openride/shared/layouts";
import { handleOpenRideRouteClick, preventDefaultSubmit } from "@/openride/shared/navigation";
import { PaymentBookingContent, PaymentBookingHeader } from "./components";
import BookingSuccessModal from "./components/BookingSuccessModal";

const PaymentBookingPage = () => {
  const navigate = useNavigate();
  const rootRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number>();
  const [paymentMethod, setPaymentMethod] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    const radios = Array.from(root.querySelectorAll<HTMLInputElement>('input[name="payment"]'));
    radios.forEach((radio, index) => {
      const label = radio.closest("label");
      radio.checked = index === paymentMethod;

      if (!label) {
        return;
      }

      label.classList.remove(
        "border-brand-accentGreen",
        "bg-brand-surfaceLight",
        "border-gray-700",
        "bg-brand-surface",
      );

      if (index === paymentMethod) {
        label.classList.add("border-brand-accentGreen", "bg-brand-surfaceLight");
      } else {
        label.classList.add("border-gray-700", "bg-brand-surface");
      }
    });
  }, [paymentMethod]);

  return (
    <OpenRidePageFrame
      bodyClassName="w-full min-h-screen flex flex-col md:flex-row bg-brand-background overflow-hidden font-sans"
      className="openride-theme-dashboard"
      onClickCapture={(event) => {
        if (handleOpenRideRouteClick(event, navigate)) {
          return;
        }

        const target = event.target as HTMLElement | null;
        const paymentLabel = target?.closest<HTMLLabelElement>("label");
        const paymentInput =
          paymentLabel?.querySelector<HTMLInputElement>('input[name="payment"]') ??
          target?.closest<HTMLInputElement>('input[name="payment"]');

        if (paymentInput) {
          event.preventDefault();
          const radios = Array.from(
            rootRef.current?.querySelectorAll<HTMLInputElement>('input[name="payment"]') ?? [],
          );
          const nextIndex = radios.indexOf(paymentInput);

          if (nextIndex >= 0) {
            setPaymentMethod(nextIndex);
          }

          return;
        }

        const confirmButton = target?.closest<HTMLElement>("#confirm-btn");
        if (!confirmButton || isProcessing) {
          return;
        }

        event.preventDefault();
        setIsProcessing(true);

        if (timeoutRef.current) {
          window.clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = window.setTimeout(() => {
          setIsProcessing(false);
          setShowSuccess(true);
        }, 1500);
      }}
      onSubmitCapture={preventDefaultSubmit}
      pageId="payment-booking"
      title="Ride Sharing - Paiement & Réservation"
    >
      <DashboardShell activeItem="myTrips">
        <main ref={rootRef} className="flex-1 flex flex-col overflow-hidden">
          <PaymentBookingHeader />
          <PaymentBookingContent isProcessing={isProcessing} />
          <BookingSuccessModal isOpen={showSuccess} />
        </main>
      </DashboardShell>
    </OpenRidePageFrame>
  );
};

export default PaymentBookingPage;
