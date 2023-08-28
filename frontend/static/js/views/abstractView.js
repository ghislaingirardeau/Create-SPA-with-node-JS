import { homeHeader, contactHeader } from "../layout/headers.js";

export default class {
  constructor() {
    this.homeHeader = homeHeader;
    this.contactHeader = contactHeader;
  }
  //* Communs functions use for each views */
  setTitle(title) {
    document.title = title;
  }
}
