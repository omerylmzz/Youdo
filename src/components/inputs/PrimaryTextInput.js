import React from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { horizontalScale, moderateScale, verticalScale } from "../../helper/Metrics";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "@react-navigation/native";


const PrimaryTextInput = ({mode, error, title, placeholder, value, onChangeText, onBlur, secureTextEntry, multiline, right, icon, iconPress}) => {

  const { colors } = useTheme();

  return(
    <View>
      {
        mode ?
          <Text style={[styles.title, {color: colors.title}]}>
            {title}
          </Text>
          :
          <></>
      }
      <View style={[styles.container, {backgroundColor: colors.input, maxHeight: verticalScale(100), borderColor: error ? colors.red : colors.input, marginBottom: mode ? verticalScale(4) : verticalScale(16)}]}>
        <TextInput
          style={[styles.input, {color: colors.text}]}
          placeholder={placeholder}
          placeholderTextColor={colors.placeholder}
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          secureTextEntry={secureTextEntry}
          multiline={multiline}/>
        {
          right ?
            <TouchableOpacity onPress={iconPress} activeOpacity={0.5}>
              <Icon name={icon} color={colors.placeholder} size={moderateScale(24)}/>
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
    width: horizontalScale(350),
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: moderateScale(5),
    borderWidth: 1,
    paddingHorizontal: horizontalScale(12),
  },
  title:{
    fontWeight: "bold",
    fontSize: moderateScale(14),
    paddingVertical: verticalScale(8)
  },
  input:{
    flex: 1,
    fontSize: moderateScale(14)
  }
})

export default PrimaryTextInput;
