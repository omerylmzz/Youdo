import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { horizontalScale, moderateScale, verticalScale } from "../../helper/Metrics";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "@react-navigation/native";

const ChangeSettingsItem = ({label, selected, onPress}) => {

  const { colors } = useTheme();

  return(
    <Pressable style={styles.container} onPress={onPress} android_ripple={{color: colors.ripple}}>
      <Text style={[styles.label, {color: colors.text}]}>
        {label}
      </Text>
      <Icon name={selected ? "radiobox-marked" : "radiobox-blank"} color={colors.primaryBlue} size={moderateScale(16)}/>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container:{
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: verticalScale(12),
    paddingHorizontal: horizontalScale(8)
  },
  label:{
    fontSize: moderateScale(14)
  },
})

export default ChangeSettingsItem;
