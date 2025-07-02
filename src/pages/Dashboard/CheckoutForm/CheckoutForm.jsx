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
  const [processing, setProcessing] = useState(false);

  const { isPending, data: parcelInfo = {} } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });

  if (isPending) return <p className="text-center">Loading...</p>;

  const amount = parcelInfo.cost * 100;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) {
      setErrorMessage("Card Element not found");
      return;
    }

    setProcessing(true);

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card,
      });

      if (error) {
        setErrorMessage(error.message);
        setProcessing(false);
        return;
      }

      const res = await axiosSecure.post("/create-payment-intent", {
        amount,
        parcelId,
      });

      const clientSecret = res.data.clientSecret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: user?.displayName || "Unknown",
            email: user?.email || "demo@example.com",
          },
        },
      });

      if (result.error) {
        setErrorMessage(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        const paymentDoc = {
          email: user.email,
          parcelId,
          transactionId: result.paymentIntent.id,
          amount,
          paymentMethod: result.paymentIntent.payment_method_types,
        };

        const paymentRes = await axiosSecure.post("/payments", paymentDoc);

        if (paymentRes.data.insertedId) {
          console.log("✅ Payment recorded in DB");
        } else {
          console.log("❌ Payment DB insert failed");
        }
      }
    } catch (err) {
      console.error("❌ Unexpected error:", err.response?.data || err.message);
    } finally {
      setProcessing(false);
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
        disabled={!stripe || processing}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition disabled:opacity-50"
      >
        {processing ? "Processing..." : `Pay $${(amount / 100).toFixed(2)}`}
      </button>
      {errorMessage && (
        <p className="text-red-500 text-sm text-center">{errorMessage}</p>
      )}
    </form>
  );
};

export default CheckoutForm;
