import React from "react";
import { createDrawerNavigator} from "@react-navigation/drawer";
import Progress from "./Progress";
import NewTask from "./NewTask";
import AllTasks from "./AllTasks";
import DrawerContent from "../../components/layouts/DrawerContent";
import { lightColors } from "../../components/styles/Colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { horizontalScale, moderateScale, verticalScale } from "../../helper/Metrics";
import Settings from "./Settings";

const DrawerNavigation = () => {

  const Drawer = createDrawerNavigator();

  return(
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: "front",
        drawerHideStatusBarOnOpen: false,
        drawerStatusBarAnimation: "fade",
        drawerStyle:{
          width: "65%",
          backgroundColor: lightColors.background
        },
        drawerItemStyle:{
          width: "96%",
          height: verticalScale(50),
          justifyContent: "center",
          alignSelf: "center",
          borderRadius: moderateScale(5)
        },
        drawerActiveTintColor: lightColors.white,
        drawerActiveBackgroundColor: lightColors.primaryBlue,
        drawerInactiveTintColor: lightColors.primaryBlue,
        drawerLabelStyle:{
          fontWeight: "bold",
          fontSize: moderateScale(14),
          marginLeft: -horizontalScale(16)
        }
      }}
      drawerContent={(props) => {
        return(
          <DrawerContent {...props}/>
        )
      }}
    >
      <Drawer.Screen
        name="Progress"
        component={Progress}
        options={{
          drawerLabel: "Progress",
          drawerIcon: ({focused}) => (
            <Icon name="progress-check" color={focused ? lightColors.white : lightColors.primaryBlue} size={moderateScale(24)}/>
          )
        }}
      />
      <Drawer.Screen
        name="NewTask"
        component={NewTask}
        options={{
          drawerLabel: "New Task",
          drawerIcon: ({focused}) => (
            <Icon name="checkbox-marked-circle-plus-outline" color={focused ? lightColors.white : lightColors.primaryBlue} size={moderateScale(24)}/>
          )
        }}
      />
      <Drawer.Screen
        name="AllTasks"
        component={AllTasks}
        options={{
          drawerLabel: "All Tasks",
          drawerIcon: ({focused}) => (
            <Icon name="calendar-check" color={focused ? lightColors.white : lightColors.primaryBlue} size={moderateScale(24)}/>
          )
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          drawerLabel: "Settings",
          drawerIcon: ({focused}) => (
            <Icon name="cog-outline" color={focused ? lightColors.white : lightColors.primaryBlue} size={moderateScale(24)}/>
          )
        }}
      />
    </Drawer.Navigator>
  )
}

export default DrawerNavigation;
