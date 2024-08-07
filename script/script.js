document.addEventListener("DOMContentLoaded", function () {
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
});
