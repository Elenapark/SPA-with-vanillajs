export class Store {
  #state;
  #observers = new Map();

  constructor(initialState) {
    this.#state = initialState;
  }

  getState = (cb) => {
    if (cb) {
      return cb(this.#state);
    }
    return this.#state;
  };

  dispatch = (state) => {
    this.#state = { ...this.#state, ...state };
    this.notify();
  };

  subscribe = (key, fn) => {
    this.#observers.set(key, fn);
    return () => {
      this.#observers.delete(key);
    };
  };

  notify = () => {
    for (const [key, fn] of this.#observers.entries()) {
      if (typeof fn === "function") {
        fn();
      }
    }
  };
}
