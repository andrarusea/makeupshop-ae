const INITIAL_STATE = {
  cart: {},
  error: null,
  fetching: false,
  fetched: false,
};

export default function (state = INITIAL_STATE, action) {
  console.log("reducer");
  switch (action.type) {
    case "GET_CART_PENDING":
      return { ...state, error: null, fetching: true, fetched: false };
    case "GET_CART_FULFILLED":
      return { ...state, cart: action.payload, fetching: false, fetched: true };
    case "GET_CART_REJECTED":
      return {
        ...state,
        error: action.payload,
        fetching: false,
        fetched: false,
      };
    default:
      return state;
  }
}
