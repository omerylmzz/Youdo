import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { lightColors } from "../styles/Colors";
import { horizontalScale, moderateScale, verticalScale } from "../../helper/Metrics";

const PrimaryButton = ({mode, text, onPress}) => {
  return(
    <Pressable style={[styles.container, {backgroundColor: mode ? lightColors.primaryBlue : lightColors.background, borderWidth: mode ? 0 : 1}]} onPress={onPress}>
      <Text style={[styles.text, {color: mode ? lightColors.white : lightColors.primaryBlue}]}>
        {text}
      </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: lightColors.primaryBlue,
    width: horizontalScale(350),
    height: verticalScale(50),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: moderateScale(5),
    borderColor: lightColors.primaryBlue,
    marginBottom: verticalScale(16)
  },
  text:{
    fontWeight: "bold",
    fontSize: moderateScale(18),
    color: lightColors.white
  }
})

export default PrimaryButton;
