export default async function generateToken(cardNumber, expMonth, expYear, cvc) {
    const fetchKey = await fetch('config.json');
    const fetchKetJson = await fetchKey.json();
    const key = fetchKetJson.STRIPE_PUBLISHABLE_KEY;

    const stripe = Stripe(key);

    stripe.createToken('card', {
        card: {
            number: cardNumber,
            exp_month: expMonth,
            exp_year: expYear,
            cvc: cvc
        }
    }).then(function(result) {
        if (result.error) {
          console.error(result.error);
        } else {
          return result.token;
        }
      });
}
