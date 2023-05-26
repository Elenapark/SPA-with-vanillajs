/**
 * @param {string} to
 * @param {boolean} replace
 */
export const navigate = (to, isReplace = false) => {
  console.log(to, isReplace);
  const historyChangeEvent = new CustomEvent("historyChange", {
    detail: {
      to,
      isReplace,
    },
  });

  dispatchEvent(historyChangeEvent);
};
