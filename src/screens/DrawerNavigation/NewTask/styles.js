import { StyleSheet } from "react-native";
import { lightColors } from "../../../components/styles/Colors";
import { horizontalScale, moderateScale, verticalScale } from "../../../helper/Metrics";

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: lightColors.background,
    alignItems: "center"
  },
  row:{
    flexDirection: "row",
    width: horizontalScale(350),
    justifyContent: "space-between",
    alignItems: "center"
  },
  title:{
    fontWeight: "bold",
    fontSize: moderateScale(14),
    color: lightColors.title,
    paddingVertical: verticalScale(8)
  },
  text:{
    fontSize: moderateScale(14),
    color: lightColors.text,
    paddingVertical: verticalScale(8)
  }
})

export default styles;
