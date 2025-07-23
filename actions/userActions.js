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

        // The action still dispatches to Redux to update user info
        dispatch({ type: AUTH_USER, payload: user });

        // CRITICAL CHANGE: Return the status AND the token
        return { status, token };

    } catch (error) {
        // It's better to return a structured error
        const errorMessage = error.response?.data?.message || "An unexpected error occurred.";
        return { status: error.response?.status || 500, message: errorMessage };
    }
};

// Actions are higher order functions that consume the dispatch function from the store
export const editProfile = (data) => (dispatch) => {
    dispatch({ type: SET_USER, payload: data })
}

