import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Animated,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { styles, typography, PrimaryColor, BlackColor, spacing, layouts, SuccessColor, GrayBackground } from "../utils/styles";
import SecondaryButton from "../components/buttons/SecondaryButton";
import ButtonContainer from "../components/buttons/ButtonContainer";
import TicketComponent from "../components/ticket/TicketComponent";
import PrimaryButton from "../components/buttons/PrimaryButton";
import Header from "../components/customs/Header";
import Loader from "../components/customs/Loader";
import { useConfirmationPage } from "../hooks/useConfirmationPage";

/**
 * ConfirmationPage Screen (Presentational Component)
 * 
 * Displays booking confirmation with ticket details.
 * All business logic extracted to useConfirmationPage custom hook.
 */

export default function ConfirmationPage({ route, navigation }) {
  // Extract all state and methods from custom hook
  const {
    loading,
    error,
    ticketData,
    passengerName,
    isHeaderVisible,
    headerOpacity,
    headerTranslateY,
    scrollY,
    originCity,
    destinationCity,
    handleCancel,
    navigateToBookings,
    navigateToHome,
  } = useConfirmationPage(route, navigation);

  if (loading) {
    return <Loader />;
  }

  if (error || !ticketData) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: "center", alignItems: "center", padding: 20 }]}>
        <Icon name="alert-circle" size={48} color="#f44336" />
        <Text style={{ color: '#17171f', marginTop: 16, textAlign: 'center' }}>
          {error || 'Failed to load ticket details'}
        </Text>
        <TouchableOpacity
          onPress={() => navigateToHome()}
          style={[styles.buttonPrimary, spacing.mt5]}
        >
          <Text style={styles.buttonTextPrimary}>Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: GrayBackground }]}>
      <Header
        title="Booking Confirmed"
        onBackPress={navigateToHome}
      />

      <Animated.ScrollView
        contentContainerStyle={[spacing.pv4, { flexGrow: 1 }]}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {/* Success Header - Animated fade out on scroll or completely disappears after 3 seconds if not scrolled */}
        {isHeaderVisible && (
          <Animated.View
            style={[
              layouts.colCenter,
              spacing.pv5,
              spacing.ph4,
              spacing.mb5,
              {
                opacity: headerOpacity,
                transform: [{ translateY: headerTranslateY }],
              }
            ]}
          >
            <Icon
              name="checkbox-marked-circle"
              size={40}
              color={SuccessColor}
            />
            <Text style={[typography.font20, typography.textBold, { color: SuccessColor, marginTop: 12, marginBottom: 8, textAlign: "center" }]}>
              Booking Confirmed!
            </Text>
            <Text style={[typography.font14, { color: BlackColor, textAlign: "center", paddingHorizontal: 20 }]}>
              Hey {passengerName}, your booking from {originCity || ticketData.boarding_point} to {destinationCity || ticketData.dropping_point} is confirmed!
            </Text>
          </Animated.View>
        )}

        {/* Ticket Component */}
        <View style={spacing.mb5}>
          <TicketComponent
            ticket={ticketData}
            onCancel={handleCancel}
          />
        </View>

        {/* Action Buttons */}
        <View style={[spacing.mt3, spacing.ph4]}>
          <ButtonContainer>
            <PrimaryButton
              onClick={navigateToBookings}
              title="My Bookings"
              style={typography.textCapitalize}
              isIconButton={true}
              iconName="ticket-outline"
            />
            <SecondaryButton
              onClick={navigateToHome}
              title="Continue Booking"
            />
          </ButtonContainer>
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}
