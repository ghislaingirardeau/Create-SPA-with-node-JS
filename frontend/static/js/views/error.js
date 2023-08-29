import abstractView from "./abstractView.js";

export default class extends abstractView {
  constructor() {
    super();
    this.setTitle("Error");
  }
  async getHtml() {
    return `
        <main>
          
        </main>
        `;
  }
}
