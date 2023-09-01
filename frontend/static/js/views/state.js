import abstractView from "./abstractView.js";

export default class extends abstractView {
  constructor() {
    super();
    this.setTitle("State");
  }
  async mountView(header) {
    return `
        ${this.headers[header]}
        <section>        
          <h2>State</h2>
          <button type="button" id="increment">Increment</button>
        <button type="button" id="decrement">Decrement</button>
        <div id="counterBlock"></div>
        <div id="formBlock"></div>
        </section>
        ${this.footer}
    `;
  }
  async afterViewMount() {
    //! Une fois le template de la vue mounted, éxécute le script suivant
    //!pour rendre la page dynamique, ajout d'event, fetch data...
    useStore();
    setTimeout(() => {
      console.log(document.forms);
    }, 500);
  }
}

const showFromComponent = async () => {
  //? IMPORT FORM DYNAMICALLY TO BE LAZY LOAD
  const { useForm } = await import("../components/form.js");
  const newFrom = new useForm("#formBlock", ["Email", "Password"]);
  newFrom.render();
  newFrom.submit();
};

const useStore = () => {
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
  showFromComponent();
};
