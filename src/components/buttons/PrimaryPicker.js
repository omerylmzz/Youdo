import React from "react";
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { horizontalScale, moderateScale, verticalScale } from "../../helper/Metrics";
import { lightColors } from "../styles/Colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const PrimaryPicker = ({mode, title, placeholder, right, icon, onPress}) => {
  return(
    <Pressable onPress={onPress}>
      {
        mode ?
          <Text style={styles.title}>
            {title}
          </Text>
          :
          <></>
      }
      <View style={[styles.container, {marginBottom: mode ? verticalScale(4) : verticalScale(16)}]}>
        <Text style={styles.placeholder}>
          {placeholder}
        </Text>
        {
          right ?
            <Icon name={icon} color={lightColors.placeholder} size={moderateScale(24)}/>
            :
            <></>
        }
      </View>
    </Pressable>
  )
}
const styles = StyleSheet.create({
  container:{
    flexDirection: "row",
    width: horizontalScale(160),
    height: verticalScale(50),
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: lightColors.input,
    borderRadius: moderateScale(5),
    paddingHorizontal: horizontalScale(12),
  },
  title:{
    fontWeight: "bold",
    fontSize: moderateScale(14),
    color: lightColors.title,
    paddingVertical: verticalScale(8)
  },
  placeholder:{
    fontSize: moderateScale(14),
    color: lightColors.text
  }
})

export default PrimaryPicker;
