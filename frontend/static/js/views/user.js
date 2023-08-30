import abstractView from "./abstractView.js";

export default class extends abstractView {
  constructor() {
    super();
    this.setTitle("User");
  }
  async mountView(header) {
    return `
    ${this[header]}
        <h2>User page</h2>
        <div class="userCard">
        </div>
        `;
  }
  async afterViewMount() {
    const cardElement = document.querySelector(".userCard");
    const p = createHtmlElement(cardElement, "span", "loader");
    const div = createHtmlElement(cardElement, "div", "card-content");
    animeLoader(p);

    setTimeout(async () => {
      const rawDatas = await fetch(
        `https://jsonplaceholder.typicode.com/users/${getParamUrl()}`
      );
      const user = await rawDatas.json();
      if (Object.values(user).length > 0) {
        storeUser(user);
        animeElementDiv(div);
        div.innerHTML = `<h3>${user.name}</h3><p>Name ${user.username}</p><p>Email: ${user.email}</p>`;
        cardElement.removeChild(p);
      } else {
        errorHtml();
      }
    }, 1000);
  }
}

const getParamUrl = () => {
  const regex = /^\/user\/(.+)$/;
  return location.pathname.match(regex)[1];
};

const createHtmlElement = (cardElement, tag, className) => {
  const element = document.createElement(tag);
  cardElement.appendChild(element);
  element.classList.add(className);
  return element;
};

const storeUser = (user) => {
  const store = window.Store;
  store.userConnected(user);
};

const errorHtml = () => {
  const pError = createHtmlElement(cardElement, "p");
  pError.innerHTML = `Url incorrect`;
};

const animeLoader = (element) => {
  const loaderSpinning = [
    { transform: "translateX(0px)" },
    { transform: "translateX(100px)", opacity: 0 },
  ];

  const loaderTiming = {
    duration: 1000,
    iterations: 4,
  };
  return element.animate(loaderSpinning, loaderTiming);
};

const animeElementDiv = (element) => {
  const loaderSpinning = [{ opacity: 0 }, { opacity: 1 }];

  const loaderTiming = {
    duration: 1000,
  };
  return element.animate(loaderSpinning, loaderTiming);
};
