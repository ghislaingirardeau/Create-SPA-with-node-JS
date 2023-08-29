import useForm from "../components/form.js";

export const mountState = () => {
  const state = window.Store;
  const btnIncrement = document.querySelector("#increment");
  const btnDecrement = document.querySelector("#decrement");
  const counterBlock = document.querySelector("#counterBlock");
  const span = document.createElement("span");
  counterBlock.appendChild(span);
  btnIncrement.onclick = (e) => {
    state.increment();
    span.innerHTML = `Counter: ${state.value}`;
  };
  btnDecrement.onclick = (e) => {
    state.decrement();
    span.innerHTML = `Counter: ${state.value}`;
  };
  span.innerHTML = `Counter: ${state.value}`;

  const newFrom = new useForm("#formBlock", ["Email", "Password"]);
  newFrom.render();
  newFrom.submit();
};
