import abstractView from "./abstractView.js";

export default class extends abstractView {
  constructor(homeHeader) {
    super(homeHeader);
    this.setTitle("State");
  }
  async getHtml(header) {
    return `
        ${this[header]}
        <main>        
          <h2>State</h2>
          <button type="button" id="increment">Increment</button>
        <button type="button" id="decrement">Decrement</button>
        <div id="counterBlock"></div>
        <div id="formBlock"></div>
        </main>
    `;
  }
}
