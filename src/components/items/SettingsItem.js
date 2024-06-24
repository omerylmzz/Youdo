import React from "react";
import { Pressable, StyleSheet, View, Text, Switch, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { horizontalScale, moderateScale, verticalScale } from "../../helper/Metrics";
import { useTheme } from "@react-navigation/native";

const SettingsItem = ({icon, image, label, link, value, type, onPress}) => {

  const { colors } = useTheme();

  return(
    <Pressable style={styles.container} onPress={onPress} android_ripple={{color: colors.ripple}}>
      <View style={styles.row}>
        {
          type === "edit" ?
            <Image
              style={[styles.image, {borderColor: colors.secondary}]}
              resizeMode="contain"
              source={image}/>
            :
            <Icon name={icon} color={colors.icon} size={moderateScale(20)}/>
        }
        <Text style={type === "edit" ? [styles.text, {color: colors.text}] : [styles.label, {color: colors.text}]}>
          {label}
        </Text>
      </View>
      <View>
        {
          type === "select" && (
            <View>
              <Icon name="chevron-right" color={colors.placeholder} size={moderateScale(24)}/>
            </View>
          )
        }
        {
          type === "link" && (
            <View style={{flexDirection: "row", alignItems: "center"}}>
              <Text style={[styles.link, {color: colors.placeholder}]}>
                {link}
              </Text>
              <Icon name="chevron-right" color={colors.placeholder} size={moderateScale(24)}/>
            </View>
          )
        }
        {
          type === "toggle" && (
            <View>
              <Switch
                value={value}
                trackColor={{true: colors.green, false: colors.placeholder}}
                thumbColor={colors.white}
              />
            </View>
          )
        }
      </View>
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
  row:{
    flexDirection: "row",
    alignItems: "center"
  },
  image:{
    width: horizontalScale(50),
    height: horizontalScale(50),
    borderRadius: moderateScale(5),
    borderWidth: 1
  },
  text:{
    fontWeight: "bold",
    fontSize: moderateScale(18),
    paddingHorizontal: horizontalScale(8)
  },
  label:{
    fontSize: moderateScale(14),
    paddingHorizontal: horizontalScale(8)
  },
  link:{
    fontSize: moderateScale(14)
  }
})

export default SettingsItem;
