import { Product } from "./Product.js";

export function ProductList({ products }) {
  return products
    .map((product) => {
      return Product({ product });
    })
    .join("");
}
