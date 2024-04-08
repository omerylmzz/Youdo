import React from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, TouchableWithoutFeedback } from "react-native";
import { lightColors } from "../styles/Colors";
import { horizontalScale, moderateScale, verticalScale } from "../../helper/Metrics";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

const PrimaryButton = ({mode, text, loading, onPress}) => {

  const scaleOffset = useSharedValue(1);

  const pressIn = () => scaleOffset.value = 0.96;

  const pressOut = () => scaleOffset.value = 1;

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{scale: withSpring(scaleOffset.value, {damping: 50})}]
    }
  })

  return(
    <Animated.View style={[animatedStyles]}>
      <Pressable style={[styles.container, {backgroundColor: mode ? lightColors.primaryBlue : lightColors.background, borderWidth: mode ? 0 : 1}]} onPress={onPress} onPressIn={pressIn} onPressOut={pressOut}>
        {
          loading ?
            <ActivityIndicator size="small" color={mode ? lightColors.white : lightColors.primaryBlue} animating={loading}/>
            :
            <Text style={[styles.text, {color: mode ? lightColors.white : lightColors.primaryBlue}]}>
              {text}
            </Text>
        }
      </Pressable>
    </Animated.View>
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
