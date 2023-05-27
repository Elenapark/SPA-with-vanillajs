import Router from "./router.js";
import { store } from "./store/module.js";

export default function App({ $target }) {
  this.$target = $target;
  const router = new Router({ $target: this.$target });

  this.render = function () {
    router.render();
  };
}
