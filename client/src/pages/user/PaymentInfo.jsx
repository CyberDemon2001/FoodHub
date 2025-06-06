import React, { useEffect } from "react";
import axios from "axios";
const baseURL = import.meta.env.VITE_API_BASE_URL;

function PaymentInfo({ setPaymentDone, confirmOrder }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => console.log("Razorpay script loaded successfully");
    document.body.appendChild(script);
  }, []);

  const handlePayment = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const cart = JSON.parse(localStorage.getItem(`cart_${user.id}`));

    if (!cart || cart.length === 0) {
      alert("Cart is empty!");
      return;
    }

    const totalAmount = cart.reduce((sum, restaurant) =>
      sum + restaurant.items.reduce((subtotal, item) => subtotal + item.price * item.quantity, 0)
    , 0);

    try {
      const response = await axios.post(`${baseURL}/create-order`, {
        amount: totalAmount,
        currency: "INR",
      });

      const order = response.data;

      if (!window.Razorpay) {
        alert("Razorpay SDK failed to load. Please check your internet connection.");
        return;
      }

      const options = {
        key: "rzp_test_Y2WGqY9W1AeWPA",
        amount: order.amount,
        currency: order.currency,
        name: "FoodHub",
        description: "Order Payment",
        order_id: order.id,
        handler: async function (response) {
          const verifyRes = await axios.post(`${baseURL}/verify-payment`, response);
          if (verifyRes.data.success) {
            setPaymentDone(true);
            alert("Payment Successful!");
            confirmOrder(); // Automatically confirm order after successful payment
          } else {
            alert("Payment Verification Failed!");
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: user.mobile,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Payment failed!");
    }
  };

  return (
    <div className="mt-30 flex flex-col items-center justify-center gap-5">
      <button
        className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-lg"
        onClick={handlePayment}
      >
        Pay Online
      </button>
      <button
  className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-lg"
  onClick={() => {
    const isConfirmed = window.confirm("Do you want to confirm the order?");
    if (isConfirmed) {
      confirmOrder();
    }
  }}
>
  Cash On Delivery
</button>
    </div>
  );
}

export default PaymentInfo;
