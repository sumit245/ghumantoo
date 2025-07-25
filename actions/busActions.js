// TODO: write code to implement logics related to bus such as view_bus, select_bus, show_fares, etc.

import axios from "axios";
import { API_URL, GET_BUSES, SELECT_BUS, SET_BOOKED_SEATS, SET_DESTINATION_ID, SET_JOURNEY_DATE, SET_PICKUP_ID, SET_SEARCH_TOKEN, SET_SEAT_LAYOUT, SET_SELECTED_SEATS, SET_TOTAL_SEATS } from "../utils/constants";

export const getBuses = (data) => (dispatch) => {
  dispatch({ type: GET_BUSES, payload: data });
};


export const getBusOnRoute =
  (pickup, destination, date_of_journey, filters = []) => async (dispatch) => {
    const params = {
      OriginId: pickup,
      DestinationId: destination,
      DateOfJourney: date_of_journey,
      UserIp: "103.209.223.52"
    };

    if (filters && filters.length > 0) {
      params.fleetType = filters;
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

export const getAvailableSeats = (id, search_token) => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/api/bus/show-seats/`, {
      params: {
        SearchTokenId: search_token,
        ResultIndex: id
      }
    })
    const { html, availableSeats } = response.data
    // dispatch({ type: SELECT_BUS, payload: trip })
    // dispatch({ type: SET_BOOKED_SEATS, payload: bookedSeats })
    dispatch({ type: SET_SEAT_LAYOUT, payload: html.seat })
    dispatch({ type: SET_TOTAL_SEATS, payload: availableSeats })
  } catch (err) {
    return err
  }

}

export const bookTicket = async (trip_id, data) => {

  const response = await axios.get(`${API_URL}/api/bus/book-ticket/${trip_id}`, {
    params: data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return response.data
}

export const confirmTicket = async (data) => {
  try {
    const response = await axios.get(`${API_URL}/api/confirm-payment`, {
      params: data,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const { status, details } = response.data
    return { status, details }
  } catch (error) {
    return error
  }
}

export const setPassengerSeats = (selectedSeats, count,) => (dispatch) => {
  dispatch({ type: SET_SELECTED_SEATS, payload: selectedSeats })
}
