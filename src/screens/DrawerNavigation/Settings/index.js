import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SettingsScreen from "./SettingsScreen";
import ChangeSettingsScreen from "./ChangeSettingsScreen";

const Settings = () => {

  const Stack = createNativeStackNavigator();

  return(
    <Stack.Navigator>
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}/>
      <Stack.Screen
        name="ChangeSettingsScreen"
        component={ChangeSettingsScreen}
        options={{
          animation: "ios"
        }}/>
    </Stack.Navigator>
  )
}

export default Settings;
