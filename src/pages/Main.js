import {
  getAllProducts,
  getProductsWithQuery,
} from "../../service/products_service.js";
import { SearchBar } from "../components/SeachBar.js";
import { Pagination, ProductList, Select } from "../components/index.js";
import { navigate } from "../router.js";

export default function Main({ $target }) {
  this.$container = document.createElement("div");
  this.$productList = document.createElement("div");

  this.state = {
    products: [],
    limit: 10,
    skip: 0,
    total: 0,
    page: 1,
    q: "",
  };

  this.template = function () {
    const { limit, skip, total, page, products, q } = this.state;
    return `
    <main>여기는 메인 제품 페이지
    <div>
      <ul>
        <li>limit : ${limit}</li>
        <li>skip : ${skip}</li>
        <li>total : ${total}</li>
        <li>page : ${page}</li>
        <li>q : ${q}</li>
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

  this.setState = function (newValue) {
    console.log("before:", this.state);
    this.state = {
      ...this.state,
      ...newValue,
    };

    this.render();
  };

  // handler
  this.goToDetail = (id) => {
    navigate(`/product/${id}`);
  };

  this.onChangeLimit = async function (selectedLimit) {
    const { q } = this.state;
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
    this.setState({ ...result, page: 1 });
  };

  this.onChangePage = async function (selectedPage) {
    const { limit, page, q } = this.state;
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

    this.setState({ ...result, page: Number(selectedPage), limit });
  };

  this.searchQuery = async function (q) {
    const { limit } = this.state;
    const result = await getProductsWithQuery({ q, limit, skip: 0 });

    this.setState({ ...result, limit, q });
  };

  this.refresh = async function () {
    const { limit } = this.state;

    const result = await getAllProducts({
      limit,
    });

    this.setState({ ...result, q: "" });
  };

  this.mount = async () => {
    const { limit, skip } = this.state;
    const result = await getAllProducts({
      limit,
      skip,
    });
    this.setState({ ...result });

    this.setEvent();
  };

  this.setEvent = () => {
    this.$container.addEventListener("submit", (e) => {
      e.preventDefault();
      const targetEl = e.target;
      const searchFormEl = targetEl.closest("form.form-search");

      if (searchFormEl) {
        const formData = new FormData(searchFormEl);
        const query = formData.get("query");
        this.searchQuery(query);
      }
    });
    this.$container.addEventListener("change", (e) => {
      const targetEl = e.target;
      const selectEl = targetEl.closest("select");

      if (selectEl) {
        const selectedLimit = targetEl.value;
        this.onChangeLimit(selectedLimit);
      }
    });

    this.$container.addEventListener("click", (e) => {
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

  this.render = function () {
    $target.innerHTML = "";
    this.$container.innerHTML = this.template();
    $target.appendChild(this.$container);
  };

  this.render();
  this.mount();
}
