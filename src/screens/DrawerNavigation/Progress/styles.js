import { StyleSheet } from "react-native";
import { lightColors } from "../../../components/styles/Colors";
import { defaultWidth, horizontalScale, moderateScale, verticalScale } from "../../../helper/Metrics";

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: lightColors.background
  },
  contentContainer:{
    paddingHorizontal: horizontalScale(8)
  },
  title:{
    fontWeight: "bold",
    fontSize: moderateScale(32),
    color: lightColors.title
  },
  description:{
    fontSize: moderateScale(16),
    color: lightColors.text
  },
  section:{
    fontWeight: "bold",
    fontSize: moderateScale(16),
    color: lightColors.title
  }
})

export default styles;
