import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from "./Splash";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const Route = () => {

  const Stack = createNativeStackNavigator();

  return(
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen
        name="Splash"
        component={Splash}/>
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{
          animation: "fade"
        }}/>
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          animation: "ios",
          headerShown: true
        }}/>
    </Stack.Navigator>
  )
}

export default Route;
