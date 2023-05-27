import { navigate } from "../router.js";

export function Product({ product }) {
  const { title, id } = product;

  return `
    <li class="product" data-id=${id}>${title}</li>
  `;
}
