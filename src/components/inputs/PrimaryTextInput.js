import React from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { lightColors } from "../styles/Colors";
import { horizontalScale, moderateScale, verticalScale } from "../../helper/Metrics";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const PrimaryTextInput = ({mode, title, placeholder, value, onChangeText, secureTextEntry, multiline, right, icon, iconPress}) => {
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
      <View style={[styles.container, {maxHeight: verticalScale(100), marginBottom: mode ? verticalScale(4) : verticalScale(16)}]}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={lightColors.placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          multiline={multiline}/>
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
    justifyContent: "space-between",
    alignItems: "center",
    width: horizontalScale(350),
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
  input:{
    flex: 1,
    fontSize: moderateScale(14),
    color: lightColors.text
  }
})

export default PrimaryTextInput;
