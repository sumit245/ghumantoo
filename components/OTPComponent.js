import { View, TextInput } from 'react-native'
import React, { useState, useRef } from 'react'
import { PrimaryColor } from '../utils/colors'
import { styles, width } from '../utils/styles'

export default function OTPComponent({ digit, verifyOTP }) {
    const [digits] = useState(digit)
    const [otpValues, setOtpValues] = useState(Array(digits).fill(''))
    const otpRef = useRef([])

    const handleTextChange = (index, text) => {
        const newOtpValues = [...otpValues]
        newOtpValues[index] = text
        setOtpValues(newOtpValues)

        if (text.length === 1 && index < digits - 1) {
            otpRef.current[index + 1].focus()
        } else if (text.length === 0 && index > 0) {
            otpRef.current[index - 1].focus()
        }
    }

    const setOtp = () => {
        const otp = otpValues.join('')
        verifyOTP(otp)
    }

    return (
        <View style={{ flexDirection: 'row', width: width - 60, padding: 4, marginVertical: 20, alignItems: 'center', justifyContent: 'space-between' }}>
            {
                Array(digits).fill().map((_, index) => (
                    <TextInput
                        key={index}
                        ref={ref => otpRef.current[index] = ref}
                        maxLength={1}
                        returnKeyType={index === digits - 1 ? 'done' : 'next'}
                        keyboardType='number-pad'
                        cursorColor={PrimaryColor}
                        value={otpValues[index]}
                        style={styles.otpTextInput}
                        onChangeText={text => handleTextChange(index, text)}
                        onSubmitEditing={() => {
                            if (index === digits - 1) {
                                setOtp()
                            }
                        }}
                    />
                ))
            }
        </View>
    )
}