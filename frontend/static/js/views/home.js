import abstractView from "./abstractView.js";

export default class extends abstractView {
  constructor(homeHeader) {
    super(homeHeader);
    this.setTitle("Home");
  }
  async getHtml(layout) {
    return `
        ${this[layout]}
        <main>        
          <h2>Welcome to mySPA</h2>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi vitae mollitia illo officiis? Atque ut ab, ipsa, sed accusantium eveniet facere fuga dignissimos, ratione placeat officiis rerum dolorum eligendi voluptatum!</p>
        </main>
    `;
  }
}
