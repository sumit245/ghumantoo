import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';

// Add custom modules only after native modules are imported for better readability.
import StackNavigator from './navigation/StackNavigator';
import store from './store';
import { AuthProvider } from './context/AuthContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // 1. Import
import { requestLocationPermission, requestNotificationPermission, hasLocationPermission, hasNotificationPermission } from './utils/PermissionManager';

export default function App() {
  const checkAllPermissions = async () => {
    try {
      const hasLoc = await hasLocationPermission();
      let res = hasLoc;
      if (!hasLoc) {
        res = await requestLocationPermission();
      }

      const hasNotif = await hasNotificationPermission();
      let notificationPermission = hasNotif;
      if (!hasNotif) {
        notificationPermission = await requestNotificationPermission();
      }
    } catch (e) {
      console.warn('checkAllPermissions error', e);
    }
  }
  useEffect(() => {
    // Any initialization logic can go here
    checkAllPermissions()
  }, []);

  return (
    <GestureHandlerRootView>
      <Provider store={store}>
        <AuthProvider>
          <NavigationContainer>
            <PaperProvider>
              <AutocompleteDropdownContextProvider>
                <StackNavigator isLoggedIn={false} />
              </AutocompleteDropdownContextProvider>
            </PaperProvider>
          </NavigationContainer>
        </AuthProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}