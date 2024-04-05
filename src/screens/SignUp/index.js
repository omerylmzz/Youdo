import React, { useEffect, useLayoutEffect, useRef } from "react";
import { ScrollView, StatusBar, Text, View } from "react-native";
import styles from "./styles";
import LottieView from 'lottie-react-native';
import { lightColors } from "../../components/styles/Colors";
import PrimaryTextInput from "../../components/inputs/PrimaryTextInput";
import PrimaryButton from "../../components/buttons/PrimaryButton";

const SignUp = ({navigation}) => {

  const animationRef = useRef(null);

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
      <ScrollView showsVerticalScrollIndicator={false}>
        <PrimaryTextInput
          mode={true}
          title="Name"
          placeholder="Name"/>
        <PrimaryTextInput
          mode={true}
          title="Surname"
          placeholder="Surname"
        />
        <PrimaryTextInput
          mode={true}
          title="E-mail address"
          placeholder="E-mail address"
        />
        <PrimaryTextInput
          mode={true}
          title="Password"
          placeholder="Password"
          right={true}
          icon="eye-outline"
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
