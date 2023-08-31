import { homeHeader, contactHeader } from "../layout/headers.js";

export default class {
  constructor() {
    this.headers = {
      homeHeader,
      contactHeader,
    };
  }
  //* Communs functions use for each views */
  setTitle(title) {
    document.title = title;
  }
}
