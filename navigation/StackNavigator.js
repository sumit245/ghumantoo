import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { stackScreens } from './screens';

const Stack = createNativeStackNavigator()

export default function StackNavigator({ isLoggedIn }) {
    return (
        <Stack.Navigator initialRouteName={isLoggedIn ? "Home" : "SignIn"}>
            {
                stackScreens.map((screen, index) => (
                    <Stack.Screen name={screen.name} component={screen.component} options={screen.options} key={index} />
                ))
            }
        </Stack.Navigator>
    )
}