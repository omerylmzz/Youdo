import React from "react";
import { createDrawerNavigator} from "@react-navigation/drawer";
import Progress from "./Progress";
import NewTask from "./NewTask";
import AllTasks from "./AllTasks";
import Settings from "./Settings";
import DrawerContent from "../../components/layouts/DrawerContent";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { horizontalScale, moderateScale, verticalScale } from "../../helper/Metrics";
import { useTranslation } from "react-i18next";
import { useTheme } from "@react-navigation/native";

const DrawerNavigation = () => {

  const Drawer = createDrawerNavigator();
  const {t} = useTranslation();

  const { colors } = useTheme();

  return(
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: "front",
        drawerHideStatusBarOnOpen: false,
        drawerStatusBarAnimation: "fade",
        drawerStyle:{
          width: "65%",
          backgroundColor: colors.background
        },
        drawerItemStyle:{
          width: "96%",
          height: verticalScale(50),
          justifyContent: "center",
          alignSelf: "center",
          borderRadius: moderateScale(5)
        },
        drawerActiveTintColor: colors.white,
        drawerActiveBackgroundColor: colors.primaryBlue,
        drawerInactiveTintColor: colors.tint,
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
          headerShown: true,
          drawerLabel: t("drawer.progress"),
          drawerIcon: ({focused}) => (
            <Icon name="progress-check" color={focused ? colors.white : colors.tint} size={moderateScale(24)}/>
          )
        }}
      />
      <Drawer.Screen
        name="NewTask"
        component={NewTask}
        options={{
          drawerLabel: t("drawer.new-task"),
          drawerIcon: ({focused}) => (
            <Icon name="checkbox-marked-circle-plus-outline" color={focused ? colors.white : colors.tint} size={moderateScale(24)}/>
          )
        }}
      />
      <Drawer.Screen
        name="AllTasks"
        component={AllTasks}
        options={{
          headerShown: true,
          drawerLabel: t("drawer.all-tasks"),
          drawerIcon: ({focused}) => (
            <Icon name="calendar-check" color={focused ? colors.white : colors.tint} size={moderateScale(24)}/>
          )
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          drawerLabel: t("drawer.settings"),
          drawerIcon: ({focused}) => (
            <Icon name="cog-outline" color={focused ? colors.white : colors.tint} size={moderateScale(24)}/>
          )
        }}
      />
    </Drawer.Navigator>
  )
}

export default DrawerNavigation;
