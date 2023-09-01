import abstractView from "./abstractView.js";

export const errorView = class extends abstractView {
  constructor() {
    super();
    this.setTitle("Error");
  }
  async mountView() {
    //? ici je peux ajouter header et footer commun
    //? Ma vue sera alors ajouter dans la main, par les methods

    return `
      <header>
       <p>Mon layout header ici</p>
      </header>
        <main>
          
        </main>
        <footer>
       <p>Mon layout footer là</p>
      </footer>
        `;
  }
  async afterViewMount() {
    let main = document.querySelector("main");
    main.innerHTML = `
        <h2>PAGE NOT FOUND</h2>
        <button type="button">Add new element</button>
        <div id="customContent">

        </div>
        <a href="/" data-link-go-back>Back Home</a>
    `;

    let content = main.querySelector("#customContent");
    content.innerHTML = `
        <h3>Example to create layout</h3>
    `;

    //* play with element methods
    content.oncopy = (event) => {
      console.log(event);
    };

    beforeAndAfter(content);
    insertAdjacentElt(content);
    showClosestElementParent(content);
    console.log(content.childElementCount, content.children);
  }
};

const showClosestElementParent = (content) => {
  console.log(content.closest("#app"));
};

const insertAdjacentElt = (content) => {
  let button = document.querySelector("button");
  button.addEventListener("click", () => {
    const p = document.createElement("p");
    p.style.color = "red";
    p.innerHTML = "Adjacent Element inserted";
    content.insertAdjacentElement("beforeend", p);
  });
};

const beforeAndAfter = (content) => {
  const p1 = document.createElement("p");
  const p2 = document.createElement("p");

  content.before("p2 add before", p2);

  content.after("p1 add after", p1);
};
