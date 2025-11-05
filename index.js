import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from './App';

// Register the app component - name must match MainActivity.getMainComponentName() in Android
// and the component name in iOS AppDelegate
AppRegistry.registerComponent('main', () => App);

