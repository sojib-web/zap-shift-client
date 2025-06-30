import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setErrorMsg(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setSuccessMsg("✅ Payment method created successfully!");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-xl border border-gray-200">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
        💳 Pay for Parcel Pickup
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#2d3748",
                fontFamily: "sans-serif",
                "::placeholder": { color: "#a0aec0" },
              },
              invalid: { color: "#e53e3e" },
            },
          }}
          className="p-3 border border-gray-300 rounded-md bg-gray-50"
        />

        <button
          type="submit"
          disabled={!stripe}
          className="w-full bg-[#CAEB66] hover:bg-[#b7da52] text-black font-semibold py-2 rounded-md transition duration-200 disabled:opacity-60"
        >
          Pay Now
        </button>
      </form>

      {errorMsg && (
        <p className="mt-4 text-sm text-red-500 text-center">{errorMsg}</p>
      )}
      {successMsg && (
        <p className="mt-4 text-sm text-green-600 text-center">{successMsg}</p>
      )}
    </div>
  );
};

export default CheckoutForm;
