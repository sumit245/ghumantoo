import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { stackScreens, unauthorizedScreens } from './screens';
import { useAuth } from '../context/AuthContext';

const Stack = createNativeStackNavigator();

const AuthStack = () => (
    <Stack.Navigator>
        {unauthorizedScreens.map((screen, index) => (
            <Stack.Screen name={screen.name} component={screen.component} options={screen.options} key={index} />
        ))}
    </Stack.Navigator>
);

const AppStack = () => (
    <Stack.Navigator>
        {stackScreens.map((screen, index) => (
            <Stack.Screen name={screen.name} component={screen.component} options={screen.options} key={index} />
        ))}
    </Stack.Navigator>
);

export default function StackNavigator() {
    const { userToken, isGuest } = useAuth();

    // A user can access the main app if they have a token OR if they are a guest
    const canAccessApp = userToken || isGuest;

    return canAccessApp ? <AppStack /> : <AuthStack />;
}
