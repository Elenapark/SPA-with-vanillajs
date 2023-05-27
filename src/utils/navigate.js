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

  dispatchEvent(historyChangeEvent);
};
