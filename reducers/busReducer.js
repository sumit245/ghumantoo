import { GET_BUSES, SELECT_BUS, SET_BOOKED_SEATS, SET_DESTINATION_ID, SET_JOURNEY_DATE, SET_PICKUP_ID, SET_SEARCH_TOKEN, SET_SEAT_LAYOUT, SET_SELECTED_SEATS, SET_TOTAL_SEATS, SET_ORIGIN_CITY, SET_DESTINATION_CITY, SET_RESULT_INDEX, SET_ACTIVE_COUPONS, SET_AVAILABLE_BOARDING_POINTS, SET_PRICE_OF_SEATS, SET_BUS_TYPE, SET_AVAILABLE_DROPPING_POINTS, SET_DEPARTURE_TIME, SET_ARRIVAL_TIME, SET_CANCEL_POLICY, SET_SELECTED_BOARDING_POINT, SET_SELECTED_DROPPING_POINT, GET_BUSES_SUCCESS, APPEND_BUSES_SUCCESS, SET_PAGINATION } from "../utils/constants";

const initialState = {
  // bus: [],
  buses: [],
  loading: false,
  loadingMore: false,
  error: null,
  isSeatsLoading: false, // New state for seat loading
  seatLayout: null,
  policiesCancellation: null,
  pagination: {},
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
    case 'GET_BUSES_REQUEST':
      return {
        ...state,
        loading: action.payload.page === 1,
        loadingMore: action.payload.page > 1,
        // Clear the list only for a new search
        // buses: action.payload.page === 1 ? [] : state.buses,
        error: null,
      };
    case GET_BUSES_SUCCESS:
      return {
        ...state,
        loading: false,
        buses: action.payload,
      };
    case APPEND_BUSES_SUCCESS:
      return {
        ...state,
        loadingMore: false,
        buses: [...state.buses, ...action.payload],
      };
    case SET_PAGINATION:
      return {
        ...state,
        pagination: action.payload,
      };
    case 'GET_BUSES_FAILURE':
      return {
        ...state,
        loading: false,
        loadingMore: false,
        error: action.payload,
      };
    case 'CLEAR_SEARCH_RESULTS':
      return {
        ...state,
        buses: [],
        SearchTokenId: null,
      };
    case 'GET_SEATS_REQUEST':
      return {
        ...state,
        isSeatsLoading: true,
        seatLayout: null, // Clear previous seat layout
        policiesCancellation: null, // Clear previous policies
        error: null,
      };
    case 'GET_SEATS_SUCCESS':
      return {
        ...state,
        isSeatsLoading: false,
        seatLayout: action.payload.seatLayout,
        total_seats: action.payload.availableSeats,
        formattedCancellationPolicy: action.payload.cancellationPolicy,
        // IMPORTANT: We receive the formatted policy for the UI, but we do NOT
        // overwrite the original `policiesCancellation` state. This preserves the
        // structured data needed for subsequent API calls.
      };
    case 'GET_SEATS_FAILURE':
      return {
        ...state,
        isSeatsLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default busReducer;
