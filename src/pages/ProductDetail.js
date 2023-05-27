import { getSingleProduct } from "../../service/products_service.js";
import { CartStatus } from "../components/CartStatus.js";
import { store } from "../store/module.js";
import { getCartsState } from "../store/selector.js";

export default function ProductDetail({ $target }) {
  this.$target = $target;

  this.state = {
    loading: false,
    product: null,
    error: false,
  };

  this.setup = () => {
    store.subscribe("product", () => {
      if (/^\/product\/[\w]+$/.test(location.pathname)) {
        this.render();
      }
    });
  };

  this.template = function () {
    const { loading, product, error } = this.state;

    if (loading) {
      return `
      <div id="product">
        로딩중
      </div>
      `;
    }

    if (error) {
      return `
        <div id="product">
          에러발생
        </div>
      `;
    }

    if (!product) {
      return `
        <div id="product">
          제품이 없어요
        </div>
      `;
    }

    const {
      id,
      title,
      thumbnail,
      brand,
      category,
      price,
      stock,
      description,
      discountPercentage,
    } = product;

    const carts = store.getState(getCartsState);
    const currentItem = carts[id];

    return `
    <div id="product">디떼일
      <div>
        Cart : ${CartStatus()}
      </div>
      <main style="display:flex">
        <div>
          <img src="${thumbnail}" alt="${title}" />
        </div>
        <ul>
          <li>
            <div>title</div>
            <div>${title}</div>
          </li>
          <li>
            <div>brand</div>
            <div>${brand}</div>
          </li>
          <li>
            <div>category</div>
            <div>${category}</div>
          </li>
          <li>
            <div>price</div>
            <div>$${price}</div>
          </li>
          <li>
            <div>stock</div>
            <div>${stock}</div>
          </li>
          <li>
            <div>description</div>
            <div>${description}</div>
          </li>
          <li>
            <div>discountPercentage</div>
            <div>${discountPercentage}</div>
          </li>
        </ul>
      </main> 
      <form class="form-save">
        ${
          currentItem
            ? `<p>${currentItem.quantity} 개가 장바구니에 이미 담겨있어요!</p>`
            : ``
        }
        <input min="1" max="${stock}" type="number" name="quantity" />
        <button class="btn-save" type="submit" >
          장바구니 담기!
        </button>
      </form>
    </div>
      `;
  };

  this.setState = function (newValue) {
    this.state = {
      ...this.state,
      ...newValue,
    };

    this.render();
  };

  this.addCart = (product, quantity) => {
    if (!product || quantity <= 0) return;

    const { stock } = product;
    const carts = store.getState(getCartsState);
    const id = product.id;
    const prevQuantity = carts[id]?.quantity ?? 0;
    const totalQuantity = prevQuantity + quantity;

    if (totalQuantity > stock) {
      alert("재고 보다 장바구니의 담은량이 더 큽니다");
      return;
    }

    const newCarts = {
      ...carts,
      [id]: { ...product, quantity: totalQuantity },
    };

    store.dispatch({
      carts: newCarts,
    });
    localStorage.setItem("carts", JSON.stringify(newCarts));
  };

  this.initFetch = async () => {
    try {
      this.setState({ loading: true });
      const productId = location.pathname.split("/").pop();
      const result = await getSingleProduct(productId);
      this.setState({ product: { ...result } });
    } catch (error) {
      this.setState({ error: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  this.mount = () => {
    const $container = this.$target.querySelector("#product");
    this.setEvent($container);
  };

  this.setEvent = ($container) => {
    $container.addEventListener("submit", (e) => {
      e.preventDefault();

      const targetEl = e.target;
      const saveFormEl = targetEl.closest("form.form-save");

      if (saveFormEl) {
        const formData = new FormData(saveFormEl);
        const quantity = Number(formData.get("quantity"));
        const product = this.state.product;

        this.addCart(product, quantity);
      }
    });
  };

  this.render = () => {
    this.$target.innerHTML = this.template();
    this.mount();
  };

  this.initFetch();
  this.setup();
}
