export const mountError = () => {
  let main = document.querySelector("main");
  main.innerHTML = `
        <h2>PAGE NOT FOUND</h2>
        <div id="customContent">

        </div>
        <a href="/" data-link>Back Home</a>
    `;

  let content = main.querySelector("#customContent");
  content.innerHTML = `
        <h3>Example to create a layout</h3>
    `;
};
