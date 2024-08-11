// Style the mortgage type checkboxes when clicked
const checkboxes = document.querySelectorAll('input[type="checkbox"]');

checkboxes.forEach(function (checkbox) {
  const parentContainer = checkbox.closest("div");

  checkbox.addEventListener("change", function () {
    if (checkbox.checked) {
      parentContainer.style.border = "1px solid var(--color-lime)";
    } else {
      parentContainer.style.border = "1px solid var(--color-slate-700)";
    }
  });
});

// Add focus styles to text inputs
document
  .querySelectorAll(
    ".input-mortgage-amount input, .input-mortgage-term input, .input-interest-rate input"
  )
  .forEach((input) => {
    input.addEventListener("focus", () => {
      input.parentElement.classList.add("focused");
    });

    input.addEventListener("blur", () => {
      input.parentElement.classList.remove("focused");
    });
  });

// Cache DOM elements
const clearBtn = document.getElementById("clear-btn");
const btnCalculate = document.getElementById("btn-calculate");

// clear Inputs
clearBtn.addEventListener("click", (event) => {
  event.preventDefault();

  const allInputs = document.querySelectorAll(
    "#mortgage-amount,#mortgage-term,#interest-rate"
  );

  allInputs.forEach((input) => (input.value = ""));
});

// functoin that check if inputs is valid
function isAmountValidInput() {
  const divInputAmountError = document.querySelector(".input-mortgage-amount");
  const amountSpanError = document.getElementById("amount-error-message");
  const amountLabelError = document.querySelector(
    "label[for='mortgage-amount']"
  );
  const amountInput = document.getElementById("mortgage-amount");

  amountSpanError.textContent = "";

  const amountValue = parseFloat(amountInput.value);

  if (isNaN(amountValue)) {
    amountSpanError.textContent = "This field is required";

    divInputAmountError.style.border = "1px solid var(--color-red)";
    amountLabelError.style.color = "var(--color-white)";
    amountLabelError.style.background = "var(--color-red)";

    return false;
  }

  divInputAmountError.style.border = "";
  amountLabelError.style.color = "";
  amountLabelError.style.background = "";

  return true;
}

function isTermValidInput() {
  const divInputTermError = document.querySelector(".input-mortgage-term");
  const termSpanError = document.getElementById("term-error-message");
  const termLabelError = document.querySelector("label[for='mortgage-term']");
  const termInput = document.getElementById("mortgage-term");

  termSpanError.textContent = "";

  const termValue = parseInt(termInput.value);

  if (isNaN(termValue)) {
    termSpanError.textContent = "This field is required";

    divInputTermError.style.border = "1px solid var(--color-red)";
    termLabelError.style.color = "var(--color-white)";
    termLabelError.style.background = "var(--color-red)";

    return false;
  }

  divInputTermError.style.border = "";
  termLabelError.style.color = "";
  termLabelError.style.background = "";

  return true;
}

function isRateValidInput() {
  const divInputRateError = document.querySelector(".input-interest-rate");
  const rateSpanError = document.getElementById("rate-error-message");
  const rateLabelError = document.querySelector("label[for='interest-rate']");
  const rateInput = document.getElementById("interest-rate");

  rateSpanError.textContent = "";

  const rateValue = parseFloat(rateInput.value);

  if (isNaN(rateValue)) {
    rateSpanError.textContent = "This field is required";
    divInputRateError.style.border = "1px solid var(--color-red)";
    rateLabelError.style.color = "var(--color-white)";
    rateLabelError.style.background = "var(--color-red)";

    return false;
  }

  divInputRateError.style.border = "";
  rateLabelError.style.color = "";
  rateLabelError.style.background = "";

  return true;
}

function isCheckboxValid() {
  const checkboxErrorSpan = document.getElementById(
    "mortgagetype-error-message"
  );
  const checkboxes = document.querySelectorAll('input[name="mortgage-type"]');
  let isChecked = false;

  checkboxErrorSpan.textContent = "";

  checkboxes.forEach(function (checkbox) {
    if (checkbox.checked) {
      isChecked = true;
    }
  });

  if (!isChecked) {
    checkboxErrorSpan.textContent = "This field is required";
    return false;
  }

  return true;
}

// Mortgage Operation
// Calculates monthly payments and total repayment
function OperationRepayment() {
  // Cache DOM elements
  let principal = parseFloat(document.getElementById("mortgage-amount").value);
  let mortgageTerm = parseInt(
    document.getElementById("mortgage-term").value,
    10
  );
  let interestRate = parseFloat(document.getElementById("interest-rate").value);

  let monthTerm = mortgageTerm * 12;
  let monthRate = interestRate / 100 / 12;

  let monthlyPayment =
    (principal * monthRate * Math.pow(1 + monthRate, monthTerm)) /
    (Math.pow(1 + monthRate, monthTerm) - 1);

  let totalRepayment = monthlyPayment * monthTerm;

  return { monthlyPayment, totalRepayment };
}

// Display Results
// Displays the calculated results on the page
function resultDisplay(resultOperation) {
  let emptyResult = document.querySelector(".empty-result");
  emptyResult.style.display = "none";

  let completeResults = document.querySelector(".complete-results");
  completeResults.style.display = "block";

  let monthlyPayment = (document.querySelector(
    '[data-result="monthly-payment"]'
  ).textContent = resultOperation.monthlyPayment.toLocaleString("en-GB", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }));

  let totalRepayment = (document.querySelector(
    '[data-result="total-repayment"]'
  ).textContent = resultOperation.totalRepayment.toLocaleString("en-GB", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }));

  return { monthlyPayment, totalRepayment };
}

btnCalculate.addEventListener("click", () => {
  isAmountValidInput();
  isTermValidInput();
  isRateValidInput();
  isCheckboxValid();

  if (
    isAmountValidInput() &&
    isTermValidInput() &&
    isRateValidInput() &&
    isCheckboxValid()
  ) {
    const result = OperationRepayment();
    resultDisplay(result);
  }
});
