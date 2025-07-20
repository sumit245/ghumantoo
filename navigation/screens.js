import {
  SignIn,
  SearchBuses,
  Passenger,
  OTPPage,
  EditProfile,
  SelectSeat,
  ConfirmationPage,
  Wallet,
  About,
  Cards,
  Home,
  Setting,
} from "../pages";
import FilterScreen from "../pages/FilterScreen";
import BottomTabNavigator from "./BottomTabNavigator";

/**
 * =================================================================
 * SHARED SCREEN CONFIGURATIONS
 * =================================================================
 * Define all screens that are common to both authorized and
 * unauthorized users here to avoid duplication.
 */
const commonScreens = [
  {
    name: "Main",
    component: BottomTabNavigator,
    options: {
      headerShown: false,
    },
  },
  {
    name: "SearchBus",
    component: SearchBuses,
    options: {
      headerShown: true,
      title: "Search Results",
    },
  },
  {
    name: "selectSeat",
    component: SelectSeat,
    options: {
      headerShown: true,
      title: "Select Seat(s)",
    },
  },
  {
    name: "AddPassenger",
    component: Passenger,
    options: {
      headerShown: true,
      title: "Passenger Details",
    },
  },
  {
    name: "editProfile",
    component: EditProfile,
    options: {
      headerShown: true,
      title: "Edit Profile",
    },
  },
  {
    name: "Wallet",
    component: Wallet,
    options: {
      headerShown: true,
      title: "Wallet",
    },
  },
  {
    name: "About",
    component: About,
    options: {
      headerShown: true,
      title: "About",
    },
  },
  {
    name: "Setting",
    component: Setting,
    options: {
      headerShown: true,
      title: "Setting",
    },
  },
  {
    name: "Cards",
    component: Cards,
    options: {
      headerShown: true,
      title: "Cards",
    },
  },
  {
    name: "filterPage",
    component: FilterScreen,
    options: {
      headerShown: true,
      title: "Filter",
    }
  },
  {
    name: "ConfirmationPage",
    component: ConfirmationPage,
    options: {
      headerShown: true,
      title: "Confirmation Page",
    },
  },
];


/**
 * =================================================================
 * STACK DEFINITIONS
 * =================================================================
 * Combine the common screens with stack-specific screens.
 */

// Screens accessible to users who are NOT logged in.
export const unauthorizedScreens = [
  {
    name: "SignIn",
    component: SignIn,
    options: {
      headerShown: false,
    },
  },
  {
    name: "verification",
    component: OTPPage,
    options: {
      headerShown: false,
    },
  },
  ...commonScreens, // Add all the common screens
];


// Screens accessible to users who ARE logged in.
export const stackScreens = [
  ...commonScreens, // Add all the common screens
];
