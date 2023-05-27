import { navigate } from "../router.js";

export function AppHeader({ title, $target, isBack = true }) {
  this.$target = $target;
  this.canBack = () => {
    const url = new URL(window.location.href);
    const historyURL = history.state?.url && new URL(history.state.url);

    return url.origin === historyURL?.origin;
  };

  this.template = () => {
    return `
    <header>
      ${
        this.canBack() && isBack ? `<button class="btn-back">뒤로</button>` : ""
      }
      ${title}
    </header>
    `;
  };

  this.mount = () => {
    const $container = $target.querySelector("header");
    this.setEevent($container);
  };

  this.setEevent = ($container) => {
    $container.addEventListener("click", (e) => {
      const targetEl = e.target;
      const btnBackEl = targetEl.closest("button.btn-back");

      if (btnBackEl) {
        this.canBack() && window.history.back();
      }
    });
  };

  this.render = () => {
    $target.innerHTML = this.template();
    this.mount();
  };

  this.render();
}
