import { GET_BUSES, SELECT_BUS, SET_BOOKED_SEATS, SET_DESTINATION_ID, SET_JOURNEY_DATE, SET_PICKUP_ID, SET_SEARCH_TOKEN, SET_SEAT_LAYOUT, SET_SELECTED_SEATS, SET_TOTAL_SEATS, SET_ORIGIN_CITY, SET_DESTINATION_CITY, SET_RESULT_INDEX, SET_ACTIVE_COUPONS, SET_AVAILABLE_BOARDING_POINTS, SET_PRICE_OF_SEATS, SET_BUS_TYPE, SET_AVAILABLE_DROPPING_POINTS, SET_DEPARTURE_TIME, SET_ARRIVAL_TIME, SET_CANCEL_POLICY, SET_SELECTED_BOARDING_POINT, SET_SELECTED_DROPPING_POINT } from "../utils/constants";

const initialState = {
  bus: [],
  buses: []
};

const busReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PICKUP_ID:
      return { ...state, pickupId: action.payload }
    case SET_ORIGIN_CITY:
      return { ...state, originCity: action.payload }
    case SET_DESTINATION_CITY:
      return { ...state, destinationCity: action.payload }
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
    case SET_PRICE_OF_SEATS:
      return { ...state, priceToPay: action.payload }
    case SELECT_BUS:
      return { ...state, selectedBus: action.payload };
    case SET_BUS_TYPE:
      return { ...state, selectedBusType: action.payload }
    case SET_DEPARTURE_TIME:
      return { ...state, departureTime: action.payload }
    case SET_ARRIVAL_TIME:
      return { ...state, arrivalTime: action.payload }
    case SET_SEARCH_TOKEN:
      return { ...state, SearchTokenId: action.payload }
    case SET_RESULT_INDEX:
      return { ...state, resultIndex: action.payload }
    case SET_ACTIVE_COUPONS:
      return { ...state, activeCoupons: action.payload }
    case SET_AVAILABLE_BOARDING_POINTS:
      return { ...state, boardingPoints: action.payload }
    case SET_SELECTED_BOARDING_POINT:
      return { ...state, selectedBoardingPoint: action.payload }
    case SET_SELECTED_DROPPING_POINT:
      return { ...state, selectedDroppingPoint: action.payload }
    case SET_AVAILABLE_DROPPING_POINTS:
      return { ...state, droppingPoints: action.payload }
    case SET_CANCEL_POLICY:
      return { ...state, policiesCancellation: action.payload }
    default:
      return state;
  }
};

export default busReducer;
