import homeView from "./views/home.js";
import userView from "./views/user.js";
import usersView from "./views/users.js";
import errorView from "./views/error.js";
import contactView from "./views/contact.js";
import stateView from "./views/state.js";

//? METHODS FOR EACH VIEWS ON MOUNT & AFTER
import { mountHome } from "./methods/home.js";
import { mountUsers } from "./methods/users.js";
import { mountContact } from "./methods/contact.js";
import { mountUser } from "./methods/user.js";
import { mountState } from "./methods/state.js";
import { mountError } from "./methods/error.js";

const navigateTo = (url) => {
  history.pushState(null, null, url);
  loadContent();
};

class Route {
  constructor(path, view, layout, callback) {
    (this.path = path),
      (this.view = view),
      (this.layout = layout), //! Envoie un layout specific
      (this.callback = callback);
  }
  afterMount(params = navigateTo) {
    return this.callback(params);
  }
}

const pathRoRegex = (path) =>
  new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const loadContent = async () => {
  const loadContent = document.getElementById("app");
  const routes = [
    new Route("/", homeView, "homeHeader", mountHome),
    new Route("/contact", contactView, "contactHeader", mountContact),
    new Route("/state", stateView, "homeHeader", mountState),
    new Route("/users", usersView, "homeHeader", mountUsers),
    new Route("/user/:id", userView, "homeHeader", mountUser),
  ];
  console.log(routes);
  let match = routes.find((route) =>
    location.pathname.match(pathRoRegex(route.path))
  );
  if (!match) {
    const view = new errorView();
    loadContent.innerHTML = await view.getHtml();
    return mountError();
  }
  const view = new match.view();
  loadContent.innerHTML = await view.getHtml(match.layout);

  match.afterMount();
};

//* For the back and forward arrow on window
window.addEventListener("popstate", loadContent);

//* listen to the document on load
document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    // si l'élément correspond au selector data-link
    if (e.target.matches("[data-link]")) {
      //! pour ne pas que la page se recharge durant la navigation
      e.preventDefault(); // empeche le chargement
      navigateTo(e.target.href); // utilise la fonction navigate
    }
  });
  // on load, load content depending on the route
  loadContent();
});
