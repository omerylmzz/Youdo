import React, { useEffect } from "react";
import { Image, StatusBar, View } from "react-native";
import styles from "./styles";
import { lightColors } from "../../components/styles/Colors";

const Splash = ({navigation}) => {

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = () => {
    setTimeout(() => {
      navigation.replace("SignIn");
    }, 1000)
  }

  return(
    <View style={styles.container}>
      <StatusBar backgroundColor={lightColors.primaryBlue} barStyle="light-content"/>
      <Image
        style={styles.image}
        resizeMode="center"
        source={require("../../../assets/images/logo_white.png")}/>
    </View>
  )
}

export default Splash;
