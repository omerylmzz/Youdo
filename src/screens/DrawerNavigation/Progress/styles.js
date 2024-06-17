import { StyleSheet } from "react-native";
import { horizontalScale, moderateScale, verticalScale } from "../../../helper/Metrics";

const styles = StyleSheet.create({
  container:{
    flex: 1
  },
  contentContainer:{
    paddingHorizontal: horizontalScale(8)
  },
  title:{
    fontWeight: "bold",
    fontSize: moderateScale(32),
  },
  description:{
    fontSize: moderateScale(16)
  },
  section:{
    fontWeight: "bold",
    fontSize: moderateScale(16),
    paddingVertical: verticalScale(12)
  }
})

export default styles;
