import { LOCATION_ORIGIN } from "./constants/routingInfo.js";
import Router from "./router.js";
import { navigate } from "./utils/navigate.js";

export default function App({ $target }) {
  this.$target = $target;

  const init = () => {
    document.addEventListener("click", (e) => {
      const target = e.target.closest("a");
      if (!(target instanceof HTMLAnchorElement)) return;

      e.preventDefault();
      const targetURL = e.target.href.replace(LOCATION_ORIGIN, "");
      navigate(targetURL);
    });
    new Router({ $target: this.$target });
  };

  init();
}
