import { navigate } from "../router.js";

export function Product({ product }) {
  const { title, id, thumbnail, price } = product;

  return `
    <li class="product" data-id=${id}>
      <img class="product-img" src="${thumbnail}" alt="${title}" />
      <h5>${title}</h5>
      <p>$${price}</p>
    </li>
  `;
}
