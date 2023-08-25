import aboutView from "./views/about.js";
import homeView from "./views/home.js";
import contactView from "./views/contact.js";
import userView from "./views/userView.js";

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
    },
    {
      path: "/about",
      view: aboutView,
    },
    {
      path: "/about/:id",
      view: userView,
    },
    {
      path: "/contact",
      view: contactView,
    },
  ];
  let match = routes.find((route) =>
    location.pathname.match(pathRoRegex(route.path))
  );
  if (!match) {
    return (loadContent.innerHTML = "<h2>Page Not Found</h2>");
  }
  const view = new match.view();
  loadContent.innerHTML = await view.getHtml();
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
