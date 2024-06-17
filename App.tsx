import React, { useMemo, useState } from "react";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import Route from "./src/screens/Route";
import { StatusBar } from "react-native";
import { Store } from "./src/redux/Store";
import DarkTheme from "./src/theme/DarkTheme";
import LightTheme from "./src/theme/LightTheme";
import { ThemeContext } from "./src/theme/ThemeContext";

function App(){

  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const themeContext = useMemo(() => {
    return {isDarkTheme, setIsDarkTheme};
  });

  return(
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={Store}>
        <NavigationContainer theme={isDarkTheme ? DarkTheme : LightTheme}>
          <ThemeContext.Provider value={themeContext}>
            <StatusBar backgroundColor={isDarkTheme ? "#101010" : "#FFFFFF"} barStyle={isDarkTheme ? "light-content" : "dark-content"}/>
            <Route/>
          </ThemeContext.Provider>
        </NavigationContainer>
      </Provider>
    </GestureHandlerRootView>
  )
}
export default App;
