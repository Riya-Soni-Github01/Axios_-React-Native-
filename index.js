/**
 * @format
 */
import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import Store from './App/reducer/store';
const Wrap = () => {
  return (
    <Provider store={Store} >
      <App />
    </Provider>
  )
}
AppRegistry.registerComponent(appName, () => Wrap);