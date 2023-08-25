import abstractView from "./abstractView.js";

export default class extends abstractView {
  constructor() {
    super();
    this.setTitle("Contact");
  }
  async getHtml() {
    return `
        <h2>Contact me</h2>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi vitae mollitia illo officiis? Atque ut ab, ipsa, sed accusantium eveniet facere fuga dignissimos, ratione placeat officiis rerum dolorum eligendi voluptatum!</p>
        <a href="/" data-link>Home</a>
        `;
  }
}
