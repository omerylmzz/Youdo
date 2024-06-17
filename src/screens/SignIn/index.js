import React, { useCallback, useContext, useRef, useState } from "react";
import { Image, SafeAreaView, ScrollView, View } from "react-native";
import styles from "./styles";
import PrimaryTextInput from "../../components/inputs/PrimaryTextInput";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import { useForm, Controller } from "react-hook-form";
import AlertNotification from "../../components/layouts/AlertNotification";
import serverErrorsData from "../../data/ServerErrorsData";
import client from "../../api/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useTranslation} from "react-i18next";
import { ThemeContext } from "../../theme/ThemeContext";
import { useTheme } from "@react-navigation/native";

const SignIn = ({navigation}) => {

  const ref = useRef(null);
  const [loading, setLoading] = useState(false);
  const [secureText, setSecureText] = useState(true);

  const { isDarkTheme } = useContext(ThemeContext);
  const {colors} = useTheme();

  const { t } = useTranslation();

  const [alertNotification, setAlertNotification] = useState({
    type: "",
    text: ""
  });

  const {
    control,
    handleSubmit,
    formState: { errors }} = useForm({
    defaultValues:{
      mail: "",
      password: ""
    },
  });

  const handleSignIn = useCallback((data) => {
    setLoading(true);
    setTimeout(async () => {
      try {
        const response = await client.post("/user/signin", {
          MAIL: data.mail.trim(),
          PASSWORD: data.password
        });

        if (response.data.SUCCESSFUL){
          setLoading(false);
          try {
            await AsyncStorage.setItem("ACCESS_TOKEN", response.data.ACCESS_TOKEN);
            await AsyncStorage.setItem("USER_DATA", JSON.stringify(response.data.DATA));
            navigation.replace("DrawerNavigation");
            console.log(data.mail.trim() + " successfully sign in");
          }
          catch (error){
            console.log("ASYNC STORAGE ERROR: " + error);
          }
        }
        else {
          setLoading(false);
          const Index = serverErrorsData.findIndex((item) => item.message === response.data.MESSAGE);
          const LANGUAGE = await AsyncStorage.getItem("LANGUAGE");
          setAlertNotification({type: "error", text: LANGUAGE === "English" ? serverErrorsData[Index].en : serverErrorsData[Index].tr});
          ref?.current?.showAlertNotification();
        }
      }
      catch (error){
        setLoading(false);
        console.log("SIGN IN ERROR: " + error);
        setAlertNotification({type: "error", text: "Something went wrong"});
        ref?.current?.showAlertNotification();
      }
    }, 2000);
  })


  return(
    <SafeAreaView style={[styles.container, {backgroundColor: colors.background}]}>
      <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: "center", alignItems: "center"}}>
        <Image
          style={styles.image}
          resizeMode="center"
          source={isDarkTheme ? require("../../../assets/images/logo_dark_blue.png") : require("../../../assets/images/logo_blue.png")}/>
        <Controller
          control={control}
          rules={{
            required: true
          }}
          render={({field: {onChange, onBlur, value} }) => (
            <PrimaryTextInput
              mode={false}
              placeholder={t("placeholder.mail")}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.mail}
            />
          )}
          name="mail"/>
        <Controller
          control={control}
          rules={{
            required: true
          }}
          render={({field: {onChange, onBlur, value} }) => (
            <PrimaryTextInput
              mode={false}
              placeholder={t("placeholder.password")}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.password}
              secureTextEntry={secureText}
              right={true}
              icon={secureText ? "eye-outline" : "eye-off-outline"}
              iconPress={() => setSecureText(prev => !prev)}/>
          )}
          name="password"/>
        <View style={styles.space}>
          <PrimaryButton
            mode={true}
            text={t("button.sign-in")}
            onPress={handleSubmit(handleSignIn)}
            loading={loading}
            disable={loading}
          />
          <PrimaryButton
            mode={false}
            text={t("button.sign-up")}
            onPress={() => navigation.navigate("SignUp")}/>
        </View>
      </ScrollView>
      <AlertNotification
        ref={ref}
        type={alertNotification.type}
        text={alertNotification.text}/>
    </SafeAreaView>
  )
}

export default SignIn;
