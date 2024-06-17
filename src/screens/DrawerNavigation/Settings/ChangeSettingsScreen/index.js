import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
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

const ChangeSettingsScreen = ({navigation, route}) => {

  const { TYPE } = route.params;
  const { t } = useTranslation();
  const [themes, setThemes] = useState([]);
  const [languages, setLanguages] = useState([]);
  const { setIsDarkTheme } = useContext(ThemeContext);
  const { colors } = useTheme();

  const [secureCurrentPassword, setSecureCurrentPassword] = useState(true);
  const [secureNewPassword, setSecureNewPassword] = useState(true);

  const {
    control,
    handleSubmit,
    formState: { errors }} = useForm({
    defaultValues:{
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
          title={HeaderData[Index].label}
          leftIcon="arrow-left"
          leftPress={() => navigation.goBack()}
          rightIcon="check"
          rightPress={handleSubmit(saveChanges)}/>
      )
    })
  }, []);

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

  const saveChanges = async (data) => {

    if (TYPE === "password"){
      console.log(data)
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
  }

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
          <View></View>
        )
      }
      {
        TYPE === "password" && (
          <View>
            <View style={styles.body}>
              <Text style={[styles.title, {color: colors.title}]}>
                Change your password
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
    </View>
  )
}

export default ChangeSettingsScreen;
