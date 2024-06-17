import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { horizontalScale, moderateScale, verticalScale } from "../../helper/Metrics";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "@react-navigation/native";

const PrimaryPicker = ({mode, title, placeholder, right, icon, onPress}) => {

  const { colors } = useTheme();

  return(
    <Pressable onPress={onPress}>
      {
        mode ?
          <Text style={[styles.title, {color: colors.title}]}>
            {title}
          </Text>
          :
          <></>
      }
      <View style={[styles.container, {backgroundColor: colors.input, marginBottom: mode ? verticalScale(4) : verticalScale(16)}]}>
        <Text style={[styles.placeholder, {color: colors.text}]}>
          {placeholder}
        </Text>
        {
          right ?
            <Icon name={icon} color={colors.placeholder} size={moderateScale(24)}/>
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
    borderRadius: moderateScale(5),
    paddingHorizontal: horizontalScale(12),
  },
  title:{
    fontWeight: "bold",
    fontSize: moderateScale(14),
    paddingVertical: verticalScale(8)
  },
  placeholder:{
    fontSize: moderateScale(14)
  }
})

export default PrimaryPicker;
