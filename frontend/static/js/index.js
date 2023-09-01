//? IMPORT TOUTES LES VIEWS
import homeView from "./views/home.js";
import userView from "./views/user.js";
import usersView from "./views/users.js";
import contactView from "./views/contact.js";
import stateView from "./views/state.js";

//? IMPORT ROUTE CLASS
import routeClass from "./routes/route.js";

//* Nous permet de naviguer entre les routes sans charger la page
const navigateTo = (url) => {
  history.pushState(null, null, url);
  loadContent();
};

//* pour vérifier si une route match
const pathRoRegex = (path) =>
  new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const loadContent = async () => {
  const loadContent = document.getElementById("app");

  //* charges toutes les routes possibles
  const routes = [
    new routeClass("/", homeView, "homeHeader"),
    new routeClass("/contact", contactView, "contactHeader"),
    new routeClass("/state", stateView, "homeHeader"),
    new routeClass("/users", usersView, "homeHeader", navigateTo),
    new routeClass("/user/:id", userView, "homeHeader"),
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
    loadContent.innerHTML = await view.mountView();
    await view.afterViewMount();
    return;
  }

  //* Si un match, créer une nouvelle instance de la view correspondante puis mount html
  const view = new match.view();
  loadContent.innerHTML = await view.mountView(match.layout);
  //* Une fois la vue chargé, lance le JS (méthods) spécific à cette vue: fetch, event, dynamic content...
  await view.afterViewMount(match.params);
};

//* For the back and forward arrow on window
window.addEventListener("popstate", loadContent);

//* listen to the document on load
document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    e.preventDefault(); // empeche le chargement
    //* si l'élément correspond au selector data-link
    if (e.target.matches("a[data-link]")) {
      //! pour ne pas que la page se recharge durant la navigation

      navigateTo(e.target.href); // utilise la fonction navigate
    } else if (e.target.matches("a[data-link-go-back]")) {
      console.log(e.target);
      history.back();
    }
  });
  // on load, load content depending on the route
  loadContent();
});
