import React, { useEffect } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context'; // 1. Import the hook
import { PrimaryColor, WhiteColor } from '../utils/colors';
import { styles } from '../utils/styles';
import { Home, Bookings, Help, Account } from '../pages';

const BottomTabs = createMaterialBottomTabNavigator();

export const bottomTabScreens = [
  {
    name: "Home",
    icon: "home-outline", // Using outline icons for consistency
    component: Home,
  },
  {
    name: "Bookings",
    icon: "ticket-outline",
    component: Bookings,
  },
  {
    name: "Help",
    icon: "help-circle-outline",
    component: Help,
  },
  {
    name: "Account",
    icon: "person-outline",
    component: Account,
  },
];

export default function BottomTabNavigator() {
  // 2. Get the safe area insets
  const insets = useSafeAreaInsets();
  useEffect(() => {
    console.log("Bottom insets:", insets.bottom);
  }, [])

  return (
    <BottomTabs.Navigator
      initialRouteName="Home"
      activeColor={PrimaryColor}
      inactiveColor="#9e9e9e" // It's good practice to define an inactive color
      activeIndicatorStyle={{ backgroundColor: WhiteColor }}
      labeled={true}
      // 3. Apply the bottom inset as margin to the barStyle
      barStyle={[
        styles.bottomTabBar,
        {
          marginBottom: insets.bottom,
        },
      ]}
    >
      {bottomTabScreens.map((screen, index) => (
        <BottomTabs.Screen
          key={index}
          name={screen.name}
          component={screen.component}
          options={{
            tabBarIcon: ({ color, focused }) => (
              // Use focused state to show filled icons when active
              <Icon name={focused ? screen.icon.replace('-outline', '') : screen.icon} color={color} size={24} />
            ),
            tabBarLabel: screen.name,
          }}
        />
      ))}
    </BottomTabs.Navigator>
  );
}

