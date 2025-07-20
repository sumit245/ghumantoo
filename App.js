import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';

// Add custom modules only after native modules are imported for better readability.
import StackNavigator from './navigation/StackNavigator';
import store from './store';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Provider store={store}>
          <PaperProvider>
            <AutocompleteDropdownContextProvider>
              <StackNavigator isLoggedIn={false} />
            </AutocompleteDropdownContextProvider>
          </PaperProvider>
        </Provider>
      </NavigationContainer>
    </AuthProvider>

  );
}