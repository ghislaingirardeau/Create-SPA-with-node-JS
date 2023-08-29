import abstractView from "./abstractView.js";

export default class extends abstractView {
  constructor(homeHeader) {
    super(homeHeader);
    this.setTitle("Users");
  }
  async getHtml(header) {
    let usersToHtml = [];
    let loader = true;
    try {
      const rawDatas = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const users = await rawDatas.json();
      if (users) {
        sessionStorage.setItem("users", JSON.stringify(users));
        users.forEach((element) => {
          usersToHtml.push(`<div class="card">
            <h3>${element.name}</h3>
            <p>User name: ${element.username}</p>
            <p>@email: ${element.email}</p>
            <a href="/user/${element.id}" data-link>Details</a>
            </div>`);
        });
      }
    } catch (error) {
      loader = false;
      console.log(error);
    }
    return `
    ${this[header]}
    <main>
      <h2>Login</h2>
      <form id="submitForm">
      <input type="email" name="email">
      <input type="button" value="Login">
    </form>
    <span id="loginErrorMessage"></span>
    <span id="loginEmailModel"></span>       
      
      <h2>Users List</h2>

      ${
        loader
          ? `<div class="cards">${usersToHtml.join("")}</div>`
          : `<p>Error to load user</p>`
      }

      
      <a href="/" data-link>Home</a>
    </main>
        `;
  }
}
