import React, { useContext, useEffect } from "react";
import { Image, StatusBar, View } from "react-native";
import styles from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18next from "../../../services/i18next";
import { useTheme } from "@react-navigation/native";
import { ThemeContext } from "../../theme/ThemeContext";

const Splash = ({navigation}) => {
  // Theme Variables
  const { setIsDarkTheme } = useContext(ThemeContext);
  const { colors } = useTheme();

  useEffect(() => {
    // User and device control functions
    checkDeviceSettings();
    checkUser();
  }, []);

  const checkDeviceSettings = async () => {
    try {
      const LANGUAGE = await AsyncStorage.getItem("LANGUAGE");
      const THEME = await AsyncStorage.getItem("THEME");
      const NOTIFICATION = await AsyncStorage.getItem("NOTIFICATION");
      LANGUAGE === null ? await AsyncStorage.setItem("LANGUAGE", "English") : LANGUAGE === "English" ? i18next.changeLanguage("en") : i18next.changeLanguage("tr");
      THEME === null ? await AsyncStorage.setItem("THEME", "Light") : THEME === "Light" ? setIsDarkTheme(false) : setIsDarkTheme(true);
      NOTIFICATION === null && await AsyncStorage.setItem("NOTIFICATION", "Open");
    }
    catch (error){
      console.log("SPLASH SCREEN DEVICE SETTINGS ERROR: " + error);
    }
  }

  const checkUser = () => {
    setTimeout(async () => {
      try {
        const ACCESS_TOKEN = await AsyncStorage.getItem("ACCESS_TOKEN");
        ACCESS_TOKEN === null ? navigation.replace("SignIn") : navigation.replace("DrawerNavigation");
      }
      catch (error){
        console.log("SPLASH SCREEN ERROR: " + error);
      }
    }, 1000)
  }

  return(
    <View style={[styles.container, {backgroundColor: colors.primaryBlue}]}>
      <StatusBar backgroundColor={colors.primaryBlue} barStyle="light-content"/>
      <Image
        style={styles.image}
        resizeMode="center"
        source={require("../../../assets/images/logo_white.png")}/>
    </View>
  )
}

export default Splash;
