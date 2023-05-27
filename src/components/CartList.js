export function CartList({ carts }) {
  const cartsCount = Object.values(carts)?.length;

  if (!cartsCount || cartsCount <= 0) {
    return `
    <div>
      카트에 제품이 없습니다
    </div>
    `;
  }

  return Object.values(carts)
    ?.map((product) => {
      const { id, title, thumbnail, quantity } = product;
      return `
      <div class="cart__container" style="display:flex;">
        <div>
          <img src="${thumbnail}" alt="${title}" />
        </div>

        <div>
          <div style="display:flex;">
          <p>${title}</p>
          <input readonly value="${quantity}" />
          <button data-id="${id}" class="btn-delete">삭제</button>
        </div>
      </div>
    `;
    })
    .join("");
}
