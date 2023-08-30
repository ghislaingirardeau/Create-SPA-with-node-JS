//? IMPORT TOUTES LES VIEWS
import homeView from "./views/home.js";
import userView from "./views/user.js";
import usersView from "./views/users.js";
import contactView from "./views/contact.js";
import stateView from "./views/state.js";

//? METHODS RELATED TO A SPECIFIC VIEWS
import { mountHome } from "./methods/home.js";
import { mountUsers } from "./methods/users.js";
import { mountContact } from "./methods/contact.js";
import { mountUser } from "./methods/user.js";
import { mountState } from "./methods/state.js";

//* Nous permet de naviguer entre les routes sans charger la page
const navigateTo = (url) => {
  history.pushState(null, null, url);
  loadContent();
};

class Route {
  /**
   * @param {string} path - la route
   * @param {class} view - la class view importé
   * @param {string} layout - Envoie un layout specific
   * @param {function} callback - la methods importé after mount view
   * @param {function} params - parametre de la callback si besoin
   */
  constructor(path, view, layout, callback, params = null) {
    (this.path = path),
      (this.view = view),
      (this.layout = layout),
      (this.callback = callback),
      (this.params = params);
  }
  /**
   *
   * @returns {function} execute la callback avec le params
   */
  afterMount() {
    return this.callback(this.params);
  }
}

//* pour vérifier si une route match
const pathRoRegex = (path) =>
  new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const loadContent = async () => {
  const loadContent = document.getElementById("app");

  //* charges toutes les routes possibles
  const routes = [
    new Route("/", homeView, "homeHeader", mountHome),
    new Route("/contact", contactView, "contactHeader", mountContact),
    new Route("/state", stateView, "homeHeader", mountState),
    new Route("/users", usersView, "homeHeader", mountUsers, navigateTo),
    new Route("/user/:id", userView, "homeHeader", mountUser),
  ];

  //* Récupère la route si path = à la location.path
  let match = routes.find((route) =>
    location.pathname.match(pathRoRegex(route.path))
  );

  //* Si pas de match, envoie la route error et return
  if (!match) {
    //* IMPORT DYNAMIC ERROR FOR LAZY LOAD
    const { errorView } = await import("./views/error.js");
    const view = new errorView();
    loadContent.innerHTML = await view.getHtml();
    const { mountError } = await import("./methods/error.js");
    return mountError();
  }

  //* Si un match, charge la class dans une view puis injecte le HTML
  const view = new match.view();
  loadContent.innerHTML = await view.getHtml(match.layout);

  //* Une fois la vue chargé, lance le JS (méthods) spécific à cette vue
  match.afterMount();
};

//* For the back and forward arrow on window
window.addEventListener("popstate", loadContent);

//* listen to the document on load
document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    //* si l'élément correspond au selector data-link
    if (e.target.matches("a[data-link]")) {
      //! pour ne pas que la page se recharge durant la navigation
      e.preventDefault(); // empeche le chargement
      navigateTo(e.target.href); // utilise la fonction navigate
    }
  });
  // on load, load content depending on the route
  loadContent();
});
