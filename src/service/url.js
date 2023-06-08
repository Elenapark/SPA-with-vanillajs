export const BASE_URL = "https://dummyjson.com";

export const GET_PRODUCTS_URL = ({ limit, skip }) => {
  const searchParams = new URLSearchParams();
  searchParams.append("limit", limit);
  searchParams.append("skip", skip);

  return `${BASE_URL}/products?${searchParams.toString()}`;
};

export const SEARCH_PRODUCTS_URL = ({ q, limit, skip }) => {
  const searchParams = new URLSearchParams();
  searchParams.append("q", q);
  searchParams.append("limit", limit);
  searchParams.append("skip", skip);

  return `${BASE_URL}/products/search?${searchParams.toString()}`;
};

export const GET_PRODUCT_DETAIL_URL = ({ productId }) => {
  return `${BASE_URL}/products/${productId}`;
};
