import { GET_BUSES, SELECT_BUS, SET_BOOKED_SEATS, SET_DESTINATION_ID, SET_JOURNEY_DATE, SET_PICKUP_ID, SET_SEAT_LAYOUT, SET_SELECTED_SEATS, SET_TOTAL_SEATS } from "../utils/constants";

const busReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_PICKUP_ID:
      return { ...state, pickupId: action.payload }
    case SET_DESTINATION_ID:
      return { ...state, destinationId: action.payload }
    case GET_BUSES:
      return { ...state, buses: action.payload };
    case SET_JOURNEY_DATE:
      return { ...state, date_of_journey: action.payload }
    case SET_TOTAL_SEATS:
      return { ...state, total_seats: action.payload }
    case SET_BOOKED_SEATS:
      return { ...state, bookedSeats: action.payload }
    case SET_SEAT_LAYOUT:
      return { ...state, seatLayout: action.payload }
    case SET_SELECTED_SEATS:
      return { ...state, selectedSeats: action.payload }
    case SELECT_BUS:
      return { ...state, selectedBus: action.payload };

    default:
      return state;
  }
};

export default busReducer;
