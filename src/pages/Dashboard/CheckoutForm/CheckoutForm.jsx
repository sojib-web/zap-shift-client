/* eslint-disable no-unused-vars */
// @ts-nocheck
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-hot-toast";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("BD");

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const { id } = useParams();
  const { user } = useAuth();

  const { isPending, data: parcelInfo = {} } = useQuery({
    queryKey: ["parcel", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${id}`);
      return res.data;
    },
  });

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <div className="w-12 h-12 border-4 border-[#CAEB66] border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  const amount = parcelInfo.cost;
  const amountInCents = amount * 100;

  console.log("📦 Parcel Info:", parcelInfo);
  console.log("💵 Amount in cents:", amountInCents);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!stripe || !elements) return;

    if (!amount || isNaN(amountInCents) || amountInCents <= 0) {
      toast.error("❌ Invalid parcel cost. Cannot proceed to payment.");
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) return;

    try {
      const { error: pmError, paymentMethod } =
        await stripe.createPaymentMethod({
          type: "card",
          card,
          billing_details: {
            name: user.displayName || name,
            email: user.email || email,
            address: { city, country },
          },
        });

      if (pmError) {
        setErrorMsg(pmError.message);
        toast.error(`❌ ${pmError.message}`);
        return;
      }

      // 🔁 Payment Intent Request
      const res = await axiosSecure.post("/create-payment-intent", {
        amount: amountInCents,
      });

      const clientSecret = res.data?.client_secret;
      console.log("🟢 Client Secret:", clientSecret);

      if (!clientSecret) {
        setErrorMsg("Payment initialization failed. Try again.");
        toast.error("❌ Failed to initialize payment intent.");
        return;
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: user.displayName || name,
            email: user.email || email,
            address: { city, country },
          },
        },
      });

      if (result.error) {
        setErrorMsg(result.error.message);
        toast.error(`❌ ${result.error.message}`);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          toast.success("✅ Payment completed successfully!");
          setSuccessMsg("✅ Payment completed successfully!");

          const paymentData = {
            email: user.email,
            parcelId: id,
            transactionId: result.paymentIntent.id,
            amount,
            paymentMethod: result.paymentIntent.payment_method_types[0],
          };

          try {
            const paymentRes = await axiosSecure.post("/payments", paymentData);
            if (paymentRes.data.insertedId) {
              setSuccessMsg("💰 Payment saved successfully!");
              toast.success("💰 Payment saved & marked as paid.");
            }
          } catch (error) {
            console.error("❌ Saving payment failed:", error);
            setErrorMsg("Payment succeeded, but saving failed.");
            toast.error("⚠️ Payment saved failed to DB.");
          }
        }
      }
    } catch (error) {
      console.error("❌ Stripe Error:", error);
      setErrorMsg("Something went wrong. Please try again.");
      toast.error("❌ Stripe error occurred.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-xl border border-gray-200">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
        💳 Pay for Parcel Pickup
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-700 font-medium mb-1">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 font-medium mb-1">
            City
          </label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 font-medium mb-1">
            Country
          </label>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="input input-bordered w-full"
            required
          >
            <option value="BD">Bangladesh</option>
            <option value="US">United States</option>
            <option value="GB">United Kingdom</option>
            <option value="IN">India</option>
            <option value="CA">Canada</option>
            <option value="AU">Australia</option>
          </select>
        </div>

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
          Pay $ {amount}
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
