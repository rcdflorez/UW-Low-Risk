$("div.step-1 a.verification-completed").click(function (e) {
  e.preventDefault();
  moveRight();
});
$("div.step-1 a.start-verification").click(function (e) {
  e.preventDefault();
  $(this).unbind("click", arguments.callee);
  BerbixHandOffToPhone();
  setTimeout(function () {
    BerbixVerificationCompleted();
  }, 3500);
});

$("a.uploadLink").click(function (e) {
  e.preventDefault();
  $("div.step-2")
    .load("upload-test.html", function () {})
    .hide()
    .fadeIn();
});

const InitExample = {
  comment: "this is a mock reflecting the final form of this API",
  loan_id: loanId,
  verifications: [
    {
      verification_type: "Photo ID",
      verification_provider: "Berbix",
      requirement_level: "Manditory",
      status: "NotStarted",
      verdict: "Undecided",
    },
    {
      verification_type: "Bank Account",
      verification_provider: "Lendmate",
      requirement_level: "Optional",
      status: "InProgress",
      verdict: "Undecided",
    },
    {
      verification_type: "Debit Card",
      verification_provider: "Stripe",
      requirement_level: "Optional",
      status: "InProgress",
      verdict: "Undecided",
    },
  ],
};
