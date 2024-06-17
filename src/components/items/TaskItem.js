import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { defaultWidth, horizontalScale, moderateScale, verticalScale } from "../../helper/Metrics";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Animated, { FadeIn } from "react-native-reanimated";
import { useTheme } from "@react-navigation/native";

const TaskItem = ({title, task, time, label, deletable, completed, onPress, index}) => {

  const { colors } = useTheme();

  return(
    <Animated.View entering={FadeIn.delay(200 * index)} style={styles.container}>
      <View style={[styles.label, {backgroundColor: completed ? colors.placeholder : label}]}/>
      <View style={[styles.layout, {backgroundColor: colors.background, borderColor: colors.secondary}]}>
        <View style={styles.row}>
          <Text style={[styles.title, {color: colors.title}]} numberOfLines={1}>
            {title}
          </Text>
          <Text style={[styles.description, {color: colors.description}]}>
            {time}
          </Text>
        </View>
        <View style={[styles.row, {paddingVertical: verticalScale(4)}]}>
          <Text style={[styles.text, {color: colors.text, textDecorationLine: completed ? "line-through" : "none"}]}>
            {task}
          </Text>
          <TouchableOpacity onPress={onPress} activeOpacity={0.5}>
            <Icon name={deletable ? "trash-can-outline" : completed ? "check-circle" : "radiobox-blank"} color={deletable ? colors.red : colors.green} size={moderateScale(16)}/>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
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
    width: horizontalScale(10)
  },
  layout:{
    flex: 1,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    padding: moderateScale(8)
  },
  row:{
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  title:{
    fontWeight: "bold",
    fontSize: moderateScale(14)
  },
  text:{
    fontSize: moderateScale(12),
    maxWidth: defaultWidth(0.8)
  },
  description:{
    fontSize: moderateScale(10)
  }
})

export default TaskItem;
