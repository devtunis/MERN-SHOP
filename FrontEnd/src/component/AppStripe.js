// src/App.js
import React from 'react';
import StripeCheckout from './StripeCheckout';

function AppStripe() {
  return (
    <div className="App">
      <h1>Stripe Checkout</h1>
      <StripeCheckout />
    </div>
  );
}

export default AppStripe;
