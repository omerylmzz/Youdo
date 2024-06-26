import React, { useCallback, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { ScrollView, StatusBar, Text, View } from "react-native";
import styles from "./styles";
import LottieView from 'lottie-react-native';
import PrimaryTextInput from "../../components/inputs/PrimaryTextInput";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import { verticalScale } from "../../helper/Metrics";
import { useForm, Controller } from "react-hook-form";
import AlertNotification from "../../components/layouts/AlertNotification";
import client from "../../api/client";
import serverErrorsData from "../../data/ServerErrorsData";
import {useTranslation} from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeContext } from "../../theme/ThemeContext";
import { useTheme } from "@react-navigation/native";

const SignUp = ({navigation}) => {
  // Theme Variables
  const { isDarkTheme } = useContext(ThemeContext);
  const { colors } = useTheme();
  //Language Variable
  const {t} = useTranslation();
  // Lottie Ref
  const animationRef = useRef(null);
  // Alert Notification Ref
  const alertNotificationRef = useRef(null);
  // Alert Notification State
  const [alertNotification, setAlertNotification] = useState({
      type: "",
      text: ""
  });
  // State that controls the loading of the button
  const [loading, setLoading] = useState(false);
  // State that controls the password input
  const [secureText, setSecureText] = useState(true);
  // Redux Hook Form Variables
  const {
    control,
    handleSubmit,
    formState: { errors }} = useForm({
    defaultValues:{
      name: "",
      surname: "",
      mail: "",
      password: ""
    },
  });

  useEffect(() => {
    setInterval(() => {
      animationRef?.current?.play();
    }, 4000)
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <View style={[styles.header, {backgroundColor: colors.primaryBlue}]}>
          <View>
            <Text style={[styles.title, {color: colors.white}]}>
              {t("title.sign-up")}
            </Text>
            <Text style={[styles.description, {color: colors.white}]}>
              {t("description.sign-up")}
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

  const handleSignUp = useCallback((data) => {
    setLoading(true);
    setTimeout(async () => {
      try {
        const response = await client.post("user/signup", {
          NAME: data.name,
          SURNAME: data.surname,
          MAIL: data.mail.trim().toLowerCase(),
          PASSWORD: data.password
        });

        if (response.data.SUCCESSFUL){
          setLoading(false);
          navigation.replace("SignIn");
        }
        else {
          setLoading(false);
          const Index = serverErrorsData.findIndex((item) => item.message === response.data.MESSAGE);
          const LANGUAGE = await AsyncStorage.getItem("LANGUAGE");
          setAlertNotification({type: "error", text: LANGUAGE === "English" ? serverErrorsData[Index].en : serverErrorsData[Index].tr});
          alertNotificationRef?.current?.showAlertNotification();
        }
      }
      catch (error){
        setLoading(false);
        console.log(error);
        setAlertNotification({type: "error", text: "Something went wrong"});
        alertNotificationRef?.current?.showAlertNotification();
      }
    }, 2000);
  })


  return(
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <StatusBar backgroundColor={colors.primaryBlue} barStyle="light-content"/>
      <ScrollView style={{paddingVertical: verticalScale(12)}} showsVerticalScrollIndicator={false}>
        <Controller
          control={control}
          rules={{
            required: true
          }}
          render={({field: {onChange, onBlur, value} }) => (
            <PrimaryTextInput
              mode={false}
              placeholder={t("placeholder.name")}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.name}
            />
          )}
          name="name"/>
        <Controller
          control={control}
          rules={{
            required: true
          }}
          render={({field: {onChange, onBlur, value} }) => (
            <PrimaryTextInput
              mode={false}
              placeholder={t("placeholder.surname")}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.surname}
            />
          )}
          name="surname"/>
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
              icon="eye-outline"
              iconPress={() => setSecureText(item => !item)}
            />
          )}
          name="password"/>
        <View style={styles.space}>
          <PrimaryButton
            mode={true}
            text={t("button.sign-up")}
            onPress={handleSubmit(handleSignUp)}
            loading={loading}
            disable={loading}
          />
          <PrimaryButton
            mode={false}
            text={t("button.back")}
            onPress={() => navigation.goBack()}
          />
        </View>
      </ScrollView>
      <AlertNotification
        ref={alertNotificationRef}
        type={alertNotification.type}
        text={alertNotification.text}/>
    </View>
  )
}

export default SignUp;
