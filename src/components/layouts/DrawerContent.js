import React from "react";
import { View, StyleSheet, Pressable, Text, Image } from "react-native";
import {DrawerContentScrollView, DrawerItemList} from "@react-navigation/drawer";
import { lightColors } from "../styles/Colors";
import { defaultWidth, horizontalScale, moderateScale, verticalScale } from "../../helper/Metrics";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const DrawerContent = (props) => {
  return(
    <DrawerContentScrollView contentContainerStyle={{flex: 1}} scrollEnabled={true}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            style={styles.image}
            resizeMode="center"
            source={require("../../../assets/images/default_profile_logo.jpg")}/>
          <View style={{paddingVertical: verticalScale(8)}}>
            <Text style={styles.text}>
              Name Surname
            </Text>
            <Text style={styles.description}>
              example@gmail.com
            </Text>
          </View>
        </View>
        <DrawerItemList {...props}/>
      </View>
      <View style={styles.footer}>
        <Pressable style={{flexDirection: "row", alignItems: "center"}}>
          <Icon name="logout" color={lightColors.primaryBlue} size={moderateScale(24)}/>
          <Text style={styles.footerText}>
            Sign Out
          </Text>
        </Pressable>
      </View>
    </DrawerContentScrollView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  header:{
    width: defaultWidth,
    height: verticalScale(150),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: lightColors.primaryBlue
  },
  image:{
    width: horizontalScale(50),
    height: horizontalScale(50),
    borderRadius: moderateScale(25)
  },
  text:{
    fontWeight: "bold",
    fontSize: moderateScale(18),
    alignSelf: "center",
    color: lightColors.white
  },
  description:{
    fontSize: moderateScale(10),
    alignSelf: "center",
    color: lightColors.white
  },
  footer:{
    paddingVertical: verticalScale(12),
    paddingHorizontal: horizontalScale(12)
  },
  footerText:{
    fontWeight: "bold",
    fontSize: moderateScale(14),
    color: lightColors.primaryBlue,
    paddingHorizontal: horizontalScale(12)
  }
})

export default DrawerContent;
