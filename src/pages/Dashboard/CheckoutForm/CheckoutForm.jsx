// @ts-nocheck
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { parcelId } = useParams();

  const [errorMessage, setErrorMessage] = useState("");
  const [paymentMethodId, setPaymentMethodId] = useState(null);

  const { isPending, data: parcelInfo = {} } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });

  if (isPending) {
    return "....loading";
  }

  console.log(parcelInfo);

  const amount = parcelInfo.cost * 100;
  console.log(amount);
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);

    if (!card) {
      setErrorMessage("Card Element not found");
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setErrorMessage(error.message);
      setPaymentMethodId(null);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setPaymentMethodId(paymentMethod.id);
      setErrorMessage("");
      const res = await axiosSecure.post("/create-payment-intent", {
        amount,
        parcelId,
      });

      const clientSecret = res.data.clientSecret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user?.displayName || "Unknown",
            email: user?.email || "demo@example.com",
          },
        },
      });
      if (result.error) {
        setErrorMessage(result.error.message);
        console.log(result.error.message);
      } else {
        setErrorMessage("");
        if (result.paymentIntent.status === "succeeded") {
          console.log("Payment successful");
          console.log(result);
        }
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white rounded-xl shadow space-y-4"
    >
      <h2 className="text-xl font-semibold text-center">Enter Card Info</h2>

      <CardElement
        className="p-4 border border-gray-300 rounded-lg shadow-sm bg-gray-50"
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#32325d",
              fontFamily: "sans-serif",
              fontSmoothing: "antialiased",
              "::placeholder": {
                color: "#a0aec0",
              },
            },
            invalid: {
              color: "#fa755a",
              iconColor: "#fa755a",
            },
          },
        }}
      />

      <button
        type="submit"
        disabled={!stripe}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition"
      >
        Pay $ {amount}
      </button>

      {errorMessage && (
        <p className="text-red-500 text-sm text-center">{errorMessage}</p>
      )}

      {paymentMethodId && (
        <p className="text-green-600 text-sm text-center">
          ✅ Payment method created: {paymentMethodId}
        </p>
      )}
    </form>
  );
};

export default CheckoutForm;
