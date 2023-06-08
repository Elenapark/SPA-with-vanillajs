import {
  getAllProducts,
  getProductsWithQuery,
} from "../service/products_service.js";
import { SearchBar } from "../components/SeachBar.js";
import {
  Pagination,
  ProductList,
  Select,
  AppHeader,
} from "../components/index.js";
import { navigate } from "../router.js";
import { store } from "../store/module.js";
import { getMainState } from "../store/selector.js";

export default function Main({ $target }) {
  this.$target = $target;
  this.isFirstInit = false;

  this.template = function () {
    const { limit, skip, total, page, products, q } =
      store.getState(getMainState);

    return `
    <main id="main">
      <div id="header"></div>
    
      <div class="controller">
        ${Select({
          options: [
            { value: 10, label: "10개" },
            { value: 20, label: "20개" },
            { value: 30, label: "30개" },
          ],
          selectedValue: limit,
        })}
        ${SearchBar({ q, total })}
      </div>

      ${ProductList({ products })}
      ${Pagination({ total, limit, currentPage: page })}

    </main>
    `;
  };

  this.setup = () => {
    store.subscribe("/", () => {
      if (window.location.pathname === "/") {
        this.render();
      }
    });
  };

  // handler
  this.goToDetail = (id) => {
    navigate(`/product/${id}`);
  };

  this.fetchProduct = async ({ q, limit, skip }) => {
    try {
      let result;
      if (q) {
        result = await getProductsWithQuery({
          limit,
          skip,
          q,
        });
      } else {
        result = await getAllProducts({
          limit,
          skip,
        });
      }

      return result;
    } catch (error) {
      alert("에러발생");
    }
  };

  this.onChangeLimit = async (selectedLimit) => {
    const { q } = store.getState(getMainState);
    const result = await this.fetchProduct({
      q,
      limit: selectedLimit,
      skip: 0,
    });

    const main = store.getState(getMainState);
    store.dispatch({ main: { ...main, ...result, page: 1 } });
  };

  this.onChangePage = async (selectedPage) => {
    const { limit, page, q } = store.getState(getMainState);
    if (Number(selectedPage) === Number(page)) return;

    const result = await this.fetchProduct({
      q,
      skip: limit * (selectedPage - 1),
      limit,
    });

    const main = store.getState(getMainState);
    store.dispatch({
      main: { ...main, ...result, page: Number(selectedPage), limit },
    });
  };

  this.searchQuery = async (q) => {
    try {
      const { limit } = store.getState(getMainState);
      const result = await getProductsWithQuery({ q, limit, skip: 0 });
      const main = store.getState(getMainState);
      store.dispatch({ main: { ...main, ...result, limit, q, page: 1 } });
    } catch (error) {
      alert("에러발생");
    }
  };

  this.refresh = async () => {
    const { limit } = store.getState(getMainState);

    const result = await getAllProducts({
      limit,
    });
    const main = store.getState(getMainState);
    store.dispatch({ main: { ...main, ...result, q: "" } });
  };

  this.mount = () => {
    const $contianer = this.$target.querySelector("#main");
    const $header = this.$target.querySelector("#header");

    new AppHeader({ $target: $header, title: "제품정보", isBack: false });
    this.setEvent($contianer);
  };

  this.setEvent = ($container) => {
    $container.addEventListener("submit", (e) => {
      e.preventDefault();
      const targetEl = e.target;
      const searchFormEl = targetEl.closest("form.form-search");

      if (searchFormEl) {
        const formData = new FormData(searchFormEl);
        const query = formData.get("query");
        this.searchQuery(query);
      }
    });

    $container.addEventListener("change", (e) => {
      const targetEl = e.target;
      const selectEl = targetEl.closest("select");

      if (selectEl) {
        const selectedLimit = targetEl.value;
        this.onChangeLimit(selectedLimit);
      }
    });

    $container.addEventListener("click", (e) => {
      const targetEl = e.target;
      const pageButton = targetEl.closest(".btn-page");
      const productEl = targetEl.closest(".product");
      const refreshEl = targetEl.closest(".btn-delete");

      if (productEl) {
        const { id } = productEl.dataset;
        this.goToDetail(id);
      }

      if (pageButton) {
        const { page } = pageButton.dataset;
        this.onChangePage(page);
      }

      if (refreshEl) {
        this.refresh();
      }
    });
  };

  this.initFetch = async () => {
    try {
      const { limit, skip, products } = store.getState(getMainState);
      if (products.length !== 0) return;

      const result = await getAllProducts({
        limit,
        skip,
      });

      const main = store.getState(getMainState);
      store.dispatch({ main: { ...main, ...result, page: 1 } });
    } catch (error) {
      alert("에러발생");
    }
  };

  this.render = () => {
    this.$target.innerHTML = this.template();
    this.mount();
  };

  this.setup();
  this.initFetch();
}
