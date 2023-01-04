document.addEventListener(
  "DOMContentLoaded",
  (args) => {
    l("hello world");
    l(undefined);
    l(null);
    l(123);
    l("ok");
  },
  false
);

const l = (args) => {
  const result = document.querySelector(".result");
  const p = document.createElement("p");
  p.textContent =
    args === undefined ? "undefind" : args === null ? "null" : args;
  result.appendChild(p);
};
