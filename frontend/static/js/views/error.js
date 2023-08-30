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
        <div id="customContent">

        </div>
        <a href="/" data-link>Back Home</a>
    `;

    let content = main.querySelector("#customContent");
    content.innerHTML = `
        <h3>Example to create a layout</h3>
    `;
  }
};
