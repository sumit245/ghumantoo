import React from 'react';
import { View, Text, Image } from 'react-native';
import PrimaryButton from './buttons/PrimaryButton';
import { typography, PrimaryColor, DarkGray, layouts, spacing } from '../utils/styles';

export default function GuestView({
    image = require('../assets/icon.png'),
    title = "You are browsing as a guest",
    subtitle = "Log in or create an account to manage your bookings and access all features.",
    buttonText = "Log In / Sign Up",
    onLoginPress,
    style = {},
}) {
    return (
        <View style={[layouts.container, layouts.colCenter, spacing.ph4, style]}>
            <Image
                source={image}
                style={[spacing.mb5, { width: 200, height: 200 }]}
                resizeMode="contain"
            />
            <Text style={[typography.font20, typography.textBold, { color: PrimaryColor, marginBottom: 8 }]}>{title}</Text>
            <Text style={[typography.font14, { color: DarkGray, marginBottom: 16, textAlign: 'center', paddingHorizontal: 24 }]}>{subtitle}</Text>
            <PrimaryButton
                title={buttonText}
                onClick={onLoginPress}
                style={[spacing.mt5, { width: '80%' }]}
            />
        </View>
    );
}