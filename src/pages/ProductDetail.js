import { getSingleProduct } from "../service/products_service.js";
import { AppHeader } from "../components/AppHeader.js";
import { ProductDetailCard } from "../components/ProductDetailCard.js";
import { store } from "../store/module.js";
import { getCartsState } from "../store/selector.js";
import { setCartStorage } from "../utils/localstorage.js";

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
      <div id="header"></div>
        로딩중
      </div>
      `;
    }

    if (error) {
      return `
        <div id="product">
        <div id="header"></div>
          에러발생
        </div>
      `;
    }

    if (!product) {
      return `
        <div id="product">
        <div id="header"></div>
          제품이 없어요
        </div>
      `;
    }

    const { id, stock } = product;

    const carts = store.getState(getCartsState);
    const currentItem = carts[id];

    return `
    <main id="product">
      <div id="header"></div>
      <div class="card">
        ${ProductDetailCard({ product })}

        <form class="form-save">
          ${
            currentItem
              ? `<p>${currentItem.quantity} 개가 장바구니에 이미 담겨있어요!</p>`
              : ``
          }
          <div>
            <input min="1" max="${stock}" type="number" name="quantity" />
            <button class="btn-save" type="submit" >
              장바구니 담기!
            </button>
          </div>
        </form>
      </div> 
    </main>
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

    setCartStorage(newCarts);
    store.dispatch({
      carts: newCarts,
    });
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
    const $header = this.$target.querySelector("#header");

    new AppHeader({ $target: $header, title: "제품상세" });
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
