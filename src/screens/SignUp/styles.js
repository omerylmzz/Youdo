import { StyleSheet } from "react-native";
import { defaultWidth, horizontalScale, moderateScale, verticalScale } from "../../helper/Metrics";

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: "center",
    paddingVertical: verticalScale(4)
  },
  header:{
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: defaultWidth,
    height: verticalScale(100),
    paddingHorizontal: horizontalScale(8)
  },
  title:{
    fontWeight: "bold",
    fontSize: moderateScale(32)
  },
  description:{
    fontSize: moderateScale(14)
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
