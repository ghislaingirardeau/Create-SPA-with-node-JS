export const loginUser = (navigateTo) => {
  let form = document.querySelector("#submitForm");
  if (form) {
    const button = form.querySelector("[type='button']");
    button.addEventListener("click", () => {
      const email = form.querySelector("[type='email']");
      let user = JSON.parse(sessionStorage.getItem("users")).find(
        (user) => user.email == email.value
      );
      if (user) {
        navigateTo(`${location.origin}/user/${user.id}`);
      } else {
        document.querySelector("#loginErrorMessage").innerHTML =
          "This email is not correct";
      }
    });
    form.querySelector("[type='email']").addEventListener("keyup", (e) => {
      console.log(e.target.value);
      document.querySelector("#loginEmailModel").innerHTML = e.target.value;
    });
  }
};
