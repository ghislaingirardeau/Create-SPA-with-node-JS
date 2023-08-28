import abstractView from "./abstractView.js";

export default class extends abstractView {
  constructor() {
    super();
    this.setTitle("User");
  }
  async getHtml(layout) {
    const idUser = location.pathname.replace("/user/", "");
    let user = JSON.parse(sessionStorage.getItem("users")).find(
      (user) => user.id == idUser
    );
    console.log(user);
    return `
    ${this[layout]}
        <h2>User page</h2>
        <div class="card">
          <h3>${user.username}</h3>
          <p>${user.email}</p>
        </div>
        <a href="/users" data-link>Users</a>
        `;
  }
}
