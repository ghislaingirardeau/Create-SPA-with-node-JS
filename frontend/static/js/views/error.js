import abstractView from "./abstractView.js";

export default class extends abstractView {
  constructor() {
    super();
    this.setTitle("Error");
  }
  async getHtml() {
    return `
        <h2>PAGE NOT FOUND</h2>
        <a href="/" data-link>Back Home</a>
        `;
  }
}
