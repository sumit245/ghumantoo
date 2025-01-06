// TODO: write code to implement logics related to bus such as view_bus, select_bus, show_fares, etc.

import axios from 'axios'
import { API_URL, GET_BUSES } from "../utils/constants";



export const getBuses = (data) => dispatch => {
    dispatch({ type: GET_BUSES, payload: data });
}


export const getBusOnRoute = (pickup, destination, date_of_journey) => async (dispatch) => {
    const response = await axios.get(`${API_URL}/api/bus/search`, {
        pickup,
        destination,
        date_of_journey
    })
    const { trips } = response.data
    const { data } = trips
    console.log(data)
}

export const fetchCounters = async (query) => {
    try {
        const response = await axios.get(`${API_URL}/api/counters`)
        const { counters } = response.data
        console.log(counters)

        // Filter counters using regex for partial match
        const filteredCounters = counters.filter(counter =>
            new RegExp(query, 'i').test(counter.name)
        )
        console.log(filteredCounters)
        return filteredCounters // Return the list of matching counters
    } catch (error) {
        console.error('Error fetching counters:', error)
        return []
    }
}