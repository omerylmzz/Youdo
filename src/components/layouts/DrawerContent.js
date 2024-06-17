import React, { useEffect, useState } from "react";
import { View, StyleSheet, Pressable, Text, Image } from "react-native";
import {DrawerContentScrollView, DrawerItemList} from "@react-navigation/drawer";
import { horizontalScale, moderateScale, verticalScale } from "../../helper/Metrics";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";
import { useTheme } from "@react-navigation/native";

const DrawerContent = (props) => {

  const [userData, setUserData] = useState({});

  const { colors } = useTheme();

  const {t} = useTranslation();

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const data = JSON.parse(await AsyncStorage.getItem("USER_DATA"));
      setUserData(data);
    }
    catch (error){
      console.log("FETCH USER DATA ERROR: " + error);
    }
  }
  const signOut = async () => {
    try {
      await AsyncStorage.setItem("ACCESS_TOKEN", "");
      await AsyncStorage.setItem("USER_DATA", "");
      props.navigation.replace("SignIn");
      console.log(userData.MAIL + " successfully sign out");
    }
    catch (error){
      console.log("SIGN OUT ERROR: " + error);
    }
  }

  return(
    <DrawerContentScrollView contentContainerStyle={{flex: 1}} scrollEnabled={true}>
      <View style={styles.container}>
        <View style={[styles.header, {backgroundColor: colors.primaryBlue}]}>
          <Image
            style={styles.image}
            resizeMode="center"
            source={require("../../../assets/images/default_profile_logo.jpg")}/>
          <View style={{paddingVertical: verticalScale(8)}}>
            <Text style={[styles.text, {color: colors.white}]}>
              {userData.NAME} {userData.SURNAME}
            </Text>
            <Text style={[styles.description, {color: colors.white}]}>
              {userData.MAIL}
            </Text>
          </View>
        </View>
        <DrawerItemList {...props}/>
      </View>
      <View style={styles.footer}>
        <Pressable style={{flexDirection: "row", alignItems: "center"}} onPress={signOut}>
          <Icon name="logout" color={colors.tint} size={moderateScale(24)}/>
          <Text style={[styles.footerText, {color: colors.tint}]}>
            {t("drawer.sign-out")}
          </Text>
        </Pressable>
      </View>
    </DrawerContentScrollView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1
  },
  header:{
    width: "100%",
    height: verticalScale(150),
    justifyContent: "center",
    alignItems: "center"
  },
  image:{
    width: horizontalScale(50),
    height: horizontalScale(50),
    borderRadius: moderateScale(25)
  },
  text:{
    fontWeight: "bold",
    fontSize: moderateScale(18),
    alignSelf: "center"
  },
  description:{
    fontSize: moderateScale(10),
    alignSelf: "center"
  },
  footer:{
    paddingVertical: verticalScale(12),
    paddingHorizontal: horizontalScale(12)
  },
  footerText:{
    fontWeight: "bold",
    fontSize: moderateScale(14),
    paddingHorizontal: horizontalScale(12)
  }
})

export default DrawerContent;
