import useForm from "../components/form.js";

export const mountHome = () => {
  showStore();
  showFromComponent();
};

const showStore = () => {
  const { value } = window.Store;
  const p = document.querySelector("#storeValue");
  p.innerHTML = `Store value change in state route to ${value}`;
};

const showFromComponent = () => {
  const newFrom = new useForm("#formBlock", ["Name", "Email"]);
  newFrom.render();
  newFrom.submit();
};
