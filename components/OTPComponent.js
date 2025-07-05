import { View, TextInput } from 'react-native'
import React, { useState, useRef } from 'react'
import { PrimaryColor } from '../utils/colors'
import { styles, width } from '../utils/styles'
import { spacing } from '../utils/spacing.styles'

export default function OTPComponent({ digit, verifyOTP }) {
    const [digits] = useState(digit)
    const [otpValues, setOtpValues] = useState(Array(digits).fill(''))
    const [focusedIndex, setFocusedIndex] = useState(null)
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
        <View style={[
            spacing.mb5,
            {
                flexDirection: 'row',
                width: width - 38,
                alignItems: 'center',
                justifyContent: 'space-between',
            }
        ]}>
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
                        style={[
                            styles.otpTextInput,
                            {
                                borderBottomColor: focusedIndex === index ? PrimaryColor : 'grey',
                                borderBottomWidth: 2, // adjust thickness as needed
                            }
                        ]}
                        onChangeText={text => handleTextChange(index, text)}
                        onFocus={() => setFocusedIndex(index)}
                        onBlur={() => setFocusedIndex(null)}
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
