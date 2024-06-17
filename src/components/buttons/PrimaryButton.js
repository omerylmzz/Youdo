import React, { useContext } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";
import { horizontalScale, moderateScale, verticalScale } from "../../helper/Metrics";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { useTheme } from "@react-navigation/native";
import { ThemeContext } from "../../theme/ThemeContext";

const PrimaryButton = ({mode, text, loading, disable, onPress}) => {

  const scaleOffset = useSharedValue(1);

  const { isDarkTheme } = useContext(ThemeContext);
  const { colors } = useTheme();

  const pressIn = () => scaleOffset.value = 0.96;

  const pressOut = () => scaleOffset.value = 1;

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{scale: withSpring(scaleOffset.value, {damping: 50})}]
    }
  })

  return(
    <Animated.View style={[animatedStyles]}>
      <Pressable style={[styles.container, {backgroundColor: mode ? colors.primaryBlue : colors.white, borderWidth: mode ? 0 : isDarkTheme ? 0 : 1, borderColor: colors.primaryBlue}]} disabled={disable} onPress={onPress} onPressIn={pressIn} onPressOut={pressOut}>
        {
          loading ?
            <ActivityIndicator size="small" color={mode ? colors.white : colors.primaryBlue} animating={loading}/>
            :
            <Text style={[styles.text, {color: mode ? colors.white : colors.primaryBlue}]}>
              {text}
            </Text>
        }
      </Pressable>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container:{
    width: horizontalScale(350),
    height: verticalScale(50),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: moderateScale(5),
    marginBottom: verticalScale(16)
  },
  text:{
    fontWeight: "bold",
    fontSize: moderateScale(18)
  }
})

export default PrimaryButton;
