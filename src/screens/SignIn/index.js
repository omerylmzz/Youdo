import React from "react";
import { Image, View } from "react-native";
import styles from "./styles";
import PrimaryTextInput from "../../components/inputs/PrimaryTextInput";
import PrimaryButton from "../../components/buttons/PrimaryButton";

const SignIn = ({navigation}) => {
  return(
    <View style={styles.container}>
      <Image
        style={styles.image}
        resizeMode="center"
        source={require("../../../assets/images/logo_blue.png")}/>
      <PrimaryTextInput
        mode={false}
        placeholder="E-mail address"/>
      <PrimaryTextInput
        mode={false}
        placeholder="Password"
        right={true}
        icon="eye-outline"/>
      <View style={styles.space}>
        <PrimaryButton
          mode={true}
          text="Sign In"/>
        <PrimaryButton
          mode={false}
          text="Sign Up"
          onPress={() => navigation.navigate("SignUp")}
        />
      </View>
    </View>
  )
}

export default SignIn;
