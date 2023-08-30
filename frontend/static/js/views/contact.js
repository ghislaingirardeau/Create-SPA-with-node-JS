import abstractView from "./abstractView.js";

/**
 * @module Contact
 */
export default class extends abstractView {
  constructor(contactHeader) {
    super(contactHeader);
    this.setTitle("Contact");
  }
  async mountView(header) {
    return `
    ${this[header]}
      <main>
        <h2>Contact me</h2>
        <button type="button">Show phone number</button>
        <span id="phoneNumber"></span>
        <div class="contact-block">
          <p id="contentToHide">Hide Using CSS</p>
          <a href="/" data-link>Home</a>
        </div>
        <div id="phoneBlock">
          <div id="formBlock"></div>
        </div>
        
        
      </main>
        `;
  }
  async afterViewMount() {
    //! Une fois le template de la vue mounted, éxécute le script suivant
    //!pour rendre la page dynamique, ajout d'event, fetch data...
    showPhoneNumber();
    showFromComponent();
  }
}

const showPhoneNumber = () => {
  let buttonPhone = document.querySelector("[type='button']");

  //? ADD OR REMOVE NODE ELEMENT
  buildElement(buttonPhone);

  //? WITH CSS
  /* usingCSS(buttonPhone); */
};

const showFromComponent = async () => {
  //? IMPORT FORM DYNAMICALLY TO BE LAZY LOAD
  const { useForm } = await import("../components/form.js");
  const newFrom = new useForm("#formBlock", ["Email", "Password"]);
  newFrom.render();
  newFrom.submit();
};

const buildElement = (buttonPhone) => {
  let show = false;
  let div = document.querySelector("#phoneBlock");
  buttonPhone.onclick = (event) => {
    show = !show;
    show ? (div.style.height = "100px") : (div.style.height = "0px");
  };
  div.ontransitionstart = (event) => {
    console.log("event start");
    if (show) {
      const p = document.createElement("p");
      const span = document.createElement("span");
      div.appendChild(span);
      div.appendChild(p);
      p.innerHTML = `<p>Here is my phone number</p>`;
      span.innerHTML = `<span id="phoneNumber">0123 456 789</span>`;
    } else {
      div.removeChild(div.querySelector("span"));
      div.removeChild(div.querySelector("p"));
    }
  };
};

const usingCSS = (buttonPhone) => {
  let show = true;
  let contentToHide = document.querySelector("#contentToHide");
  buttonPhone.onclick = (event) => {
    show = !show;

    if (show) {
      //contentToHide.style.opacity = 1;
      contentToHide.style.height = "50%";
    } else {
      //contentToHide.style.opacity = 0;
      contentToHide.style.height = "0px";
    }
  };
  //* do something at the end of the transition
  contentToHide.ontransitionend = (event) => {
    contentToHide.style.opacity = 0;
    show
      ? (contentToHide.style.opacity = 1)
      : (contentToHide.style.opacity = 0);
  };
};
