const INITIAL_STATE = {
    products: [],
    error: null,
    fetching: false,
    fetched: false
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case "GET_PRODUCTS_PENDING":
            return { ...state, error: null, fetching: true, fetched: false }
        case "GET_PRODUCTS_FULFILLED":
            return { ...state, products: action.payload, fetching: false, fetched: true }
        case "GET_PRODUCTS_REJECTED":
            return { ...state, error: action.payload, fetching: false, fetched: false }
        default:
            return state
    }
}


