/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import NativeCharts from './src/NativeCharts';
// import DraggableSheet from './src/Sheets/DraggableSheet';
// import BackgroundTask from './src/Background/BackgroundTask';
// import App from './src/App';
// import MainView from './src/MainView';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => NativeCharts);
