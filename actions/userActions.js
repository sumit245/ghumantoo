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
        console.log(error)
    }
}

export const verifyUserOTP = (mobile_number, otp) => async (dispatch) => {
    try {
        const response = await axios.post(`${API_URL}/api/send-otp`, { mobile_number: mobile_number, otp: otp })
        const { data } = response
        // const { message, status } = data
        console.log(data)
        // dispatch({ type: SET_MOBILE_NUMBER, payload: mobile_number })
        // dispatch({ type: SET_OTP_MESSAGE, payload: message })
        // if (status !== 200) {
        //     return status
        // }
    } catch (error) {
        console.log(error)
    }
}

// Actions are higher order functions that consume the dispatch function from the store
export const editProfile = (data) => (dispatch) => {
    dispatch({ type: SET_USER, payload: data })
}

