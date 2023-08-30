export const mountContact = () => {
  console.log("execute this on mount");

  //* then load the event listeners
  showPhoneNumber();
  showFromComponent();
};

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
