const INITIAL_STATE = {
    user: {},
    error: null,
    fetching: false,
    fetched: false
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case "POST_USER_PENDING":
            return { ...state, error: null, fetching: true, fetched: false }
        case "POST_USER_FULFILLED":
            return { ...state, user: action.payload, error: null, fetching: false, fetched: true }
        case "POST_USER_REJECTED":
            return { ...state, token: {}, error: action.payload, fetching: false, fetched: true }
        default:
            return state
    }
}

