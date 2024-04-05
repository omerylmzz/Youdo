import {Dimensions} from "react-native";

const { width, height } = Dimensions.get("window");

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;
const factor = 0.5;

const horizontalScale = (size) => (width / guidelineBaseWidth) * size;
const verticalScale = (size) => (height / guidelineBaseHeight) * size;
const moderateScale = (size) => size + (horizontalScale(size) - size) * factor;

const defaultWidth = () => width;

export { horizontalScale, verticalScale, moderateScale, defaultWidth};
