var handler = BerbixVerify.configure({
  onComplete: function () {
    $("#berbixArea").html(
      '<h1 class="heading-title mb-5">  Thanks for completing the ID check</h1><p class="mb-5">Now proceed with bank verification.</p><svg class="checkmark mx-auto mb-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/><path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg><a onClick="(function(){moveRight()})();return false;" href="" class="btn justify-content-center btn btn-access mb-3 verification-completed"> Continue</a>'
    );
    startLendMateFlow();
  },
  onExit: function () {
    alert("Verification exited.");
  },
});

$.ajax(`${verificationDomain}/api/uw_flow/berbix/createClientToken`, {
  method: "POST",
  crossDomain: true,
  beforeSend: function () {
    //
  },
  success: function () {},
  data: {
    hosted,
    test_name: testName,
    loan_id: loanId,
  },
})
  .done((data) => {
    clientToken = data.client_token;

    handler.open({
      clientToken: clientToken,
      modal: false,
      root: "berbixArea",
    });
  })
  .then(() => {
    $("div.BerBix-place-holder").fadeOut("slow", function () {
      $(this).html("");
    });
  });
