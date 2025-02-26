import React, { useState } from "react";
import Address from "./Address";
import PaymentInfo from "./PaymentInfo";
import Checkout from "./Checkout";

const Cart = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep((prevStep) => (prevStep < 3 ? prevStep + 1 : prevStep));
  };

  const prevStep = () => {
    setStep((prevStep) => (prevStep > 1 ? prevStep - 1 : prevStep));
  };

  return (
    <div className="mx-30 h-[90vh] bg-white flex flex-col justify-between">
      
      <div>
      {/* Step Indicator with Connected Lines */}
      <div className="relative p-2 flex items-center justify-between w-full">
        
        {/* Connecting Lines */}
        <div className="absolute top-1/3 left-1/6 right-1/6 h-1 bg-gray-300 z-0"></div>
        <div className={`absolute top-1/3 left-1/6 h-1 ${step >= 2 ? "bg-orange-500" : "bg-gray-300"} w-1/3 z-0`}></div>
        <div className={`absolute top-1/3 left-1/2 h-1 ${step === 3 ? "bg-green-400" : "bg-gray-300"} w-1/3 z-0`}></div>

        {/* Step 1 */}
        <div className="relative z-10 flex flex-col items-center w-1/3">
          <div className={`w-12 h-12 text-gray-900 flex items-center justify-center text-lg font-extrabold rounded-full ${step >= 1 ? "bg-orange-500" : "bg-gray-300"}`}>
            1
          </div>
          <span className="mt-2 ">Checkout</span>
        </div>

        {/* Step 2 */}
        <div className="relative z-10 flex flex-col items-center w-1/3">
          <div className={`w-12  h-12 flex items-center justify-center text-lg font-extrabold rounded-full ${step >= 2 ? "bg-orange-500" : "bg-gray-300"}`}>
            2
          </div>
          <span className="mt-2">Address Info</span>
        </div>

        {/* Step 3 */}
        <div className="relative z-10 flex flex-col items-center w-1/3">
          <div className={`w-12 h-12 flex items-center justify-center text-lg font-extrabold rounded-full ${step === 3 ? "bg-green-400" : "bg-gray-300"}`}>
            3
          </div>
          <span className="mt-2">Payment Method</span>
        </div>
      </div>

      {/* Step Content */}
      <div className="">
        {step === 1 && <Checkout />}
        {step === 2 && <Address />}
        {step === 3 && <PaymentInfo />}
      </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mb-3">
        {step > 1 && (
          <button
            onClick={prevStep}
            className="px-6 py-2 bg-gray-400 text-white rounded-lg"
          >
            Previous
          </button>
        )}

        {step < 3 ? (
          <button
            onClick={nextStep}
            className="px-6 py-2 bg-orange-500 text-white rounded-lg"
          >
            Proceed
          </button>
        ) : (
          <button className="px-6 py-2 bg-green-500 text-white rounded-lg">
            Confirm Order
          </button>
        )}
      </div>
      
    </div>
  );
};

export default Cart;
