import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { stackScreens, unauthorizedScreens } from './screens';
import { useAuth } from '../context/AuthContext'; // 1. Import the useAuth hook

const Stack = createNativeStackNavigator();

// It's cleaner to define the stacks as separate components
const AppStack = () => (
    <Stack.Navigator>
        {stackScreens.map((screen, index) => (
            <Stack.Screen name={screen.name} component={screen.component} options={screen.options} key={index} />
        ))}
    </Stack.Navigator>
);

const AuthStack = () => (
    <Stack.Navigator>
        {unauthorizedScreens.map((screen, index) => (
            <Stack.Screen name={screen.name} component={screen.component} options={screen.options} key={index} />
        ))}
    </Stack.Navigator>
);

export default function StackNavigator() {
    // 2. Get the user token from the global context
    const { userToken } = useAuth();

    // 3. Conditionally render the correct stack based on the token's existence
    // This is fully reactive. When userToken changes, this component re-renders.
    return userToken ? <AppStack /> : <AuthStack />;
}
