import React, { useState } from "react";
import { Image, View } from "react-native";
import styles from "./styles";
import PrimaryTextInput from "../../components/inputs/PrimaryTextInput";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import { useForm, Controller } from "react-hook-form";

const SignIn = ({navigation}) => {

  const [secureText, setSecureText] = useState(true);

  const {
    control,
    handleSubmit,
    formState: { errors }} = useForm({
    defaultValues:{
      email: "",
      password: ""
    },
  });

  const handleSignIn = (data) => {
    navigation.navigate("DrawerNavigation");
  }

  return(
    <View style={styles.container}>
      <Image
        style={styles.image}
        resizeMode="center"
        source={require("../../../assets/images/logo_blue.png")}/>
      <Controller
        control={control}
        rules={{
          required: true
        }}
        render={({field: {onChange, onBlur, value} }) => (
          <PrimaryTextInput
            mode={false}
            placeholder="E-mail address"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.email}
          />
        )}
        name="email"/>
      <Controller
        control={control}
        rules={{
          required: true
        }}
        render={({field: {onChange, onBlur, value} }) => (
          <PrimaryTextInput
            mode={false}
            placeholder="Password"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.password}
            secureTextEntry={secureText}
            right={true}
            icon="eye-outline"
            iconPress={() => setSecureText(item => !item)}/>
        )}
        name="password"/>
      <View style={styles.space}>
        <PrimaryButton
          mode={true}
          text="Sign In"
          onPress={handleSubmit(handleSignIn)}/>
        <PrimaryButton
          mode={false}
          text="Sign Up"
          onPress={() => navigation.navigate("SignUp")}/>
      </View>
    </View>
  )
}

export default SignIn;
