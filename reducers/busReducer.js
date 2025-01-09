import { GET_BUSES, SELECT_BUS } from "../utils/constants";

const busReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_BUSES:
      return {
        ...state,
        buses: action.payload,
      };
    case SELECT_BUS:
      return {
        ...state,
        selectedBus: action.payload,
      };

    default:
      return state;
  }
};

export default busReducer;
