import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { defaultWidth, horizontalScale, moderateScale, verticalScale } from "../../helper/Metrics";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { lightColors } from "../styles/Colors";

const HomeHeader = ({leftIcon, leftPress, rightIcon, rightPress}) => {
  return(
    <View style={styles.container}>
      <View style={styles.button}>
        <Pressable style={{padding: moderateScale(4)}} onPress={leftPress} android_ripple={{color: lightColors.ripple}}>
          <Icon name={leftIcon} color={lightColors.icon} size={moderateScale(24)}/>
        </Pressable>
      </View>
      <View>
        <Image
          style={styles.image}
          resizeMode="center"
          source={require("../../../assets/images/logo_blue.png")}/>
      </View>
      <View style={styles.button}>
        <Pressable style={{padding: moderateScale(4)}} onPress={rightPress} android_ripple={{color: lightColors.ripple}}>
          <Icon name={rightIcon} color={lightColors.icon} size={moderateScale(24)}/>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flexDirection: "row",
    width: defaultWidth(1),
    height: verticalScale(60),
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: lightColors.background,
    paddingHorizontal: horizontalScale(4)
  },
  button:{
    overflow: "hidden",
    borderRadius: moderateScale(25),
  },
  image:{
    width: horizontalScale(100),
    height: verticalScale(50)
  }
})

export default HomeHeader;
