import { Product } from "./Product.js";

export function ProductList({ products }) {
  return `
  <ul class="product-container card">
    ${products
      .map((product) => {
        return Product({ product });
      })
      .join("")}
  </ul>
  `;
}
