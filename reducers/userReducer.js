import { AUTH_USER, LOGOUT, FORGOT_PASSWORD, SET_USER, SET_MOBILE_NUMBER, SET_OTP_MESSAGE } from "../utils/constants";


const initialState = {
    name: "",
    mobile_number: "",
    email_id: "",
    card: {
        card_number: "",
        expiry: "",
        cvc: ""
    },
};



const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MOBILE_NUMBER:
            return { ...state, mobile_number: action.payload }
        case SET_OTP_MESSAGE:
            return { ...state, message: action.payload }
        case AUTH_USER:
            return {
                ...state,
                ...action.payload
            }
        case LOGOUT:
            return {
                ...state,
                user: null
            }
        case SET_USER:
            return {
                ...state,
                ...action.payload
            }
        case FORGOT_PASSWORD:
            return {
                ...state,
                password: action.payload
            }
        default:
            return state;
    }

}

export default userReducer;