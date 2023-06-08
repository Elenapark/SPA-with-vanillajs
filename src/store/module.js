import { getCartStorage } from "../utils/localstorage.js";
import { Store } from "../utils/store.js";

export const store = new Store({
  main: {
    products: [],
    limit: 10,
    skip: 0,
    total: 0,
    page: 1,
    q: "",
  },
  carts: getCartStorage() ?? {},
});
