import abstractView from "./abstractView.js";

/**
 * @module Contact
 */
export default class extends abstractView {
  constructor(contactHeader) {
    super(contactHeader);
    this.setTitle("Contact");
  }
  async getHtml(header) {
    return `
    ${this[header]}
      <main>
        <h2>Contact me</h2>
        <button type="button">Show phone number</button>
        <span id="phoneNumber"></span>
        <div class="contact-block">
          <p id="contentToHide">Hide Using CSS</p>
          <a href="/" data-link>Home</a>
        </div>
        <div id="phoneBlock">
          <div id="formBlock"></div>
        </div>
        
        
      </main>
        `;
  }
}
