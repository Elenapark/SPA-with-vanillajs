import { navigate } from "../router.js";

export function Product({ product }) {
  const { title } = product;

  return `
    <li class="product" data-id="1">${title}</li>
  `;
}
