import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { defaultWidth, horizontalScale, moderateScale, verticalScale } from "../../helper/Metrics";
import { lightColors } from "../styles/Colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const TaskItem = ({label, title, task, time}) => {
  return(
    <View style={styles.container}>
      <View style={[styles.label, {backgroundColor: label}]}/>
      <View style={styles.layout}>
        <View style={styles.row}>
          <Text style={styles.title}>
            {title}
          </Text>
          <Text style={styles.description}>
            {time}
          </Text>
        </View>
        <View style={[styles.row, {paddingVertical: verticalScale(4)}]}>
          <Text style={styles.text}>
            {task}
          </Text>
          <TouchableOpacity activeOpacity={0.5}>
            <Icon name="radiobox-blank" color={lightColors.green} size={moderateScale(16)}/>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    flexDirection: "row",
    overflow: "hidden",
    borderRadius: moderateScale(5),
    marginVertical: verticalScale(4)
  },
  label:{
    width: horizontalScale(12)
  },
  layout:{
    flex: 1,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderColor: lightColors.secondary,
    padding: moderateScale(8)
  },
  row:{
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  title:{
    fontWeight: "bold",
    fontSize: moderateScale(14),
    color: lightColors.title
  },
  text:{
    fontSize: moderateScale(12),
    color: lightColors.text,
    maxWidth: defaultWidth(0.8)
  },
  description:{
    fontSize: moderateScale(10),
    color: lightColors.description
  }
})

export default TaskItem;
