const CART_STORAGE_KEY = "CARTS";

const setStorage = (key) => (value) =>
  localStorage.setItem(key, JSON.stringify(value));

const getStorage = (key, defaultValue) => {
  try {
    const value = localStorage.getItem(key);
    return JSON.parse(value);
  } catch (error) {
    console.error("Invalid stoage value");
    return defaultValue || null;
  }
};

export const setCartStorage = setStorage(CART_STORAGE_KEY);
export const getCartStorage = () => getStorage(CART_STORAGE_KEY, {});
