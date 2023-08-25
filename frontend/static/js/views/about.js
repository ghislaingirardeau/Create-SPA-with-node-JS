import abstractView from "./abstractView.js";

export default class extends abstractView {
  constructor() {
    super();
    this.setTitle("About");
  }
  async getHtml() {
    const rawDatas = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await rawDatas.json();
    sessionStorage.setItem("users", JSON.stringify(users));
    let usersToHtml = [];
    users.forEach((element) => {
      usersToHtml.push(`<div class="card">
      <h3>${element.name}</h3>
      <p>User name: ${element.username}</p>
      <p>@email: ${element.email}</p>
      <a href="/about/${element.id}" data-link>Details</a>
      </div>`);
    });
    return `
        <h2>About users</h2>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi vitae mollitia illo officiis? Atque ut ab, ipsa, sed accusantium eveniet facere fuga dignissimos, ratione placeat officiis rerum dolorum eligendi voluptatum!</p>
        <h2>Users List</h2>
        <div class="cards">${usersToHtml.join("")}</div>
        <a href="/" data-link>Home</a>
        `;
  }
}
