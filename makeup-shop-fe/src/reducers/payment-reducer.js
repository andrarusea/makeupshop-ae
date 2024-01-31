const INITIAL_STATE = {
  redirect: {},
  error: null,
  fetching: false,
  fetched: false,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case "POST_PAYMENT_PENDING":
      return { ...state, error: null, fetching: true, fetched: false };
    case "POST_PAYMENT_FULFILLED":
      return {
        ...state,
        redirect: action.payload,
        fetching: false,
        fetched: true,
      };
    case "POST_PAYMENT_REJECTED":
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
