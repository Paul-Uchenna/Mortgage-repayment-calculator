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

// Mortgage Operation
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

function resultDisplay(resultOperation) {
  let emptyResult = document.querySelector(".empty-result");
  emptyResult.style.display = "none";

  let completeResults = document.querySelector(".complete-results");
  completeResults.style.display = "block";

  let monthlyPayment = (document.querySelector(
    '[data-result="monthly-payment"]'
  ).textContent = resultOperation.monthlyPayment.toFixed(2));

  let totalRepayment = (document.querySelector(
    '[data-result="total-repayment"]'
  ).textContent = resultOperation.totalRepayment.toFixed(2));

  return { monthlyPayment, totalRepayment };
}

btnCalculate.addEventListener("click", () => {
  const result = OperationRepayment();
  console.log(`Monthly Payment: ${result.monthlyPayment.toFixed(2)}`);
  console.log(`Total Repayment: ${result.totalRepayment.toFixed(2)}`);

  resultDisplay(result);
});
