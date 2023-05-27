export function ProductDetailCard({ product }) {
  const {
    title,
    thumbnail,
    brand,
    category,
    price,
    stock,
    description,
    discountPercentage,
  } = product;

  return `
  <div class="product-detail">
    <div class="left">
    <img class="product-img large" src="${thumbnail}" alt="${title}" />
    </div>
    
    <div class="right">
      <dl>
        <div>
          <dt>title</dt>
          <dd>${title}</dd>
        </div>
        <div>
          <dt>brand</dt>
          <dd>${brand}</dd>
        </div>
        <div>
          <dt>category</dt>
          <dd>${category}</dd>
        </div>
        <div>
          <dt>price</dt>
          <dd>$${price}</dd>
        </div>
        <div>
          <dt>stock</dt>
          <dd>${stock}</dd>
        </div>
        <div>
          <dt>description</dt>
          <dd>${description}</dd>
        </div>
        <div>
          <dt>discountPercentage</dt>
          <dd>${discountPercentage}</dd>
        </div>
      </dl>
    </div>
  </div>
  `;
}
