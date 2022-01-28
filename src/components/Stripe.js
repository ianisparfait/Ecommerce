import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const Stripe = ({ price }) => {
  console.log('drogijdolfigj')
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_51KFEm7KyFYzC5CCa4uxsW5y7kO81hZvpKoKoDNbjZwOR0Le3eBG93z98GODyzsgfpkBHV4qWk8MBb9ruorvGuTCh00pYTURmRt';

  const onToken = token => {
      console.log(token);
      alert('Payment Succesful!');
  };

  return (
    <StripeCheckout
      label='Pay Now'
      name='ABC inc.'
      billingAddress
      shippingAddress
      image='https://bulma.io/images/placeholders/128x128.png'
      description={`Le montant total est de: $${price}`}
      amount={priceForStripe}
      panelLabel='Payer maintenant'
      token={onToken}
      stripeKey={publishableKey}
    />
  )
}

export default Stripe;