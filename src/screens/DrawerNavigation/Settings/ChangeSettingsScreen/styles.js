import { StyleSheet } from "react-native";
import { horizontalScale, moderateScale, verticalScale } from "../../../../helper/Metrics";

const styles = StyleSheet.create({
  container:{
    flex: 1
  },
  section:{
    borderRadius: moderateScale(5),
    marginVertical: verticalScale(4),
    marginHorizontal: horizontalScale(8),
    paddingVertical: verticalScale(4),
    borderWidth: 1
  },
  body:{
    paddingHorizontal: horizontalScale(12),
    paddingVertical: verticalScale(12)
  },
  title:{
    fontWeight: "bold",
    fontSize: moderateScale(20)
  },
})

export default styles;
