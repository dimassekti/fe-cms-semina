import store from "./store";

let currentAuth;

function listener() {
  let previousAuth = currentAuth;

  currentAuth = store.getState().auth;
}
