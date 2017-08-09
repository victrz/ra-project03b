export default class Checkout{
  constructor(){}
  onClickCheckout(ss){
    let sessionStorage = ss;
    console.log(sessionStorage);
    document.getElementById('checkout-section').style.display = "block";
    // Create a Stripe client
    let stripe = Stripe('pk_test_jke2NeGE1i7wqedx1hy0t0nC');
    // Create an instance of Elements
    let elements = stripe.elements();
    // Custom styling can be passed to options when creating an Element.
    // (Note that this demo uses a wider set of styles than the guide below.)
    let style = {
      base: {
        color: '#32325d',
        lineHeight: '24px',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    };
    // Create an instance of the card Element
    let card = elements.create('card', {style: style});
    // Add an instance of the card Element into the `card-element` <div>
    card.mount('#card-element');
    // Handle real-time validation errors from the card Element.
    card.addEventListener('change', function(event) {
      let displayError = document.getElementById('card-errors');
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = '';
      }
    });
    // Handle form submission
    let form = document.getElementById('payment-form');
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      stripe.createToken(card).then(function(result) {
        if (result.error) {
          // Inform the user if there was an error
          let errorElement = document.getElementById('card-errors');
          errorElement.textContent = result.error.message;
        } else {
          // Send the token to your server
          // stripeTokenHandler(result.token);
          document.getElementById('checkout-section').style.display = "none";
          document.getElementById("testing").innerHTML= "";
          document.getElementById("numItemsParagraph").innerHTML = "";
          document.getElementById("cart-total").innerHTML = "0";
          document.getElementById('checkout-success').style.display = "block";
          sessionStorage.clear();
        }
      });
    });
  }
}
