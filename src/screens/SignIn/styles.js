import { StyleSheet } from "react-native";
import { lightColors } from "../../components/styles/Colors";
import { horizontalScale, verticalScale } from "../../helper/Metrics";

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: lightColors.background
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
