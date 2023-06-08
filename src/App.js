import Router from "./router.js";

export default function App({ $target }) {
  this.$target = $target;
  const router = new Router({ $target: this.$target });

  this.render = function () {
    router.render();
  };
}
