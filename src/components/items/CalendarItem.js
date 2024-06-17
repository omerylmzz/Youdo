import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { defaultWidth, horizontalScale, moderateScale, verticalScale } from "../../helper/Metrics";
import { useTheme } from "@react-navigation/native";

const CalendarItem = ({day, month, name, selected, onPress}) => {

  const { colors } = useTheme();

  return(
    <TouchableOpacity style={[styles.container, {backgroundColor: selected ? colors.primaryBlue : colors.background, borderColor: selected ? colors.primaryBlue : colors.secondary}]} onPress={onPress} activeOpacity={0.5}>
      <View>
        <Text style={[styles.sText, {fontWeight: "bold", color: selected ? colors.white : colors.text}]}>
          {month}
        </Text>
      </View>
      <View style={{paddingVertical: verticalScale(12)}}>
        <Text style={[styles.mText, {color: selected ? colors.white : colors.text}]}>
          {day}
        </Text>
      </View>
      <View>
        <Text style={[styles.sText, {color: selected ? colors.white : colors.text}]}>
          {name}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container:{
    width: defaultWidth(0.18),
    height: verticalScale(100),
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: verticalScale(4),
    marginHorizontal: horizontalScale(4),
    borderRadius: moderateScale(5),
    borderWidth: 1
  },
  sText:{
    fontSize: moderateScale(12),
  },
  mText:{
    fontSize: moderateScale(24),
    fontWeight: "bold"
  }
})

export default CalendarItem;
