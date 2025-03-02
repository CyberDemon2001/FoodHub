import React, { useState } from "react";

function PaymentInfo({ setPaymentDone }) {
  const [isPaid, setIsPaid] = useState(false);

  const handlePayment = () => {
    setIsPaid(true);
    setPaymentDone(true);
  };

  return (
    <div>
      <button
        className="border-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
        onClick={handlePayment}
        disabled={isPaid}
      >
        {isPaid ? "Payment Completed" : "Payment Done"}
      </button>

      <h1 className={`mt-3 text-lg font-semibold ${isPaid ? "text-green-600" : "text-gray-600"}`}>
        {isPaid ? "Payment Successful ✅" : "Click above when payment is completed."}
      </h1>
    </div>
  );
}

export default PaymentInfo;
