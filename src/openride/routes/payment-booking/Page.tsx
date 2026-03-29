import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardShell, OpenRidePageFrame } from "@/openride/shared/layouts";
import { handleOpenRideRouteClick, preventDefaultSubmit } from "@/openride/shared/navigation";
import { type PaymentMethodId, useOpenRideWorkflow } from "@/openride/shared/workflows";
import { PaymentBookingContent, PaymentBookingHeader } from "./components";
import BookingSuccessModal from "./components/BookingSuccessModal";

const PaymentBookingPage = () => {
  const navigate = useNavigate();
  const rootRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number>();
  const [paymentMethod, setPaymentMethod] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const workflow = useOpenRideWorkflow();

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
      onClickCapture={(event) => {
        if (handleOpenRideRouteClick(event, navigate)) {
          return;
        }

        const target = event.target as HTMLElement | null;
        const bookingAction =
          target?.closest<HTMLElement>("[data-openride-booking-action]")?.dataset.openrideBookingAction;

        if (bookingAction === "message") {
          event.preventDefault();
          if (workflow.selectedRide) {
            workflow.openConversationForRide(workflow.selectedRide.id);
          }
          navigate("/messages");
          return;
        }

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

        const seatControls = target?.closest<HTMLElement>("[data-openride-seat-control]");
        const seatControl =
          seatControls?.dataset.openrideSeatControl ??
          (target?.closest("button")?.textContent?.includes("+")
            ? "increment"
            : target?.closest("button")?.textContent?.includes("−")
              ? "decrement"
              : null);

        if (seatControl === "increment" || seatControl === "decrement") {
          event.preventDefault();
          const currentSeats = Math.max(workflow.bookingDraft.seatCount, 1);
          const maxSeats = Math.max(workflow.selectedRide?.seatsLeft ?? currentSeats, 1);
          const nextSeatCount =
            seatControl === "increment"
              ? Math.min(currentSeats + 1, maxSeats)
              : Math.max(currentSeats - 1, 1);

          workflow.updateBookingDraft({ seatCount: nextSeatCount });
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
          const paymentValues: PaymentMethodId[] = ["card", "wallet", "paypal", "cash"];
          const readFieldValue = (name: string) => {
            const field = rootRef.current?.querySelector<
              HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
            >(`[name="${name}"]`);

            if (!field) {
              return "";
            }

            if (field instanceof HTMLInputElement && field.type === "checkbox") {
              return field.checked ? "true" : "";
            }

            return field.value;
          };
          const selectedPayment =
            rootRef.current?.querySelector<HTMLInputElement>('input[name="payment"]:checked')
              ?.value as PaymentMethodId | undefined;

          workflow.completeBooking({
            email: readFieldValue("email").trim() || workflow.user?.email || "",
            firstName: readFieldValue("firstName").trim() || workflow.user?.firstName || "",
            lastName: readFieldValue("lastName").trim() || workflow.user?.lastName || "",
            message: readFieldValue("message").trim(),
            paymentMethod: selectedPayment ?? paymentValues[paymentMethod] ?? "card",
            phone: readFieldValue("phone").trim() || workflow.user?.phone || "",
            seatCount: workflow.bookingDraft.seatCount,
          });
          setIsProcessing(false);
          setShowSuccess(true);
        }, 1500);
      }}
      onSubmitCapture={preventDefaultSubmit}
      pageId="payment-booking"
      title="Ride Sharing - Paiement & Réservation"
    >
      <DashboardShell activeItem="myTrips">
        <main ref={rootRef} className="flex h-full min-h-0 flex-1 flex-col overflow-hidden">
          <PaymentBookingHeader />
          <PaymentBookingContent isProcessing={isProcessing} />
          <BookingSuccessModal isOpen={showSuccess} />
        </main>
      </DashboardShell>
    </OpenRidePageFrame>
  );
};

export default PaymentBookingPage;
