import {
  EmbeddedCheckoutProvider,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Suspense, useState } from "react";
import { PaymentElement, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/constants/ui/button";
import { StripeExpressCheckoutElementOptions } from "@stripe/stripe-js";
import toast from "react-hot-toast";
import getCurrentUser from "@/lib/actions/getCurrentUser";

type CheckoutFormProps = {};

const CheckoutForm = ({}: CheckoutFormProps) => {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const options: StripeExpressCheckoutElementOptions = {
    buttonType: {
      googlePay: "book",
      applePay: "book",
    },
    buttonTheme: {
      applePay: "black",
    },
    buttonHeight: 55,
  };
  const stripe = useStripe();
  const elements = useElements();
  elements?.update({ appearance: { theme: "flat" } });
  const handleSumbit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    try {
      setIsProcessing(true);
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          // Make sure to change this to your payment completion page
          return_url: `${window.location.origin}/`,
        },
      });

      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message!);
      } else {
        setMessage("An unexpected error occured.");
      }

      toast.success("Pagamento efetuado com sucesso!");
    } catch (error) {
      toast.error;
    } finally {
      setIsProcessing(false);
    }
  };
  return (
    <form
      className="flex flex-col gap-2 rounded-md border border-black p-[20px] desktop:w-[50dvw]"
      onSubmit={handleSumbit}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <PaymentElement />
        <button
          type="submit"
          disabled={isProcessing || !stripe}
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "group transition duration-200 ease-in-out hover:scale-105",
          )}
        >
          <span className="transform  duration-200 ease-in-out group-hover:text-base">
            {isProcessing ? "Processing..." : `Pay Now`}
          </span>
        </button>

        {/* Show any error that happens when processing the payment */}
        {message && (
          <div className="rounded-md border bg-[#0a253c] p-[20px] font-sans text-white ">
            {message}
          </div>
        )}
      </Suspense>
    </form>
  );
};

export default CheckoutForm;
