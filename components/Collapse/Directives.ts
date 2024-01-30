export const vCollapse = {
  mounted: (el, binding) => {
    el.addEventListener("click", () => {
      const collapse = document.getElementById(binding.value);
      if (collapse?.classList.value.includes("open")) {
        collapse?.classList.remove("open");
      } else {
        collapse?.classList.add("open");
      }
    });
  },
  destroyed: (el) => {
    el.removeEventListener("click");
  },
};
