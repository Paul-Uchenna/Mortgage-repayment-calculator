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

// Cache DOM elements for future use
const clearBtn = document.getElementById("clear-btn");
const mortgageAmount = parseFloat(
  document.getElementById("mortgage-amount").value
);
const mortgageTerm = parseInt(
  document.getElementById("mortgage-term", 10).value
);
const interestRate = parseFloat(document.getElementById("interest-rate").value);
const btnCalculate = document.getElementById("btn-calculate");

// clear Inputs
clearBtn.addEventListener("click", (event) => {
  event.preventDefault();

  const Allinputs = document.querySelectorAll(
    "#mortgage-amount,#mortgage-term,#interest-rate"
  );

  Allinputs.forEach((input) => (input.value = ""));
});

// Mortgage Operation
function monthlyRepayment() {
  let principal = mortgageAmount;
  let monthTerm = mortgageTerm * 12;
  let monthRate = interestRate / 100 / 12;

  let monthlyPayment =
    (principal * monthRate * Math.pow(1 + monthRate, monthTerm)) /
    (Math.pow(1 + monthRate, monthTerm) - 1);

  let totalRepayment = monthlyPayment * monthTerm;

  return { monthlyPayment, totalRepayment };
}

btnCalculate.addEventListener("click", () => {
  monthlyRepayment();
  console.log(monthlyRepayment().monthlyPayment.toFixed(2));
  console.log(monthlyRepayment().totalRepayment.toFixed(2));
});
