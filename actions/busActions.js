import axios from "axios";
import { API_URL, GET_BUSES, SELECT_BUS, SET_ACTIVE_COUPONS, SET_AVAILABLE_BOARDING_POINTS, SET_AVAILABLE_DROPPING_POINTS, SET_BOOKED_SEATS, SET_CANCEL_POLICY, SET_DESTINATION_ID, SET_JOURNEY_DATE, SET_PICKUP_ID, SET_PRICE_OF_SEATS, SET_RESULT_INDEX, SET_SEARCH_TOKEN, SET_SEAT_LAYOUT, SET_SELECTED_SEATS, SET_TOTAL_SEATS } from "../utils/constants";


export const getBusOnRoute =
  (pickup, destination, date_of_journey, filters = {}) => async (dispatch) => {
    const params = {
      OriginId: pickup,
      DestinationId: destination,
      DateOfJourney: date_of_journey,
      UserIp: "103.209.223.52"
    };

    // Add fleetType filter if provided
    if (filters.fleetTypes && filters.fleetTypes.length > 0) {
      // The server expects 'A/c' or 'Non-A/c', but the frontend uses 'AC' and 'Non-AC'.
      params.fleetType = filters.fleetTypes.map(type => {
        if (type === 'AC') return 'A/c';
        if (type === 'Non-AC') return 'Non-A/c';
        return type;
      });
    }
    // Add departure_time filter if provided
    if (filters.departureTime) {
      params.departure_time = [filters.departureTime];
    }
    // Add price filter if provided
    if (filters.price !== undefined && filters.price !== null) {
      params.max_price = filters.price;
    }

    try {
      const response = await axios.get(`${API_URL}/api/bus/search`, { params });
      const { SearchTokenId, trips } = response.data;
      dispatch({ type: GET_BUSES, payload: trips });
      dispatch({ type: SET_SEARCH_TOKEN, payload: SearchTokenId });
      dispatch({ type: SET_JOURNEY_DATE, payload: date_of_journey });
      dispatch({ type: SET_PICKUP_ID, payload: pickup });
      dispatch({ type: SET_DESTINATION_ID, payload: destination });
      return SearchTokenId
    } catch (error) {
      console.error("getBusOnRoute error", error);
      throw error;
    }
  };
// Done



export const fetchCounters = async (query) => {
  try {
    const response = await axios.get(`${API_URL}/api/autocomplete-city?query=${query}`);
    const { data } = response
    return data; // Return the list of matching counters
  } catch (error) {
    return [];
  }
};
// Done

export const getAvailableSeats = (id, search_token, policies) => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/api/bus/show-seats/`, {
      params: {
        SearchTokenId: search_token,
        ResultIndex: id
      }
    })
    const cancellationPolicyResponse = await axios.post(`${API_URL}/api/bus/cancellation-policy`, {
      CancelPolicy: policies
    })
    const { cancellationPolicy } = cancellationPolicyResponse.data
    console.log("cancellationPolicy", cancellationPolicy);
    const { html, availableSeats } = response.data
    dispatch({ type: SET_CANCEL_POLICY, payload: cancellationPolicy })
    dispatch({ type: SET_RESULT_INDEX, payload: id })
    dispatch({ type: SET_SEAT_LAYOUT, payload: html.seat })
    dispatch({ type: SET_TOTAL_SEATS, payload: availableSeats });
  } catch (err) {
    console.error("getAvailableSeats error", err);
    throw err; // Re-throw the error to be handled by the calling component
  }
}
// Done

export const getActiveCoupons = () => async (dispatch) => {
  try {
    const resp = await axios.get(`${API_URL}/api/coupons`);
    const coupons = resp?.data?.data || [];
    dispatch({ type: SET_ACTIVE_COUPONS, payload: coupons });
  } catch (err) {
    console.error('getActiveCoupons error', err);
  }
}

export const getBoardingAndDroppingPoints = (trip_id, search_token, selectedSeats, totalPrice) => async (dispatch) => {
  try {
    console.log("Fetching boarding and dropping points for trip_id:", trip_id, "with search_token:", search_token);
    const response = await axios.get(`${API_URL}/api/bus/get-counters`, {
      params: {
        SearchTokenId: search_token,
        ResultIndex: trip_id
      }
    });
    const { boarding_points, dropping_points } = response.data;
    dispatch({ type: SET_SELECTED_SEATS, payload: selectedSeats })
    dispatch({ type: SET_PRICE_OF_SEATS, payload: totalPrice })
    dispatch({ type: SET_AVAILABLE_BOARDING_POINTS, payload: boarding_points });
    dispatch({ type: SET_AVAILABLE_DROPPING_POINTS, payload: dropping_points });
  } catch (error) {
    console.error("getBoardingAndDroppingPoints error", error);
    throw error;
  }
}

export const blockSeat = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/api/bus/block-seat`, {
      ...data
    });
    console.log("blockSeat response", response.data);
    return response.data;
  } catch (error) {
    console.error("blockSeat error", error);
    throw error;
  }
}


export const bookTicket = async (trip_id, data) => {
  try {
    const response = await axios.get(`${API_URL}/api/bus/book-ticket/${trip_id}`, {
      params: data,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error("bookTicket error", error);
    throw error;
  }
}

export const confirmTicket = async (data) => {
  try {
    const response = await axios.get(`${API_URL}/api/confirm-payment`, {
      params: data,
      // GET requests with 'Content-Type': 'application/json' in headers can be unusual.
      // If this is a POST request, change axios.get to axios.post and send `data` as the body.
      // Otherwise, this header is likely not needed for a GET request.
    });
    const { status, details } = response.data;
    return { status, details };
  } catch (error) {
    console.error("confirmTicket error", error);
    throw error;
  }
}