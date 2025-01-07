import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { stackScreens, unauthorizedScreens } from './screens';
import { useEffect, useState } from 'react';
import { OTPPage, SignIn } from '../pages';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator()

export default function StackNavigator({ isLoggedIn }) {
    const [loggedIn, setLoggedIn] = useState(false)

    const getItemFromCache = async () => {
        const response = await AsyncStorage.multiGet(['user_id', 'user_token'])
        const userObject = Object.fromEntries(response);
        if (userObject.user_id && userObject.user_token) {
            setLoggedIn(true)
        }
    }

    useEffect(() => {
        setLoggedIn(isLoggedIn)
    }, [isLoggedIn])

    useEffect(() => {
        getItemFromCache()
    }, [loggedIn])

    if (loggedIn) {
        return (
            <Stack.Navigator>
                {
                    stackScreens.map((screen, index) => (
                        <Stack.Screen name={screen.name} component={screen.component} options={screen.options} key={index} />
                    ))
                }
            </Stack.Navigator>
        )
    }
    return (
        <Stack.Navigator>
            {
                unauthorizedScreens.map((screen, index) => (
                    <Stack.Screen name={screen.name} component={screen.component} options={screen.options} key={index} />
                ))
            }
        </Stack.Navigator>
    )
}