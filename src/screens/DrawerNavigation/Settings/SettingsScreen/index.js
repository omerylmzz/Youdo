import React, { useEffect, useLayoutEffect, useState } from "react";
import { View } from "react-native";
import styles from "./styles";
import PrimaryHeader from "../../../../components/headers/PrimaryHeader";
import SettingsItem from "../../../../components/items/SettingsItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";
import { useTheme } from "@react-navigation/native";

const SettingsScreen = ({navigation}) => {
  // Theme Variable
  const { colors } = useTheme();
  // Language Variable
  const { t } = useTranslation();
  // User Data State
  const [userData, setUserData] = useState({});

  useEffect(() => {
    getUserData();
   }, [userData]);

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <PrimaryHeader
          mode={false}
          title={t("header.settings")}
          leftIcon="menu"
          leftPress={() => navigation.openDrawer()}/>
      )
    })
  }, []);

  const getUserData = async () => {
    try {
      const object = JSON.parse(await AsyncStorage.getItem("USER_DATA"));
      const theme = await AsyncStorage.getItem("THEME");
      const language = await AsyncStorage.getItem("LANGUAGE");
      const notification = await AsyncStorage.getItem("NOTIFICATION");
      const data = {
        NAME: object.NAME,
        SURNAME: object.SURNAME,
        MAIL: object.MAIL,
        PASSWORD: object.PASSWORD,
        THEME: theme,
        LANGUAGE: language,
        NOTIFICATION: notification === "Open"
      }
      setUserData(data);
    }
    catch (error){
      console.log(error);
    }
  }

  const changeNotificationSetting = async () => {
    try {
      const NOTIFICATION = await AsyncStorage.getItem("NOTIFICATION");

      NOTIFICATION === "Open" ?
        await AsyncStorage.setItem("NOTIFICATION", "Close")
        :
        await AsyncStorage.setItem("NOTIFICATION", "Open")
    }
    catch (error){
      console.log("CHANGE NOTIFICATION ERROR: ", + error);
    }
  }

  const data = [
    {
      header: "Profile",
      items: [
        {
          id: "personal",
          image: require("../../../../../assets/images/default_profile_logo.jpg"),
          label: `${userData.NAME} ${userData.SURNAME}`,
          type: "edit"
        }
      ]
    },
    {
      header: "Account",
      items: [
        {
          id: "mail",
          icon: "email-outline",
          label: t("text.settings.mail"),
          type: "select"
        },
        {
          id: "password",
          icon: "lock-outline",
          label: t("text.settings.password"),
          type: "select"
        }
      ]
    },
    {
      header: "General",
      items: [
        {
          id: "theme",
          icon: "brightness-6",
          label: t("text.settings.theme"),
          link: userData.LANGUAGE === "Turkish" ? userData.THEME === "Light" ? "Aydınlık" : "Karanlık" : userData.THEME,
          type: "link"
        },
        {
          id: "language",
          icon: "web",
          label: t("text.settings.language"),
          link: userData.LANGUAGE === "Turkish" ? "Türkçe" : "English",
          type: "link"
        },
        {
          id: "notification",
          icon: "bell-outline",
          label: t("text.settings.notification"),
          value: userData.NOTIFICATION,
          type: "toggle"
        }
      ]
    }
  ]

  return(
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      {
        data.map(({header, items}) => (
          <View key={header} style={[styles.section, {borderColor: colors.secondary}]}>
            {
              items.map(({id, icon, image, label, link, value, type}) => (
                <SettingsItem
                  key={id}
                  icon={icon}
                  image={image}
                  label={label}
                  link={link}
                  value={value}
                  type={type}
                  onPress={() => id === "notification" ? changeNotificationSetting() : id === "personal" ? console.log("Personal") : navigation.navigate("ChangeSettingsScreen", {
                    TYPE: id,
                    MAIL: userData.MAIL
                  })}
                />
              ))
            }
          </View>
        ))
      }
    </View>
  )
}

export default SettingsScreen;
