import axios from "axios";
import apiClient from "../utils/api";
import { API_URL, APPEND_BUSES_SUCCESS, GET_BUSES, GET_BUSES_SUCCESS, SELECT_BUS, SET_ACTIVE_COUPONS, SET_AVAILABLE_BOARDING_POINTS, SET_AVAILABLE_DROPPING_POINTS, SET_BOOKED_SEATS, SET_CANCEL_POLICY, SET_DESTINATION_ID, SET_JOURNEY_DATE, SET_PAGINATION, SET_PICKUP_ID, SET_PRICE_OF_SEATS, SET_RESULT_INDEX, SET_SEARCH_TOKEN, SET_SEAT_LAYOUT, SET_SELECTED_SEATS, SET_TOTAL_SEATS } from "../utils/constants";


export const getBusOnRoute = (pickup, destination, date_of_journey, filters = {}, page = 1) => async (dispatch) => {
  // Dispatch a request action to handle loading states in the reducer
  dispatch({ type: 'GET_BUSES_REQUEST', payload: { page } });

  // Build the parameters object from all available data
  const params = {
    OriginId: pickup,
    DestinationId: destination,
    DateOfJourney: date_of_journey,
    page: page,
    sortBy: filters.sortBy,
    sortOrder: filters.sortOrder,
  };

  // Add fleetType filter only if it has values
  if (filters.fleetTypes && filters.fleetTypes.length > 0) {
    params.fleetType = filters.fleetTypes; // Backend now handles normalization
  }
  // Add departureTime filter (from advanced filter screen)
  if (filters.departureTime) {
    params.departure_time = [filters.departureTime];
  }

  // Add price filter (from advanced filter screen)
  if (filters.price !== undefined && filters.price !== null) {
    params.max_price = filters.price;
  }
  try {
    const response = await axios.get(`${API_URL}/api/bus/search`, { params });

    const { SearchTokenId, trips, pagination } = response.data;

    // If it's the first page, replace the list. Otherwise, append to it.
    if (page === 1) {
      dispatch({ type: GET_BUSES_SUCCESS, payload: trips });
    } else {
      dispatch({ type: APPEND_BUSES_SUCCESS, payload: trips });
    }

    // Dispatch actions to update other relevant state
    dispatch({ type: SET_SEARCH_TOKEN, payload: SearchTokenId });
    dispatch({ type: SET_PAGINATION, payload: pagination }); // Store pagination data

    // Dispatch these only on the first page load to avoid redundancy
    if (page === 1) {
      dispatch({ type: SET_JOURNEY_DATE, payload: date_of_journey });
      dispatch({ type: SET_PICKUP_ID, payload: pickup });
      dispatch({ type: SET_DESTINATION_ID, payload: destination });
    }

    // Return the full response data so the component can check for more pages
    return response.data;

  } catch (error) {
    console.error("getBusOnRoute error", error);
    dispatch({ type: 'GET_BUSES_FAILURE', payload: error.message });
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
    if (error.response) {
      console.error("Server responded with error:", error.response.status, error.response.data);
    } else if (error.request) {
      console.error("No response received. Request details:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }
    console.error("fetchCounters error", error);
    return [];
  }
};
// Done

export const getAvailableSeats = (resultIndex, searchToken, policies) => async (dispatch) => {
  // 1. Dispatch a loading action to show a spinner on the SeatSelection screen
  dispatch({ type: 'GET_SEATS_REQUEST' });

  try {
    // 2. Run both API calls in parallel for efficiency
    // let parsedPolicies = policies;
    // Ensure policies is a JS object/array, not a JSON string
    // if (typeof policies === 'string') {
    //   try {
    //     parsedPolicies = JSON.parse(policies);
    //   } catch (e) {
    //     console.error("Failed to parse cancellation policies:", e);
    //     // If parsing fails, we might send the original or an empty object
    //     // depending on what the backend expects on failure.
    //     parsedPolicies = [];
    //   }
    // }
    const parsedPolicies = typeof policies === 'string' ? JSON.parse(policies) : policies;
    const [seatResponse, cancellationPolicyResponse] = await Promise.all([
      axios.get(`${API_URL}/api/bus/show-seats/`, {
        params: {
          SearchTokenId: searchToken,
          ResultIndex: resultIndex
        }
      }),
      axios.post(`${API_URL}/api/bus/cancellation-policy`, {
        CancelPolicy: parsedPolicies
      })
    ]);

    const { html, availableSeats } = seatResponse.data;
    const { cancellationPolicy } = cancellationPolicyResponse.data;
    // Use the formatted policy from the API response directly for the UI.
    // DO NOT dispatch it back to overwrite the original structured policy data.
    const formattedCancellationPolicy = cancellationPolicyResponse.data.cancellationPolicy;

    // 3. Dispatch success action with all the data
    dispatch({
      type: 'GET_SEATS_SUCCESS',
      // We pass the formatted policy here for the UI to use, but we won't store it back into `policiesCancellation`.
      // This prevents the data format from being corrupted for subsequent API calls.
      payload: { seatLayout: html.seat, availableSeats, cancellationPolicy: formattedCancellationPolicy }
    });

  } catch (err) {
    dispatch({ type: 'GET_SEATS_FAILURE', payload: err.message });
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
    // Use optimized apiClient instance - configured with timeout and headers
    // This is faster than creating a new axios instance each time
    const response = await apiClient.post('/api/bus/block-seat', data);
    return response.data;
  } catch (error) {
    // Only log error in development to avoid blocking in production
    if (__DEV__) {
      console.error("blockSeat error", error?.response?.data || error?.message);
    }
    // Re-throw with more context for better error handling
    throw error;
  }
}


export const confirmTicket = async (data) => {
  try {
    // Use optimized apiClient - no console.logs to avoid blocking
    const response = await apiClient.post('/api/bus/confirm-payment', data);
    const { success, block_details } = response.data;
    console.log(block_details);
    console.log(success);
    return { success, block_details };
  } catch (error) {
    // Only log in development to avoid blocking in production
    if (__DEV__) {
      const errorBody = error.response ? error.response.data : error.message;
      console.error("confirmTicket error", errorBody);
    }
    throw error;
  }
}

export const getTicketDetails = async (booking_id) => {
  try {
    const response = await apiClient.post('/api/users/get-ticket-by-booking-id', {
      booking_id: booking_id,
    });
    const { success, ticket } = response.data;
    if (success && ticket) {
      // Return the ticket data - can dispatch to reducer if needed later
      return ticket;
    }
    throw new Error('Failed to fetch ticket details');
  } catch (error) {
    // Only log error in development
    if (__DEV__) {
      const errorBody = error.response ? error.response.data : error.message;
      console.error("getTicketDetails error", errorBody);
    }
    throw error;
  }
}

export const cancelTicket = async (data) => {
  try {
    // Use optimized apiClient instance
    const response = await apiClient.post('/users/cancel-ticket', data);
    return response.data;
  } catch (error) {
    // Only log error in development
    if (__DEV__) {
      const errorBody = error.response ? error.response.data : error.message;
      console.error("cancelTicket error", errorBody);
    }
    throw error;
  }
}