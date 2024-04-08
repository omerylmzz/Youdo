import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ScrollView, StatusBar, Text, View } from "react-native";
import styles from "./styles";
import LottieView from 'lottie-react-native';
import { lightColors } from "../../components/styles/Colors";
import PrimaryTextInput from "../../components/inputs/PrimaryTextInput";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import { verticalScale } from "../../helper/Metrics";

const SignUp = ({navigation}) => {

  const animationRef = useRef(null);
  const [secureText, setSecureText] = useState(true);

  useEffect(() => {
    setInterval(() => {
      animationRef?.current?.play();
    }, 4000)
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>
              Create Account
            </Text>
            <Text style={styles.description}>
              Please enter your details
            </Text>
          </View>
          <LottieView
            ref={animationRef}
            style={styles.animation}
            source={require("../../../assets/animations/U6RjLlBv7o.json")}
            loop={false}/>
        </View>
      )
    })
  }, []);

  return(
    <View style={styles.container}>
      <StatusBar backgroundColor={lightColors.primaryBlue} barStyle="light-content"/>
      <ScrollView style={{paddingVertical: verticalScale(12)}} showsVerticalScrollIndicator={false}>
        <PrimaryTextInput
          mode={false}
          placeholder="Name"/>
        <PrimaryTextInput
          mode={false}
          placeholder="Surname"
        />
        <PrimaryTextInput
          mode={false}
          placeholder="E-mail address"
        />
        <PrimaryTextInput
          mode={false}
          placeholder="Password"
          secureTextEntry={secureText}
          right={true}
          icon="eye-outline"
          iconPress={() => setSecureText(item => !item)}
        />
        <View style={styles.space}>
          <PrimaryButton
            mode={true}
            text="Sign Up"
          />
          <PrimaryButton
            mode={false}
            text="Back"
            onPress={() => navigation.goBack()}
          />
        </View>
      </ScrollView>
    </View>
  )
}

export default SignUp;
