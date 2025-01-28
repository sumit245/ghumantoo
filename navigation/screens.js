import {
  SignIn,
  SearchBuses,
  Passenger,
  OTPPage,
  EditProfile,
  SelectSeat,
  ConfirmationPage,
  ReferAndEarn,
  Wallet,
  About,
  Cards,
  UpdateEmail,
  Home,
  BookingData,
  Setting,
} from "../pages";

import BottomTabNavigator from "./BottomTabNavigator";

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
    name: "ConfirmationPage",
    component: ConfirmationPage,
    options: {
      headerShown: true,
      title: "Confirmation Page",
    },
  },
  {
    name: "BookingData",
    component: BookingData,
    options: {
      headerShown: true,
      title: "Booking Data",
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
    name: "ReferAndEarn",
    component: ReferAndEarn,
    options: {
      headerShown: true,
      title: "Refer And Earn",
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
    name: "UpdateEmail",
    component: UpdateEmail,
    options: {
      headerShown: true,
      title: "UpdateEmail",
    },
  },
];

export const stackScreens = [
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
    name: "ConfirmationPage",
    component: ConfirmationPage,
    options: {
      headerShown: false,
      title: "Confirmation Page",
      swipeEnabled: false,
      gestureEnabled: false,
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
    name: "ReferAndEarn",
    component: ReferAndEarn,
    options: {
      headerShown: true,
      title: "Refer And Earn",
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
    name: "UpdateEmail",
    component: UpdateEmail,
    options: {
      headerShown: true,
      title: "UpdateEmail",
    },
  },
  {
    name: "BookingData",
    component: BookingData,
    options: {
      headerShown: true,
      title: "Booking Data",
    },
  },
];
