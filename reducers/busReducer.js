import { GET_BUSES } from "../utils/constants";

const initialState =
{
    id: "",
    departureTime: "",
    arrivalTime: "",
    seats: "",
    busProvider: "",
    busType: "",
    ratings: "",
    startingFrom: "",
    journeyDuration: ""
};

const busReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_BUSES:
            return {
                ...state,
                bus: action.payload
            }

        default:
            return state;
    }
}

export default busReducer;