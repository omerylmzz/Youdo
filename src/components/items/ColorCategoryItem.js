import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { horizontalScale, moderateScale } from "../../helper/Metrics";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "@react-navigation/native";

const ColorCategoryItem = ({selected, color, onPress}) => {

  const { colors } = useTheme();

  return(
    <TouchableOpacity style={[styles.container, {backgroundColor: color}]} onPress={onPress} activeOpacity={0.8}>
      {
        selected ?
          <View style={[styles.mask, {backgroundColor: colors.primaryBlue}]}>
            <Icon name="check" color={colors.white} size={moderateScale(20)}/>
          </View>
          :
          <></>
      }
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container:{
    overflow: "hidden",
    width: horizontalScale(30),
    height: horizontalScale(30),
    borderRadius: moderateScale(25),
    marginHorizontal: horizontalScale(4)
  },
  mask:{
    width: horizontalScale(30),
    height: horizontalScale(30),
    justifyContent: "center",
    alignItems: "center"
  }
})

export default ColorCategoryItem;
