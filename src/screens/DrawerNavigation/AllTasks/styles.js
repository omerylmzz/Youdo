import { StyleSheet } from "react-native";
import { horizontalScale, moderateScale, verticalScale } from "../../../helper/Metrics";

const styles = StyleSheet.create({
  container:{
    flex: 1
  },
  flatList:{
    flexGrow: 0,
    paddingVertical: verticalScale(16)
  },
  section:{
    paddingHorizontal: horizontalScale(8)
  },
  title:{
    fontWeight: "bold",
    fontSize: moderateScale(16),
  },
  image:{
    width: horizontalScale(200),
    height: horizontalScale(400),
  },
  modal:{
    width: horizontalScale(300),
    borderRadius: moderateScale(5),
    padding: moderateScale(8)
  },
  modalAnimationFrame:{
    justifyContent: "center",
    alignItems: "center",
    borderRadius: moderateScale(5)
  },
  animation:{
    width: horizontalScale(120),
    height: horizontalScale(120)
  },
  modalText:{
    fontSize: moderateScale(18),
    fontWeight: "bold",
    alignSelf: "center",
    paddingVertical: verticalScale(8)
  },
  modalButton:{
    justifyContent: "center",
    alignItems: "center",
    borderRadius: moderateScale(5),
    paddingVertical: verticalScale(12),
    marginTop: verticalScale(8)
  },
  modalButtonText:{
    fontWeight: "bold"
  }
})

export default styles;
