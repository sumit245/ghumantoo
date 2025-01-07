import { GET_BUSES } from "../utils/constants";


const busReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_BUSES:
            return {
                ...state, buses: action.payload
            }

        default:
            return state;
    }
}

export default busReducer;