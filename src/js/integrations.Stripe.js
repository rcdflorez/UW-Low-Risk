const stripe = Stripe(
  "pk_test_51Jb9enAHbLznbaLf9EcKJTditUr2GoFeVPKnNukpkw3d6fiVApm772Kqqj8o7EdHgfAR5LkkNfNiSTZXsf7kT0G900jVxF0X3t"
);
var elements = stripe.elements();

// Try to match bootstrap 4 styling
var style = {
  base: {
    lineHeight: "1.35",
    fontSize: "1.11rem",
    color: "#495057",
    fontFamily:
      'apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif',
    height: "3rem !important",
  },
};

// Card number
var card = elements.create("cardNumber", {
  placeholder: "",
  style: style,
});
card.mount("#card-number");

// CVC
var cvc = elements.create("cardCvc", {
  placeholder: "",
  style: style,
});
cvc.mount("#card-cvc");

// Card expiry
var exp = elements.create("cardExpiry", {
  placeholder: "",
  style: style,
});
exp.mount("#card-exp");

const cardholderName = $("#firstName").val() + " " + $("#lastname").val();
const cardButton = $("#card-button");
const resultContainer = $("#card-errors");

cardButton.click(async () => {
  const { paymentMethod, error } = await stripe.createPaymentMethod({
    type: "card",
    card: card,
    billing_details: {
      name: cardholderName.value,
    },
  });

  if (error) {
    // Display error.message in your UI.
    resultContainer.textContent = error.message;
  } else {
    // You have successfully created a new PaymentMethod
    resultContainer.textContent = "Created payment method: " + paymentMethod.id;

    //todo: this API is currently a mock and will always succeed unless the test_bad_request parameter is passed
    $.ajax(`${verificationDomain}/api/uw_flow/stripe/newPaymentMethod`, {
      method: "POST",
      data: {
        payment_method_id: paymentMethod.id,
        //,test_bad_request: true  //comment this line to make the api call fail -
      },
    })
      .done((data) => {
        //alert("Card is good");

        $("div.step-3").html(
          '<svg class="checkmark mx-auto mb-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/><path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg><h1 class="my-4 completed-process-title ">Thank you!</h1><span>Your debit card was successfully verified </span><p class="mt-5"><a onClick="(function(){moveRight()})();return false;" href="" class="btn justify-content-center btn btn-access mb-3 verification-completed"> Continue</a></p>'
        );
      })
      .fail((data) => {
        alert("Card is bad");
      });
  }
});
