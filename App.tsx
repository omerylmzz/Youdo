import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import Route from "./src/screens/Route";
import { StatusBar } from "react-native";
import { lightColors } from "./src/components/styles/Colors";
function App(){
  return(
    <NavigationContainer>
      <StatusBar backgroundColor={lightColors.background} barStyle="dark-content"/>
      <Route/>
    </NavigationContainer>
  )
}
export default App;
