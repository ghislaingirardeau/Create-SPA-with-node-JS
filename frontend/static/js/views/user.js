import abstractView from "./abstractView.js";

export default class extends abstractView {
  constructor() {
    super();
    this.setTitle("User");
  }
  async getHtml(header) {
    return `
    ${this[header]}
        <h2>User page</h2>
        <div class="userCard">
        </div>
        `;
  }
}
