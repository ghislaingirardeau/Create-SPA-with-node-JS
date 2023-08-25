import abstractView from "./abstractView.js";

export default class extends abstractView {
  constructor() {
    super();
    this.setTitle("Home");
  }
  async getHtml() {
    return `
        <h2>Welcome to mySPA</h2>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi vitae mollitia illo officiis? Atque ut ab, ipsa, sed accusantium eveniet facere fuga dignissimos, ratione placeat officiis rerum dolorum eligendi voluptatum!</p>
    `;
  }
}
