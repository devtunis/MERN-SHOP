import React from 'react';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';  // Import axios

// Make sure to replace with your own publishable key
const stripePromise = loadStripe('pk_test_51PfqbpEx4sV4nYjlRNm9KuOA7I0l82h4lYvnumt2r1Ag90zxy5Wt1J16VcYGheceEZXWcEXZmpxwyZQ5GzO51Cui002cUeiTcf');

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet
      return;
    }
   
  
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
  
    if (error) {
      console.log('[error]', error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/create-payment-intent`, {
          paymentMethodId: paymentMethod.id,
          amount: 1099, // Example amount
        });
  
        const { client_secret, next_action } = response.data.paymentIntent;
  
        if (next_action) {
          // Handle the next_action if required, such as redirecting to a URL
          if (next_action.redirect_to_url) {
            window.location.href = next_action.redirect_to_url.url;
          }
        } else {
          console.log('Payment Intent Response:', response.data);
          // Handle the response
        }
      } catch (error) {
        console.error('Error sending payment method to server:', error);
      }
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>Pay</button>
    </form>
  );
 }; // Card Number: 4242 4242 4242 4242
// MM/YY: 12/24 (or any future date)
// CVC: 123
// ZIP: 12345 (or any valid zip code)


const StripeCheckout = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default StripeCheckout;
