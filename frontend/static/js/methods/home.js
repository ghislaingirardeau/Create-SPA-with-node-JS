export const mountHome = () => {
  showStore();
};

const showStore = () => {
  const { value, user } = window.Store;
  console.log(user);
  const p = document.querySelector("#storeValue");
  p.innerHTML = `Store value change in state route to <strong>${value}</strong>`;
};
