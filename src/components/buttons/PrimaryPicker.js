import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { horizontalScale, moderateScale, verticalScale } from "../../helper/Metrics";
import { lightColors } from "../styles/Colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const PrimaryPicker = ({mode, title, placeholder, right, icon, iconPress}) => {
  return(
    <View>
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
            <TouchableOpacity onPress={iconPress} activeOpacity={0.5}>
              <Icon name={icon} color={lightColors.placeholder} size={moderateScale(24)}/>
            </TouchableOpacity>
            :
            <></>
        }
      </View>
    </View>
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
    color: lightColors.placeholder
  }
})

export default PrimaryPicker;
