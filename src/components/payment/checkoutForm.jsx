import React from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
  AddressElement,
} from "@stripe/react-stripe-js";
import "./../../assets/css/payment.css";
import { useSelector } from "react-redux";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const selectBasket = useSelector((state) => state.basket);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "https://example.com/order/123/complete",
      },
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
      // alert("Sorry! I guess stripe is not working")
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="payment-container">
        <AddressElement
          options={{
            mode: "shipping",
            defaultValues: {
              name: "Jane Doe",
              address: {
                line1: "354 Oyster Point Blvd",
                line2: "",
                city: "South San Francisco",
                state: "CA",
                postal_code: "94080",
                country: "US",
              },
            },
          }}
        />
        <div>
          <PaymentElement />
          <div className="">
            <h3 className="mt-1 mb-0 fs-2 basket-footer-total text-primary">
              Total : {Math.abs(Number(selectBasket.payment).toFixed(2))} $
            </h3>
            <button className="mt-1 product-button" disabled={!stripe}>
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CheckoutForm;
