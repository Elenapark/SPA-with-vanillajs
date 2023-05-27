import {
  getAllProducts,
  getProductsWithQuery,
} from "../../service/products_service.js";
import { SearchBar } from "../components/SeachBar.js";
import {
  Pagination,
  ProductList,
  Select,
  CartStatus,
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
    여기는 메인 제품 페이지
    <div>
      <ul>
        <li>limit : ${limit}</li>
        <li>skip : ${skip}</li>
        <li>total : ${total}</li>
        <li>page : ${page}</li>
        <li>q : ${q}</li>
        <li>${CartStatus()}</li>
      </ul>
    </div>

    ${SearchBar({ q, total })}

    ${Select({
      options: [{ value: 10 }, { value: 20 }, { value: 30 }],
      selectedValue: limit,
    })}

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

  this.onChangeLimit = async function (selectedLimit) {
    const { q } = store.getState(getMainState);
    let result;

    if (q) {
      result = await getProductsWithQuery({
        limit: selectedLimit,
        skip: 0,
        q,
      });
    } else {
      result = await getAllProducts({
        limit: selectedLimit,
        skip: 0,
      });
    }
    const main = store.getState(getMainState);
    store.dispatch({ main: { ...main, ...result, page: 1 } });
  };

  this.onChangePage = async function (selectedPage) {
    const { limit, page, q } = store.getState(getMainState);
    if (Number(selectedPage) === Number(page)) return;

    let result;

    if (q) {
      result = await getProductsWithQuery({
        limit,
        skip: limit * (selectedPage - 1),
        q,
      });
    } else {
      result = await getAllProducts({
        limit,
        skip: limit * (selectedPage - 1),
      });
    }

    const main = store.getState(getMainState);
    store.dispatch({
      main: { ...main, ...result, page: Number(selectedPage), limit },
    });
  };

  this.searchQuery = async function (q) {
    const { limit } = store.getState(getMainState);
    const result = await getProductsWithQuery({ q, limit, skip: 0 });

    const main = store.getState(getMainState);
    store.dispatch({ main: { ...main, ...result, limit, q, page: 1 } });
  };

  this.refresh = async function () {
    const { limit } = store.getState(getMainState);

    const result = await getAllProducts({
      limit,
    });
    const main = store.getState(getMainState);
    store.dispatch({ main: { ...main, ...result, q: "" } });
  };

  this.mount = () => {
    const $contianer = this.$target.querySelector("#main");
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
        const { id } = targetEl.dataset;
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
    const { limit, skip } = store.getState(getMainState);
    const result = await getAllProducts({
      limit,
      skip,
    });

    const main = store.getState(getMainState);
    store.dispatch({ main: { ...main, ...result, page: 1 } });
  };

  this.render = () => {
    this.$target.innerHTML = this.template();
    this.mount();
  };

  this.setup();
  this.initFetch();
}