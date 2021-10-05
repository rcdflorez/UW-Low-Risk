function startLendMateFlow() {
  $.ajax(`${verificationDomain}/api/uw_flow/lendmate/createClientToken`, {
    method: "POST",
    crossDomain: true,
    data: {
      loan_id: loanId,
    },
  }).done((data) => {
    data.widget_link;

    let lmFrame = $("#lendMateContainer");
    let iframeSource = data.widget_link;
    lmFrame.attr("src", iframeSource);

    window.onmessage = (event) => {
      console.log(`Received message: ${event.data}`);
      console.log(event);
      if (event.data.success) {
        setTimeout(function () {
          $("div.step-2").html(
            '<svg class="checkmark mx-auto mb-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/><path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg><h1 class="my-sm-4 heading-title col-md-11 mx-auto mb-5">Your Account is successfully verified and linked!</h1><a onClick="(function(){moveRight()})();return false;" href="" class="btn justify-content-center btn btn-access mb-3 verification-completed"> Continue</a>'
          );
        }, 2000);
      }
    };
  });
}
