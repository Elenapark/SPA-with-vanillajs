import { LOCATION_ORIGIN, routes } from "./constants/routingInfo.js";
import NotFound404 from "./pages/NotFound404.js";

export default function Router({ $target }) {
  this.$target = $target;

  this.findMatchedRoute = () => {
    const result = routes.find((route) => route.path.test(location.pathname));
    return result;
  };

  this.setEvent = () => {
    window.addEventListener("click", (e) => {
      const target = e.target.closest("a");
      if (!(target instanceof HTMLAnchorElement)) return;
      e.preventDefault();

      const targetURL = e.target.href.replace(LOCATION_ORIGIN, "");
      navigate(targetURL);
    });

    window.addEventListener("historyChange", ({ detail }) => {
      const { to, isReplace } = detail;

      if (isReplace || to === location.pathname) {
        history.replaceState(null, "", to);
      } else {
        history.pushState(
          {
            url: window.location.href,
          },
          "",
          to
        );
      }

      this.render();
    });

    window.addEventListener("popstate", () => {
      this.render();
    });
  };

  this.render = () => {
    const Component = this.findMatchedRoute()?.element || NotFound404;
    new Component({ $target: this.$target }).render();
  };

  this.setEvent();
}

/**
 * @param {string} to
 * @param {boolean} replace
 */
export const navigate = (to, isReplace = false) => {
  const historyChangeEvent = new CustomEvent("historyChange", {
    detail: {
      to,
      isReplace,
    },
  });

  window.dispatchEvent(historyChangeEvent);
};
