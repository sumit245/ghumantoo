import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import PrimaryButton from './buttons/PrimaryButton';
import { typography } from '../utils/typography';
import { PrimaryColor } from '../utils/colors';

export default function GuestView({
    image = require('../assets/icon.png'),
    title = "You are browsing as a guest",
    subtitle = "Log in or create an account to manage your bookings and access all features.",
    buttonText = "Log In / Sign Up",
    onLoginPress,
    style = {},
}) {
    return (
        <View style={[styles.guestContainer, style]}>
            <Image
                source={image}
                style={styles.image}
                resizeMode="contain"
            />
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
            <PrimaryButton
                title={buttonText}
                onClick={onLoginPress}
                style={{ marginTop: 20, width: '80%' }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    guestContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
    },
    image: { width: 200, height: 200, marginBottom: 24 },
    title: { ...typography.font20, fontWeight: 'bold', color: PrimaryColor, marginBottom: 8 },
    subtitle: { ...typography.font14, color: '#666', marginBottom: 16, textAlign: 'center', paddingHorizontal: 24 },
});