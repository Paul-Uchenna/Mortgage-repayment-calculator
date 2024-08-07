document.addEventListener("DOMContentLoaded", function () {
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
  const mortgageAmount = document.getElementById("mortgage-amount");
  const mortgageTerm = document.getElementById("mortgage-term");
  const interestRate = document.getElementById("interest-rate");
  const btnCalculate = document.getElementById("btn-calculate");
});
