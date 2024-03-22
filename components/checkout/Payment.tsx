"use client";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import {
  Elements,
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import CheckoutForm from "./CheckoutForm";

type PaymentProps = {
  gigId?: string;
  gigPackage?: number;
};

const Payment = ({ gigId, gigPackage }: PaymentProps) => {
  const [stripePromise, setStripePromise] =
    useState<Promise<Stripe | null> | null>(null);
  const [clientSecret, setClientSecret] = useState<string>("");

  useEffect(() => {
    setStripePromise(
      loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!),
    );
    fetch(
      // Stripe Embedded Checkout option
      //`/api/stripe/create-checkout-session?gigId=${gigId}&gigPackage=${gigPackage}`,
      // Stripe Payment Elements option
      `/api/stripe/create-payment-intent?gigId=${gigId}&gigPackage=${gigPackage}`,
      {
        method: "POST",
        body: JSON.stringify({}),
      },
    )
      .then(async (res) => {
        const { client_secret } = await res.json();
        console.log("client_secret", client_secret);
        setClientSecret(client_secret);
      })
      .catch((error) => {
        toast.error("Error creating Stripe paymment intent ");
        toast.error(error.message);
      });
  }, [gigId]);

  return (
    <>
      {clientSecret && stripePromise && (
        <div className="h-full w-full">
          {/*
        // For Stripe Embedded Checkout option
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{ clientSecret }}
        >
          <EmbeddedCheckout className="desktop:w-[80dvw]" />
        </EmbeddedCheckoutProvider>
      */}
          {/* For Stripe Payment Elements option */}
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm />
          </Elements>
        </div>
      )}
    </>
  );
};

export default Payment;
