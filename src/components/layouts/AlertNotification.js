import React, { forwardRef, useCallback, useImperativeHandle } from "react";
import { StyleSheet, Text } from "react-native";
import { defaultWidth, moderateScale, verticalScale } from "../../helper/Metrics";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useTheme } from "@react-navigation/native";

const AlertNotification = forwardRef( ({type, text}, ref) => {

  const translateY = useSharedValue(0);
  const { colors } = useTheme();

  useImperativeHandle(ref, () => ({showAlertNotification}), [showAlertNotification]);

  const showAlertNotification = useCallback(() => {
    if (translateY.value === 0){
      translateY.value -= verticalScale(25);
      setTimeout(() => {
        translateY.value += verticalScale(25);
      }, 2000);
    }
  });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: type === "error" ? colors.red : colors.green,
      transform: [{translateY: withTiming(translateY.value)}]
    }
  });

  return(
    <Animated.View style={[styles.container, animatedStyles]}>
      <Text style={[styles.text, {color: colors.white}]}>
        {text}
      </Text>
    </Animated.View>
  )
})

const styles = StyleSheet.create({
  container:{
    position: "absolute",
    bottom: -verticalScale(25),
    width: defaultWidth(1),
    height: verticalScale(25),
    justifyContent: "center",
    alignItems: "center"
  },
  text:{
    fontSize: moderateScale(14)
  }
})

export default AlertNotification;
