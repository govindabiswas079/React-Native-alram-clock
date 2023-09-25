// libs
import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import Routes from './Routes';

const App = () => {

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      background: "rgb(242, 242, 242)",
      border: "rgb(216, 216, 216)",
      card: "rgb(255, 255, 255)",
      notification: "rgb(255, 59, 48)",
      primary: "rgb(0, 122, 255)",
      text: "rgb(28, 28, 30)"
    },
  };


  return (
    <NavigationContainer theme={MyTheme}>
      <Routes />
    </NavigationContainer>
  )
}

export default App