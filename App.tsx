import React from "react";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from "react-redux";
import { NavigationContainer } from '@react-navigation/native';
import Route from "./src/screens/Route";
import { StatusBar } from "react-native";
import { lightColors } from "./src/components/styles/Colors";
import { Store } from "./src/redux/Store";
function App(){
  return(
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={Store}>
        <NavigationContainer>
          <StatusBar backgroundColor={lightColors.background} barStyle="dark-content"/>
          <Route/>
        </NavigationContainer>
      </Provider>
    </GestureHandlerRootView>
  )
}
export default App;
