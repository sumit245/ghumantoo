import { NavigationContainer, } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';

// Add custom modules only after native modules are imported for better readability.
import StackNavigator from './navigation/StackNavigator';
import store from './store';

// Check if internet is connected or not.
// User is logged or not
// How user is opening the app
//       To get analytics of the app from ads, coupons, campaigns etc
// Check if user has granted necessary permissions to the app
export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <PaperProvider>
          <AutocompleteDropdownContextProvider>
            <StackNavigator isLoggedIn={false} />
          </AutocompleteDropdownContextProvider>
        </PaperProvider>
      </Provider>
    </NavigationContainer>
  );
}