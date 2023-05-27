import { navigate } from "../router.js";
import { store } from "../store/module.js";
import { getCartsState } from "../store/selector.js";

export function CartStatus({ $target }) {
  this.$target = $target;

  this.mount = () => {
    const $container = document.querySelector(".btn-cart");
    this.setEvent($container);
  };

  this.setEvent = ($container) => {
    $container.addEventListener("click", (e) => {
      const targetEl = e.target;
      const cartEl = targetEl.closest(".btn-cart");

      if (cartEl) {
        navigate("/cart");
      }
    });
  };

  this.template = () => {
    const carts = store.getState(getCartsState);
    const categoryLength = Object.keys(carts).length;

    return `
    <div class="btn-cart">
      카트(${categoryLength})
    </div>
    `;
  };

  this.render = () => {
    this.$target.innerHTML = this.template();
    this.mount();
  };

  this.render();
}
