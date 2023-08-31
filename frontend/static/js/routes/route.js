export const routeClass = class Route {
  /**
   * @param {string} path - la route
   * @param {class} view - la class view importé
   * @param {string} layout - Envoie un layout specific
   * @param {function} params - parametre de la callback si besoin
   */
  constructor(path, view, layout, params = null) {
    (this.path = path),
      (this.view = view),
      (this.layout = layout),
      (this.params = params);
  }
};
