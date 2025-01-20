import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { PrimaryColor, WhiteColor } from '../utils/colors';
import { styles } from '../utils/styles';
import { Home, Bookings, Help, Account } from '../pages';

const BottomTabs = createMaterialBottomTabNavigator()

export const bottomTabScreens = [
  {
    name: "Home",
    icon: "home",
    component: Home,
  },
  {
    name: "Bookings",
    icon: "ticket",
    component: Bookings,
  },
  {
    name: "Help",
    icon: "help-circle",
    component: Help,
  },
  {
    name: "Account",
    icon: "person",
    component: Account,
  },
];


export default function BottomTabNavigator() {
    return (
        <BottomTabs.Navigator
            initialRouteName="Home"
            activeColor={PrimaryColor}
            activeIndicatorStyle={{ backgroundColor: WhiteColor }}
            labeled={true}
            barStyle={styles.bottomTabBar}
            tabBarOptions={{ labelStyle: { fontWeight: "bold" } }}
        >
            {
                bottomTabScreens.map((screen, index) => (
                    <BottomTabs.Screen
                        name={screen.name}
                        component={screen.component}
                        key={index}
                        options={{
                            tabBarIcon: ({ color }) => (
                                <Icon name={screen.icon} color={color} size={24} />
                            ),
                            tabBarLabel: screen.name,
                        }}
                    />
                ))
            }
        </BottomTabs.Navigator>
    );
}