import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { height, styles as globalStyles } from '../utils/styles';
import { DangerColor, DarkGray, PrimaryColor, PureWhite } from '../utils/colors';
import { typography } from '../utils/typography';
import { spacing } from '../utils/spacing.styles';
import { useAuth } from '../context/AuthContext'; // 1. Import the useAuth hook
import PrimaryButton from '../components/buttons/PrimaryButton';

// --- Data for the menu items ---
const MENU_DATA = [
  { id: '1', title: 'Wallet', icon: 'wallet-outline', whereTo: 'Wallet' },
  { id: '2', title: 'Refer & Earn', icon: 'share-social-outline', whereTo: 'ReferAndEarn' },
  { id: '3', title: 'About Us', icon: 'information-circle-outline', whereTo: 'About' },
  { id: '4', title: 'Settings', icon: 'settings-outline', whereTo: 'Setting' },
];

const GuestView = ({ onLoginPress }) => (
  <View style={styles.guestContainer}>
    <Icon name="person-circle-outline" size={80} color={DarkGray} />
    <Text style={styles.guestTitle}>You are browsing as a guest</Text>
    <Text style={styles.guestSubtitle}>
      Log in or create an account to manage your bookings and access all features.
    </Text>
    <PrimaryButton title="Log In / Sign Up" onClick={onLoginPress} style={{ marginTop: 20, width: '80%' }} />
  </View>
);

// --- Sub-Component for the Profile Header ---
const ProfileHeader = ({ name, mobile, email, onPress }) => (
  <TouchableOpacity style={styles.profileHeader} onPress={onPress}>
    <View style={styles.profileInfoContainer}>
      <Icon name="person-circle-outline" size={48} color={PureWhite} />
      <View>
        <Text style={styles.profileName}>{name}</Text>
        <Text style={styles.profileDetail}>{mobile}</Text>
        <Text style={styles.profileDetail}>{email}</Text>
      </View>
    </View>
    <Icon name="chevron-forward" size={32} color={PureWhite} />
  </TouchableOpacity>
);

// --- Sub-Component for a single Menu Item ---
const MenuItem = ({ title, icon, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={styles.menuItemContent}>
      <Icon name={icon} color={PrimaryColor} size={24} style={styles.menuIcon} />
      <Text>{title}</Text>
    </View>
    <Icon name="chevron-forward" color={DarkGray} size={24} />
  </TouchableOpacity>
);

// --- Sub-Component for the Logout Button ---
const LogoutButton = ({ onPress }) => (
  <TouchableOpacity style={styles.logoutButton} onPress={onPress}>
    <Icon name="power" color={DangerColor} size={32} style={spacing.p1} />
    <Text style={styles.logoutText}>Log out</Text>
  </TouchableOpacity>
);

// --- Main Account Component ---
export default function Account() {
  const { email_id, mobile_number, name } = useSelector((state) => state.user);
  const navigation = useNavigation();
  const { signOut, isGuest } = useAuth(); // 2. Get the signOut function from the context

  // 3. The handleLogout function is now clean and uses the context
  const handleLogout = async () => {
    await signOut();
    // No navigation commands are needed here. The context handles it.
  };
  if (isGuest) {
    return (
      <SafeAreaView style={styles.container}>
        <GuestView onLoginPress={() => signOut()} />
      </SafeAreaView>
    );
  }


  return (
    <SafeAreaView style={styles.container}>
      <ProfileHeader
        name={name || "Guest"} // Default name if not available
        mobile={mobile_number}
        email={email_id || "Not provided"}
        onPress={() => navigation.navigate('editProfile')}
      />

      <View style={{ flex: 1 }}>
        {MENU_DATA.map((item) => (
          <MenuItem
            key={item.id}
            title={item.title}
            icon={item.icon}
            onPress={() => navigation.navigate(item.whereTo)}
          />
        ))}
      </View>

      <LogoutButton onPress={handleLogout} />
    </SafeAreaView>
  );
}

// --- Local Stylesheet for better organization ---
const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
    ...spacing.ph1,
    ...spacing.mb1,
    justifyContent: 'space-between',
  },
  profileHeader: {
    ...globalStyles.row,
    ...spacing.br2,
    ...spacing.p2,
    backgroundColor: PrimaryColor,
    height: height / 6,
    alignItems: 'center',
  },
  profileInfoContainer: {
    ...globalStyles.row,
    alignItems: 'center',
  },
  profileName: {
    ...typography.font20,
    ...typography.textBold,
    color: PureWhite,
  },
  profileDetail: {
    ...typography.font12,
    color: PureWhite,
  },
  menuItem: {
    ...globalStyles.row,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  menuItemContent: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 4,
  },
  menuIcon: {
    padding: 8,
  },
  logoutButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutText: {
    ...typography.font20,
    ...typography.textBold,
    color: DarkGray,
  },
  guestContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  guestTitle: {
    ...typography.font20,
    ...typography.textBold,
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  guestSubtitle: {
    ...typography.font16,
    color: DarkGray,
    textAlign: 'center',
  },
});
