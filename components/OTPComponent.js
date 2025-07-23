import { View, TextInput } from 'react-native';
import React, { useState, useRef, useEffect } from 'react'; // 1. Import useEffect
import { PrimaryColor } from '../utils/colors';
import { styles, width } from '../utils/styles';
import { spacing } from '../utils/spacing.styles';

export default function OTPComponent({ digit, verifyOTP }) {
    const [digits] = useState(digit);
    const [otpValues, setOtpValues] = useState(Array(digits).fill(''));
    const [focusedIndex, setFocusedIndex] = useState(null);
    const otpRef = useRef([]);

    // 2. Add a useEffect to watch for changes in otpValues
    useEffect(() => {
        const otp = otpValues.join('');
        // Call the parent's function whenever the otpValues array changes.
        // This ensures the parent always has the most up-to-date value.
        verifyOTP(otp);
    }, [otpValues, verifyOTP]); // Dependency array ensures this runs only when needed

    const handleTextChange = (index, text) => {
        const newOtpValues = [...otpValues];
        newOtpValues[index] = text;
        setOtpValues(newOtpValues);

        // Auto-focus logic
        if (text.length === 1 && index < digits - 1) {
            otpRef.current[index + 1].focus();
        } else if (text.length === 0 && index > 0) {
            otpRef.current[index - 1].focus();
        }
    };

    return (
        <View
            style={[
                spacing.mb5,
                {
                    flexDirection: 'row',
                    width: width - 38,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                },
            ]}
        >
            {Array(digits)
                .fill()
                .map((_, index) => (
                    <TextInput
                        key={index}
                        ref={(ref) => (otpRef.current[index] = ref)}
                        maxLength={1}
                        returnKeyType={index === digits - 1 ? 'done' : 'next'}
                        keyboardType="number-pad"
                        cursorColor={PrimaryColor}
                        value={otpValues[index]}
                        style={[
                            styles.otpTextInput,
                            {
                                borderBottomColor:
                                    focusedIndex === index ? PrimaryColor : 'grey',
                                borderBottomWidth: 2,
                            },
                        ]}
                        onChangeText={(text) => handleTextChange(index, text)}
                        onFocus={() => setFocusedIndex(index)}
                        onBlur={() => setFocusedIndex(null)}
                        // 3. The onSubmitEditing is no longer needed to set the final OTP
                        // but can be kept for users who do use the 'done' key.
                        onSubmitEditing={() => {
                            if (index === digits - 1) {
                                // You could potentially trigger the parent's verify button press here
                                // but the useEffect already handles state updates.
                            }
                        }}
                    />
                ))}
        </View>
    );
}
