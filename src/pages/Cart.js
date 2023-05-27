import { CartList } from "../components/CartList.js";
import { store } from "../store/module.js";
import { getCartsState } from "../store/selector.js";

export default function Cart({ $target }) {
  this.$target = $target;

  this.deleteCart = (id) => {
    const carts = store.getState(getCartsState);
    const newCarts = { ...carts };
    delete newCarts[id];

    localStorage.setItem("carts", JSON.stringify(newCarts));
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
      ${CartList({ carts })}
    </div>
    `;
  };

  this.mount = () => {
    const $container = this.$target.querySelector("#carts");
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
