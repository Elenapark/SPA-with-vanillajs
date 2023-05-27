export function CartList({ carts }) {
  const cartsCount = Object.values(carts)?.length;

  if (!cartsCount || cartsCount <= 0) {
    return `
    <div>
      카트에 제품이 없습니다
    </div>
    `;
  }

  return `
  <ul class="cart-list">
    ${Object.values(carts)
      ?.map((product) => {
        const { id, title, thumbnail, quantity } = product;
        return `
        <div class="cart-item">
          <div>
            <img class="product-img" src="${thumbnail}" alt="${title}" />
          </div>
  
          <div>
            <div class="product-desc" style="display:flex;">
              <p>${title}</p>
              <div>
                <input readonly value="${quantity}" />
                <button data-id="${id}" class="btn-delete">삭제</button>
              </div>
            </div>
          </div>
        </div>
      `;
      })
      .join("")}
  </ul>
  `;
}
