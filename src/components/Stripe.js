import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const Stripe = ({ price, datas }) => {
  const priceForUser = parseFloat(price.toFixed(2));
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_51KFEm7KyFYzC5CCa4uxsW5y7kO81hZvpKoKoDNbjZwOR0Le3eBG93z98GODyzsgfpkBHV4qWk8MBb9ruorvGuTCh00pYTURmRt';

  const onToken = token => {
    console.log(token, datas);
    alert('Payment Succesful!');
  };

  return (
    <StripeCheckout
      label='Payer maintenant avec votre 💳'
      name='ABC inc.'
      billingAddress
      shippingAddress
      image='https://bulma.io/images/placeholders/128x128.png'
      description={`Le montant total est de: ${priceForUser}€`}
      amount={priceForStripe}
      panelLabel='Procéder au paiement'
      token={onToken}
      stripeKey={publishableKey}
      currency='EUR'
      locale='fr'
    />
  )
}

export default Stripe;