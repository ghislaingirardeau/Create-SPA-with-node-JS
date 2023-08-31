import abstractView from "./abstractView.js";

export default class extends abstractView {
  constructor() {
    super();
    this.setTitle("Users");
  }
  async mountView(header) {
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
    ${this.headers[header]}
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
  async afterViewMount(navigateTo) {
    logUser(navigateTo);
  }
}

const logUser = (navigateTo) => {
  let form = document.querySelector("#submitForm");
  if (form) {
    const button = form.querySelector("[type='button']");
    button.addEventListener("click", () => {
      const email = form.querySelector("[type='email']");
      let user = JSON.parse(sessionStorage.getItem("users")).find(
        (user) => user.email == email.value
      );
      if (user) {
        navigateTo(`${location.origin}/user/${user.id}`);
      } else {
        document.querySelector("#loginErrorMessage").innerHTML =
          "This email is not correct";
      }
    });
    form.querySelector("[type='email']").addEventListener("keyup", (e) => {
      console.log(e.target.value);
      document.querySelector("#loginEmailModel").innerHTML = e.target.value;
    });
  }
};
