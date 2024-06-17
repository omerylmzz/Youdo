import { StyleSheet } from "react-native";
import { horizontalScale, verticalScale } from "../../helper/Metrics";

const styles = StyleSheet.create({
  container:{
    flex: 1
  },
  image:{
    width: horizontalScale(200),
    height: verticalScale(120),
  },
  space:{
    paddingVertical: verticalScale(16)
  }
})

export default styles;
