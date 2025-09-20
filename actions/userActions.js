// TODO: Write code for user related actions such as login, signup, logout, editprofile etc.

import axios from "axios";
import { AUTH_USER, LOGOUT, FORGOT_PASSWORD, SET_USER, API_URL, SET_MOBILE_NUMBER, SET_OTP_MESSAGE } from "../utils/constants";


export const authFromMobile = (mobile_number) => async (dispatch) => {
    try {
        const response = await axios.post(`${API_URL}/api/send-otp`, { mobile_number: mobile_number })
        const { data } = response
        const { message, status } = data
        dispatch({ type: SET_MOBILE_NUMBER, payload: mobile_number })
        dispatch({ type: SET_OTP_MESSAGE, payload: message })
        if (status !== 200) {
            return status
        }
    } catch (error) {
        return error
    }
}

// In your actions/userActions.js

export const verifyUserOTP = (mobile_number, otp) => async (dispatch) => {
    try {
        const response = await axios.post(`${API_URL}/api/verify-otp`, { mobile_number: mobile_number, otp: otp });
        const { message, status, data } = response.data;
        const { user, token } = data;

        // Update redux with user info (so UI can read it immediately)
        dispatch({ type: AUTH_USER, payload: user });

        // Return status, token and user for callers to persist in async storage
        return { status, token, user };

    } catch (error) {
        console.error('verifyUserOTP error', error);
        // bubble up error shape similar to before
        throw error;
    }
};

// Actions are higher order functions that consume the dispatch function from the store
export const editProfile = (data) => (dispatch) => {
    dispatch({ type: SET_USER, payload: data })
}

export const logout = () => (dispatch) => {
    dispatch({ type: LOGOUT })
}

export const getMyTickets = async (mobile_number) => {
    try {
        const response = await axios.get(`${API_URL}/api/users/get-my-tickets`, {
            params: {
                mobile_number: mobile_number
            }
        })
        console.log("getMyTickets response", response.data);
        return response.data
    } catch (error) {
        console.error("getMyTickets error", error);
        throw error;
    }
}

