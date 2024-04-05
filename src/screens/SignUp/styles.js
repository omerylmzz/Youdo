import { StyleSheet } from "react-native";
import { lightColors } from "../../components/styles/Colors";
import { defaultWidth, horizontalScale, moderateScale, verticalScale } from "../../helper/Metrics";

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: "center",
    backgroundColor: lightColors.background,
    paddingVertical: verticalScale(4)
  },
  header:{
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: defaultWidth,
    height: verticalScale(100),
    backgroundColor: lightColors.primaryBlue,
    paddingHorizontal: horizontalScale(8)
  },
  title:{
    fontWeight: "bold",
    fontSize: moderateScale(32),
    color: lightColors.white
  },
  description:{
    fontSize: moderateScale(14),
    color: lightColors.white
  },
  animation:{
    width: horizontalScale(75),
    height: horizontalScale(75)
  },
  space:{
    paddingVertical: verticalScale(16)
  }
})

export default styles;
