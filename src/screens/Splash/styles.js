import { StyleSheet } from "react-native";
import { horizontalScale } from "../../helper/Metrics";

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  image:{
    width: horizontalScale(200),
    height: horizontalScale(100)
  }
})

export default styles;
