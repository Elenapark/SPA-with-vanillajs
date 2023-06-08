import { AppHeader } from "../components/AppHeader.js";
import { CartList } from "../components/CartList.js";
import { store } from "../store/module.js";
import { getCartsState } from "../store/selector.js";
import { setCartStorage } from "../utils/localstorage.js";

export default function Cart({ $target }) {
  this.$target = $target;

  this.deleteCart = (id) => {
    const carts = store.getState(getCartsState);
    const newCarts = { ...carts };
    delete newCarts[id];

    setCartStorage(newCarts);
    store.dispatch({ carts: newCarts });
  };

  this.setup = () => {
    store.subscribe("cart", () => {
      if (window.location.pathname === "/cart") {
        this.render();
      }
    });
  };

  this.template = () => {
    const carts = store.getState(getCartsState);

    return `
    <div id="carts" >
      <div id="header"></div>
      ${CartList({ carts })}
    </div>
    `;
  };

  this.mount = () => {
    const $container = this.$target.querySelector("#carts");
    const $header = this.$target.querySelector("#header");

    new AppHeader({ $target: $header, title: "카트" });
    this.setEvent($container);
  };

  this.setEvent = ($container) => {
    $container.addEventListener("click", (e) => {
      const targetEl = e.target;
      const btnDeleteEl = targetEl.closest(".btn-delete");

      if (btnDeleteEl) {
        const { id } = btnDeleteEl.dataset;

        this.deleteCart(id);
      }
    });
  };

  this.render = () => {
    this.$target.innerHTML = this.template();
    this.mount();
  };

  this.setup();
}
