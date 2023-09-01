import { homeHeader, contactHeader } from "../layout/headers.js";
import { footerGlobal } from "../layout/footer.js";

export default class {
  constructor() {
    this.headers = {
      homeHeader,
      contactHeader,
    };
    this.footer = footerGlobal();
  }
  //* Communs functions use for each views */
  setTitle(title) {
    document.title = title;
  }
}
