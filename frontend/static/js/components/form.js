export const useForm = class Form {
  constructor(element, array) {
    this.element = document.querySelector(element);
    this.array = array;
  }
  render() {
    this.element.innerHTML = `
    <form class="form-example" id="BookPackageForm">
    <label for="name">${this.array[0]}: </label>
    <input type="text" name="name" id="name" />
    <label for="email">${this.array[1]}: </label>
    <input type="email" name="name" id="email" />
    <input type="submit" value="Subscribe!" />
</form>
    `;
  }
  submit() {
    document.querySelector("input[type='submit']").onclick = (e) => {
      e.preventDefault();
      let formEl = document.forms.BookPackageForm;
      let data = new FormData(formEl);
      console.log(data.getAll("name"));
    };
  }
};
