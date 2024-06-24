import React from "react";
import { Pressable, StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { defaultWidth, horizontalScale, moderateScale, verticalScale } from "../../helper/Metrics";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "@react-navigation/native";

const PrimaryHeader = ({mode, loading, title, leftIcon, leftPress, rightIcon, rightPress}) => {

  const { colors } = useTheme();

  return(
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <View style={styles.button}>
        <Pressable style={{padding: moderateScale(4)}} onPress={leftPress} android_ripple={{color: colors.ripple}}>
          <Icon name={leftIcon} color={colors.icon} size={moderateScale(24)}/>
        </Pressable>
      </View>
      <View>
        <Text style={[styles.title, {color: colors.title}]}>
          {title}
        </Text>
      </View>
      {
        mode ?
          <View style={styles.button}>
            {
              loading ?
                <View style={{paddingHorizontal: horizontalScale(6)}}>
                  <ActivityIndicator size="small" color={colors.icon} animating={loading}/>
                </View>
                :
                <Pressable style={{padding: moderateScale(4)}} onPress={rightPress} android_ripple={{color: colors.ripple}}>
                  <Icon name={rightIcon} color={colors.icon} size={moderateScale(24)}/>
                </Pressable>
            }
          </View>
          :
          <View style={{paddingHorizontal: horizontalScale(8)}}/>
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
    paddingHorizontal: horizontalScale(4)
  },
  button:{
    overflow: "hidden",
    borderRadius: moderateScale(25),
  },
  title:{
    fontWeight: "bold",
    fontSize: moderateScale(24)
  }
})

export default PrimaryHeader;
