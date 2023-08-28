import homeView from "./views/home.js";
import userView from "./views/user.js";
import usersView from "./views/users.js";
import errorView from "./views/error.js";
import contactView from "./views/contact.js";

//? METHODS FOR EACH VIEWS ON MOUNT & AFTER
import { loginUser } from "./methods/usersLogin.js";
import { changeData } from "./methods/contactInteractions.js";

const navigateTo = (url) => {
  history.pushState(null, null, url);
  loadContent();
};

const pathRoRegex = (path) =>
  new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const loadContent = async () => {
  const loadContent = document.getElementById("app");
  const routes = [
    {
      path: "/",
      view: homeView,
      layout: "homeHeader", //! Envoie un layout speific
      onMount: () => console.log("On mount home"),
    },
    {
      path: "/contact",
      view: contactView,
      layout: "contactHeader", //! Envoie un layout speific
      onMount: () => changeData(),
    },
    {
      path: "/users",
      view: usersView,
      layout: "homeHeader",
      onMount: () => loginUser(navigateTo),
    },
    {
      path: "/user/:id",
      view: userView,
      layout: "homeHeader",
      onMount: () => console.log("On mount user"),
    },
  ];
  let match = routes.find((route) =>
    location.pathname.match(pathRoRegex(route.path))
  );
  if (!match) {
    const view = new errorView();
    return (loadContent.innerHTML = await view.getHtml());
  }
  const view = new match.view();
  loadContent.innerHTML = await view.getHtml(match.layout);

  match.onMount();
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
