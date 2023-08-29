import abstractView from "./abstractView.js";

export default class extends abstractView {
  constructor() {
    super();
    this.setTitle("Error");
  }
  async getHtml() {
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
}
