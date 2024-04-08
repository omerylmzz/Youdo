import React, { useState } from "react";
import { Image, View } from "react-native";
import styles from "./styles";
import PrimaryTextInput from "../../components/inputs/PrimaryTextInput";
import PrimaryButton from "../../components/buttons/PrimaryButton";

const SignIn = ({navigation}) => {

  const [secureText, setSecureText] = useState(true);

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
        secureTextEntry={secureText}
        right={true}
        icon="eye-outline"
        iconPress={() => setSecureText(item => !item)}/>
      <View style={styles.space}>
        <PrimaryButton
          mode={true}
          text="Sign In"
          onPress={() => navigation.navigate("DrawerNavigation")}/>
        <PrimaryButton
          mode={false}
          text="Sign Up"
          onPress={() => navigation.navigate("SignUp")}/>
      </View>
    </View>
  )
}

export default SignIn;
