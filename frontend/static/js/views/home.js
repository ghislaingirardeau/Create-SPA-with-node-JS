import abstractView from "./abstractView.js";

export default class extends abstractView {
  constructor() {
    super();
    //! Execute la methods when a new instance is created
    this.setTitle("Home");
  }
  async mountView(header) {
    //! Je mets les elements statics du site ici ou tag html global
    //! Une fois mounted, j'intéragis avec le DOM via les methods

    //* recupere le template et copie le template pour ensuite l'afficher
    const templateHome = document
      .querySelector("#templateHomeView")
      .cloneNode(true);


    return `
        ${this.headers[header]}
        ${templateHome.innerHTML}
        ${this.footer}
    `;
  }
  async afterViewMount() {
    //! Une fois le template de la vue mounted, éxécute le script suivant
    //!pour rendre la page dynamique, ajout d'event, fetch data...
    showStore();
    //? Get cookies
    let p = document.createElement("p");
    document.querySelector("#storeUser").after(p);
    p.innerHTML = `Cookie send from server: ${getCookie("cookieUser")}`;
    /* setCookie("Hello", "cookie from client", 1); */
  }
}

//? METHODS NOT EXPORTED, SPECIFIC TO THE PAGE
//? store inside function the logic to make it clear
const showStore = () => {
  const { value, user } = window.Store;
  const p = document.querySelector("#storeValue");
  p.innerHTML = `Store value change in state route to <strong>${value}</strong>`;
  const pre = document.querySelector("#storeUser");
  pre.innerHTML =
    Object.values(user).length > 0
      ? `User: ${JSON.stringify(user)}`
      : `No user connected`;
};

const getCookie = (params) => {
  let cookies = document.cookie.split("; ");
  let cookie = cookies.find((c) => c.startsWith(params))?.split("=")[1];
  return cookie === undefined ? null : decodeURIComponent(cookie);
};

/**
 *
 * @param {string} name
 * @param {string} value
 * @param {number} days
 */
function setCookie(name, value, days) {
  if (getCookie(name)) {
    return;
  }
  const date = new Date();
  date.setDate(date.getDate() + days);
  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; expires=${date.toUTCString()}`;
}
