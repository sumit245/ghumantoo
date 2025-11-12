import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PrimaryButton from '../buttons/PrimaryButton';
import { PrimaryColor, DarkGray, typography, spacing, layouts, styles as globalStyles } from '../../utils/styles';

const EmptyBookings = React.memo(({ onBookNow }) => (
    <SafeAreaView style={[styles.container, layouts.colCenter]}>
        <Image
            source={require('../../assets/icon.png')}
            style={styles.image}
            resizeMode="contain"
        />
        <Text style={styles.title}>No Bookings Yet</Text>
        <Text style={styles.subtitle}>Book your first trip and enjoy special discounts!</Text>
        <PrimaryButton
            onClick={onBookNow}
            title="Book Now"
            style={{ width: '90%' }}
        />
    </SafeAreaView>
));

const styles = StyleSheet.create({
    container: {
        ...globalStyles.container,
        ...spacing.ph1,
        ...spacing.mb1,
        justifyContent: 'space-between',
    },
    image: {
        width: 200,
        height: 200,
        ...spacing.mb5,
    },
    title: {
        ...typography.font20,
        ...typography.textBold,
        color: PrimaryColor,
        ...spacing.mb2,
    },
    subtitle: {
        ...typography.font14,
        color: DarkGray,
        ...spacing.mb4,
        textAlign: 'center',
        ...spacing.ph5,
    },
});

export default EmptyBookings;
