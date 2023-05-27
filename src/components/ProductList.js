import { Product } from "./Product.js";

export function ProductList({ products }) {
  return `
  <ul class="product-container">
    ${products
      .map((product) => {
        return Product({ product });
      })
      .join("")}
  </ul>
  `;
}
