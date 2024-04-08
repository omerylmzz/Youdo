import React from "react";
import { Pressable, StyleSheet, View, Text } from "react-native";
import { defaultWidth, horizontalScale, moderateScale, verticalScale } from "../../helper/Metrics";
import { lightColors } from "../styles/Colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const PrimaryHeader = ({mode, title, leftIcon, leftPress, rightIcon, rightPress}) => {
  return(
    <View style={styles.container}>
      <View style={styles.button}>
        <Pressable style={{padding: moderateScale(4)}} onPress={leftPress} android_ripple={{color: lightColors.ripple}}>
          <Icon name={leftIcon} color={lightColors.icon} size={moderateScale(24)}/>
        </Pressable>
      </View>
      <View>
        <Text style={styles.title}>
          {title}
        </Text>
      </View>
      {
        mode ?
          <View style={styles.button}>
            <Pressable style={{padding: moderateScale(4)}} onPress={rightPress} android_ripple={{color: lightColors.ripple}}>
              <Icon name={rightIcon} color={lightColors.icon} size={moderateScale(24)}/>
            </Pressable>
          </View>
          :
          <View style={{paddingHorizontal: moderateScale(8)}}/>
      }
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
  title:{
    fontWeight: "bold",
    fontSize: moderateScale(24),
    color: lightColors.title
  }
})

export default PrimaryHeader;
