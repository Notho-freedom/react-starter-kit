import PaymentBookingFooter from "./PaymentBookingFooter";
import PaymentBookingMainColumn from "./PaymentBookingMainColumn";
import PriceBreakdownSidebar from "./PriceBreakdownSidebar";

type PaymentBookingContentProps = {
  isProcessing?: boolean;
};

const PaymentBookingContent = ({ isProcessing = false }: PaymentBookingContentProps) => (
  <div className="flex-1 overflow-y-auto hide-scroll p-6 lg:p-10">
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
      <PaymentBookingMainColumn />
      <PriceBreakdownSidebar isProcessing={isProcessing} />
    </div>
    <PaymentBookingFooter />
  </div>
);

export default PaymentBookingContent;
