// TODO: Write code for user related actions such as login, signup, logout, editprofile etc.

import axios from "axios";
import { AUTH_USER, LOGOUT, FORGOT_PASSWORD, SET_USER, API_URL, SET_MOBILE_NUMBER, SET_OTP_MESSAGE } from "../utils/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";



export const authFromMobile = (mobile_number) => async (dispatch) => {
    try {
        const response = await axios.post(`${API_URL}/api/send-otp`, { mobile_number: mobile_number })
        const { data } = response
        const { message, status } = data
        console.log(message)
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
        console.log(mobile_number, otp)
        const response = await axios.post(`${API_URL}/api/verify-otp`, { mobile_number: mobile_number, otp: otp })
        const { message, status, data } = response.data
        const { user, token } = data
        const { id } = user
        const idPair = ['user_id', String(id)]
        const tokenPair = ['user_token', String(token)]
        await AsyncStorage.multiSet([idPair, tokenPair])
        dispatch({ type: AUTH_USER, payload: user })
        return status
    } catch (error) {
        console.log(error)
    }
}

// Actions are higher order functions that consume the dispatch function from the store
export const editProfile = (data) => (dispatch) => {
    dispatch({ type: SET_USER, payload: data })
}

