import { store } from "../store/module.js";
import { getCartsState } from "../store/selector.js";

export function CartStatus() {
  const carts = store.getState(getCartsState);
  const categoryLength = Object.keys(carts).length;
  return `
  <div>
    ${categoryLength}
  </div>
  `;
}
