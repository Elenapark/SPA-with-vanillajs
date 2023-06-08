import { requester } from "./requester.js";
import {
  GET_PRODUCTS_URL,
  GET_PRODUCT_DETAIL_URL,
  SEARCH_PRODUCTS_URL,
} from "./url.js";

export const getAllProducts = async ({ limit = 10, skip = 0 }) =>
  requester(GET_PRODUCTS_URL({ limit, skip }));

export const getProductsWithQuery = async ({ q, limit = 10, skip = 0 }) =>
  requester(SEARCH_PRODUCTS_URL({ q, limit, skip }));

export const getSingleProduct = async (productId) =>
  requester(GET_PRODUCT_DETAIL_URL({ productId }));
