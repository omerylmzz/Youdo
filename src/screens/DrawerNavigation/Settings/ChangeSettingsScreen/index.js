import React, { useCallback, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { View, Text } from "react-native";
import PrimaryHeader from "../../../../components/headers/PrimaryHeader";
import styles from "./styles";
import ChangeSettingsItem from "../../../../components/items/ChangeSettingsItem";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18next from "../../../../../services/i18next";
import { useTheme } from "@react-navigation/native";
import { ThemeContext } from "../../../../theme/ThemeContext";
import PrimaryTextInput from "../../../../components/inputs/PrimaryTextInput";
import { Controller, useForm } from "react-hook-form";
import AlertNotification from "../../../../components/layouts/AlertNotification";
import { verticalScale } from "../../../../helper/Metrics";
import client from "../../../../api/client";
import serverErrorsData from "../../../../data/ServerErrorsData";

const ChangeSettingsScreen = ({navigation, route}) => {
  // Parameters from previous screen
  const { TYPE, MAIL } = route.params;
  // Theme Variables
  const { setIsDarkTheme } = useContext(ThemeContext);
  const { colors } = useTheme();
  // Language Variable
  const { t } = useTranslation();
  // Theme and Language States
  const [themes, setThemes] = useState([]);
  const [languages, setLanguages] = useState([]);
  // State that controls the loading of the button
  const [isLoading, setIsLoading] = useState(false);
  // State that controls the password inputs
  const [secureCurrentPassword, setSecureCurrentPassword] = useState(true);
  const [secureNewPassword, setSecureNewPassword] = useState(true);
  // Alert Notification Ref
  const alertNotificationRef = useRef(null);
  // Alert Notification State
  const [alertNotification, setAlertNotification] = useState({
    type: "",
    text: ""
  });
  // React Hook Form Variables
  const {
    control,
    handleSubmit,
    formState: { errors }} = useForm({
    defaultValues:{
      newMail: MAIL,
      currentPassword: "",
      newPassword: ""
    },
  });

  useEffect(() => {
    getData();
  }, [themes, languages]);

  useLayoutEffect(() => {

    const Index = HeaderData.findIndex((item) => item.id === TYPE);

    navigation.setOptions({
      header: () => (
        <PrimaryHeader
          mode={true}
          loading={isLoading}
          title={HeaderData[Index].label}
          leftIcon="arrow-left"
          leftPress={() => navigation.goBack()}
          rightIcon="check"
          rightPress={handleSubmit(saveChanges)}/>
      )
    })
  }, [isLoading]);

  const HeaderData = [
    {
      id: "personal",
      label: t("header.change-settings.personal")
    },
    {
      id: "mail",
      label: t("header.change-settings.mail")
    },
    {
      id: "password",
      label: t("header.change-settings.password")
    },
    {
      id: "theme",
      label: t("header.change-settings.theme")
    },
    {
      id: "language",
      label: t("header.change-settings.language")
    }
  ]


  const selectItem = async (item) => {
    if (TYPE === "theme"){
      const Index = themes.findIndex((i) => i.id === item.id);
      await AsyncStorage.setItem("THEME", themes[Index].id);
    }
    else if (TYPE === "language"){
      const Index = languages.findIndex((i) => i.id === item.id);
      await AsyncStorage.setItem("LANGUAGE", languages[Index].id);
    }
  }

  const saveChanges = useCallback (async (data) => {
    if (TYPE === "mail"){
      setIsLoading(true);
      setTimeout(async () => {
        try {
          const ACCESS_TOKEN = await AsyncStorage.getItem("ACCESS_TOKEN");
          const LANGUAGE = await AsyncStorage.getItem("LANGUAGE");

          const headers = {
            "Content-Type": "application/json",
            "X-Auth-User-Token": ACCESS_TOKEN
          }

          const body = {
            MAIL: data.newMail
          }

          const response = await client.post("/user/change/mail", body, { headers });

          if (response.data.SUCCESSFUL){
            setIsLoading(false);
            const user = JSON.parse(await AsyncStorage.getItem("USER_DATA"));
            const theme = await AsyncStorage.getItem("THEME");
            const language = await AsyncStorage.getItem("LANGUAGE");
            const notification = await AsyncStorage.getItem("NOTIFICATION");
            const object = {
              NAME: user.NAME,
              SURNAME: user.SURNAME,
              MAIL: data.newMail,
              PASSWORD: user.PASSWORD,
              THEME: theme,
              LANGUAGE: language,
              NOTIFICATION: notification === "Open"
            }
            await AsyncStorage.setItem("USER_DATA", JSON.stringify(object));
            navigation.goBack();
          }
          else {
            setIsLoading(false);
            const Index = serverErrorsData.findIndex((item) => item.message === response.data.MESSAGE);
            setAlertNotification({type: "error", text: LANGUAGE === "English" ? serverErrorsData[Index].en : serverErrorsData[Index].tr});
            alertNotificationRef?.current?.showAlertNotification();
          }
        }
        catch (error){
          setIsLoading(false);
          console.log("CHANGE MAIL ERROR: " + error);
          setAlertNotification({type: "error", text: "Something went wrong"});
          alertNotificationRef?.current?.showAlertNotification();
        }
      }, 2000);
    }
    else if (TYPE === "password"){
      setIsLoading(true);
      setTimeout(async () => {
        try {
          const ACCESS_TOKEN = await AsyncStorage.getItem("ACCESS_TOKEN");
          const LANGUAGE = await AsyncStorage.getItem("LANGUAGE");

          const headers = {
            "Content-Type": "application/json",
            "X-Auth-User-Token": ACCESS_TOKEN
          }

          const body = {
            CURRENT_PASSWORD: data.currentPassword,
            NEW_PASSWORD: data.newPassword
          }

          const response = await client.post("/user/change/password", body, {  headers });

          if (response.data.SUCCESSFUL){
            setIsLoading(false);
            navigation.goBack();
          }
          else {
            setIsLoading(false);
            const Index = serverErrorsData.findIndex((item) => item.message === response.data.MESSAGE);
            setAlertNotification({type: "error", text: LANGUAGE === "English" ? serverErrorsData[Index].en : serverErrorsData[Index].tr});
            alertNotificationRef?.current?.showAlertNotification();
          }
        }
        catch (error){
          setIsLoading(false);
          console.log("CHANGE PASSWORD ERROR: " + error);
          setAlertNotification({type: "error", text: "Something went wrong"});
          alertNotificationRef?.current?.showAlertNotification();
        }
      }, 2000);
    }
    else if (TYPE === "theme"){
      const deviceTheme = await AsyncStorage.getItem("THEME");
      deviceTheme === "Light" ? setIsDarkTheme(false) : setIsDarkTheme(true);
      navigation.goBack();
    }
    else if (TYPE === "language"){
      const deviceLanguage = await AsyncStorage.getItem("LANGUAGE");
      deviceLanguage === "Turkish" ? i18next.changeLanguage("tr") : i18next.changeLanguage("en");
      navigation.goBack();
    }
  })

  const getData = async () => {
    if (TYPE === "theme"){

      const deviceTheme = await AsyncStorage.getItem("THEME");

      const data = [
        {
          id: "Light",
          label: t("text.change-settings.theme.light"),
          selected: deviceTheme === "Light"
        },
        {
          id: "Dark",
          label: t("text.change-settings.theme.dark"),
          selected: deviceTheme === "Dark"
        }
      ]
      setThemes(data);
    }
    else if (TYPE === "language"){

      const deviceLanguage = await AsyncStorage.getItem("LANGUAGE");

      const data = [
        {
          id: "Turkish",
          label: t("text.change-settings.language.tr"),
          selected: deviceLanguage === "Turkish"
        },
        {
          id: "English",
          label: t("text.change-settings.language.en"),
          selected: deviceLanguage === "English"
        }
      ]
      setLanguages(data);
    }
  }

  return(
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      {
        TYPE === "mail" && (
          <View style={{paddingVertical: verticalScale(12)}}>
            <View style={styles.body}>
              <Text style={[styles.title, {color: colors.title}]}>
                {t("title.change-settings.mail")}
              </Text>
              <Text style={[styles.description, {color: colors.description}]}>
                {t("description.change-settings.mail")}
              </Text>
            </View>
            <Controller
              control={control}
              rules={{
                required: true
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <PrimaryTextInput
                  mode={false}
                  placeholder={t("placeholder.mail")}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.newMail}
                />
              )}
              name="newMail"/>
          </View>
        )
      }
      {
        TYPE === "password" && (
          <View style={{paddingVertical: verticalScale(12)}}>
            <View style={styles.body}>
              <Text style={[styles.title, {color: colors.title}]}>
                {t("title.change-settings.password")}
              </Text>
              <Text style={[styles.description, {color: colors.description}]}>
                {t("description.change-settings.password")}
              </Text>
            </View>
            <Controller
              control={control}
              rules={{
                required: true
              }}
              render={({field: { onChange, onBlur, value }}) => (
                <PrimaryTextInput
                  mode={false}
                  placeholder={t("placeholder.current-password")}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.currentPassword}
                  secureTextEntry={secureCurrentPassword}
                  right={true}
                  icon={secureCurrentPassword ? "eye-outline" : "eye-off-outline"}
                  iconPress={() => setSecureCurrentPassword((prev) => !prev)}
                />
              )}
              name="currentPassword"/>
            <Controller
              control={control}
              rules={{
                required: true
              }}
              render={({field: { onChange, onBlur, value } }) => (
                <PrimaryTextInput
                  mode={false}
                  placeholder={t("placeholder.new-password")}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.newPassword}
                  secureTextEntry={secureNewPassword}
                  right={true}
                  icon={secureNewPassword ? "eye-outline" : "eye-off-outline"}
                  iconPress={() => setSecureNewPassword((prev) => !prev)}
                />
              )}
              name="newPassword"/>
          </View>
        )
      }
      {
        TYPE === "theme" && (
          <View style={[styles.section, {borderColor: colors.secondary}]}>
            {
              themes.map((item) => (
                <ChangeSettingsItem
                  key={item.id}
                  label={item.label}
                  selected={item.selected}
                  onPress={() => selectItem(item)}
                />
              ))
            }
          </View>
        )
      }
      {
        TYPE === "language" && (
          <View style={[styles.section, {borderColor: colors.secondary}]}>
            {
              languages.map((item) => (
                <ChangeSettingsItem
                  key={item.id}
                  label={item.label}
                  selected={item.selected}
                  onPress={() => selectItem(item)}
                />
              ))
            }
          </View>
        )
      }
      <AlertNotification
        ref={alertNotificationRef}
        type={alertNotification.type}
        text={alertNotification.text}/>
    </View>
  )
}

export default ChangeSettingsScreen;
