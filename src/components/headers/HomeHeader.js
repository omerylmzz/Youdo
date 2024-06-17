import React, { useContext } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { defaultWidth, horizontalScale, moderateScale, verticalScale } from "../../helper/Metrics";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "@react-navigation/native";
import { ThemeContext } from "../../theme/ThemeContext";

const HomeHeader = ({leftIcon, leftPress, rightIcon, rightPress}) => {

  const { isDarkTheme } = useContext(ThemeContext);
  const { colors } = useTheme();

  return(
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <View style={styles.button}>
        <Pressable style={{padding: moderateScale(4)}} onPress={leftPress} android_ripple={{color: colors.ripple}}>
          <Icon name={leftIcon} color={colors.icon} size={moderateScale(24)}/>
        </Pressable>
      </View>
      <View>
        <Image
          style={styles.image}
          resizeMode="center"
          source={isDarkTheme ? require("../../../assets/images/logo_dark_blue.png") : require("../../../assets/images/logo_blue.png")}/>
      </View>
      <View style={styles.button}>
        <Pressable style={{padding: moderateScale(4)}} onPress={rightPress}>
          <Icon name={rightIcon} color={colors.background} size={moderateScale(24)}/>
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
