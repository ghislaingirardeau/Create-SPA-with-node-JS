(function (window) {
  const Store = {
    value: 0,
    increment() {
      this.value++;
    },
    decrement() {
      this.value--;
    },
  };
  window.Store = Store;
})(window);