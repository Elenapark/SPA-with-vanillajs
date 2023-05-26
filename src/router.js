import { routes } from "./constants/routingInfo.js";
import NotFound404 from "./pages/NotFound404.js";

export default function Router({ $target }) {
  this.$target = $target;

  const findMatchedRoute = () => {
    const result = routes.find((route) => route.path.test(location.pathname));
    return result;
  };

  const displayMatchedRoute = () => {
    const Component = findMatchedRoute()?.element || NotFound404;
    new Component({ $target: this.$target });
  };

  const init = () => {
    window.addEventListener("historyChange", ({ detail }) => {
      const { to, isReplace } = detail;

      if (isReplace || to === location.pathname) {
        history.replaceState(null, "", to);
      } else {
        history.pushState(null, "", to);
      }

      displayMatchedRoute();
    });

    window.addEventListener("popstate", () => {
      displayMatchedRoute();
    });
  };

  init();
  displayMatchedRoute();
}
