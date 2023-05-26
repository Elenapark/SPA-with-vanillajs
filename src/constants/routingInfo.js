export const LOCATION_ORIGIN = location.origin;
import Main from "../pages/Main.js";
import ProductDetail from "../pages/ProductDetail.js";
import Cart from "../pages/Cart.js";

export const routes = [
  { path: /^\/$/, element: Main },
  { path: /^\/product\/[\w]+$/, element: ProductDetail },
  { path: /^\/cart$/, element: Cart },
];
