const INITIAL_STATE = {
    product: {},
    error: null,
    fetching: false,
    fetched: false
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case "GET_PRODUCT_PENDING":
            return { ...state, error: null, fetching: true, fetched: false }
        case "GET_PRODUCT_FULFILLED":
            return { ...state, product: action.payload, fetching: false, fetched: true }
        case "GET_PRODUCT_REJECTED":
            return { ...state, error: action.payload, fetching: false, fetched: false }
        default:
            return state
    }
}


