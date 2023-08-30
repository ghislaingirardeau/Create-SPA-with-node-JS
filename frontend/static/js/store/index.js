//? lance la fonction dés exection du script
(function (window) {
  const Store = {
    value: 0,
    user: {},
    increment() {
      this.value++;
    },
    decrement() {
      this.value--;
    },
    userConnected(user) {
      this.user = { ...user };
    },
  };
  window.Store = Store;
})(window);
