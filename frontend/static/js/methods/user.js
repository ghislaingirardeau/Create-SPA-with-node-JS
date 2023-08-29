export const mountUser = async () => {
  console.log("mount User view");

  const regex = /^\/user\/(.+)$/;
  const params = location.pathname.match(regex)[1];
  const cardElement = document.querySelector(".userCard");
  const p = createHtmlElement(cardElement, "span");

  const div = createHtmlElement(cardElement, "div");
  p.classList.add("loader");
  div.classList.add("card-content");
  const animLoader = animeElementP(p);

  setTimeout(async () => {
    const rawDatas = await fetch(
      `https://jsonplaceholder.typicode.com/users/${params}`
    );
    const user = await rawDatas.json();
    if (Object.values(user).length > 0) {
      animeElementDiv(div);
      div.innerHTML = `<h3>${user.name}</h3><p>Name ${user.username}</p><p>Email: ${user.email}</p>`;
      /* animLoader.pause(); */
      cardElement.removeChild(p);
    } else {
      const pError = createHtmlElement(cardElement, "p");
      pError.innerHTML = `Url incorrect`;
    }
  }, 3000);
};

const createHtmlElement = (cardElement, tag) => {
  const element = document.createElement(tag);
  cardElement.appendChild(element);
  return element;
};

const animeElementP = (element) => {
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
