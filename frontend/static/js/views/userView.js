import abstractView from "./abstractView.js";

export default class extends abstractView {
  constructor() {
    super();
    this.setTitle("User");
  }
  async getHtml() {
    const idUser = location.pathname.replace("/about/", "");
    let user = JSON.parse(sessionStorage.getItem("users")).find(
      (user) => user.id == idUser
    );
    console.log(user);
    return `
        <h2>User page</h2>
        <pre>${JSON.stringify(user)}</pre>
        <a href="/about" data-link>users</a>
        `;
  }
}
