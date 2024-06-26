import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { ActivityIndicator, RefreshControl, ScrollView, Text, View } from "react-native";
import styles from "./styles";
import HomeHeader from "../../../components/headers/HomeHeader";
import { verticalScale } from "../../../helper/Metrics";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import TaskItem from "../../../components/items/TaskItem";
import { getDailyTasks, updateTask } from "../../../redux/slices/ProgressSlice";
import client from "../../../api/client";
import AlertNotification from "../../../components/layouts/AlertNotification";
import { useTranslation } from "react-i18next";
import { useTheme } from "@react-navigation/native";
const Progress = ({navigation}) => {
  // Theme Variable
  const { colors } = useTheme();
  // Language Variable
  const {t} = useTranslation();
  // Redux Variables
  const dispatch = useDispatch();
  const taskSelector = useSelector((state) => state.dailyTasks);
  // Name State
  const [name, setName] = useState("");
  // Refresh Control State
  const [refreshing, setRefreshing] = useState(false);
  // Alert Notification Ref
  const alertNotificationRef = useRef(null);
  // Alert Notification State
  const [alertNotification, setAlertNotification] = useState({
    type: "",
    text: ""
  });

  useEffect(() => {
    getUserData();
    dispatch(getDailyTasks());
  }, []);


  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <HomeHeader
          leftIcon="menu"
          leftPress={() => navigation.openDrawer()}
          rightIcon="bell-outline"/>
      )
    })
  }, []);

  const getUserData = async () => {
    const data = JSON.parse(await AsyncStorage.getItem("USER_DATA"));
    setName(data.NAME);
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      dispatch(getDailyTasks());
    }, 2000)
  })

  const onPress = useCallback( async (item) => {
    try {

      const LANGUAGE = await AsyncStorage.getItem("LANGUAGE");

      const response = await client.patch(`/task/update/${item._id}`);

      if (response.data.SUCCESSFUL){
        dispatch(updateTask(item));
        console.log(response.data.MESSAGE);
      }
      else {
        setAlertNotification({type: "error", text: LANGUAGE === "English" ? "Something went wrong" : "Bir şeyler ters gitti"});
        alertNotificationRef?.current?.showAlertNotification();
      }
    }
    catch (error){
      console.log("UPDATE TASK ERROR: " + error);
      setAlertNotification({type: "error", text: "Something went wrong"});
      alertNotificationRef?.current?.showAlertNotification();
    }
  })

  return(
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
        }>
        <View>
          <Text style={[styles.title, {color: colors.title}]}>
            {`${t("title.progress.primary")} ${name}`}
          </Text>
          <Text style={[styles.description, {color: colors.text}]}>
            { taskSelector.data.length ? t("description.progress.true") : t("description.progress.false") }
          </Text>
        </View>
        {
          taskSelector.loading ?
            <View style={{paddingVertical: verticalScale(48)}}>
              <ActivityIndicator color={colors.primaryBlue} size="large" animating={true}/>
            </View>
            :
            <View>
              <View style={{display: taskSelector.data.filter((item) => !item.COMPLETED).length ? "flex" : "none"}}>
                <Text style={[styles.section, {color: colors.title}]}>
                  {t("title.progress.secondary")}
                </Text>
                {
                  taskSelector.data.filter((item) => !item.COMPLETED).map((item, index) => (
                    <TaskItem
                      key={item._id}
                      title={item.TITLE}
                      task={item.TASK}
                      time={item.TIME.slice(0, 5)}
                      label={item.LABEL}
                      completed={item.COMPLETED}
                      onPress={() => onPress(item)}
                      index={index}
                    />
                  ))
                }
              </View>
              <View style={{display: taskSelector.data.filter((item) => item.COMPLETED).length ? "flex" : "none"}}>
                <Text style={[styles.section, {color: colors.title}]}>
                  {t("title.progress.tertiary")}
                </Text>
                {
                  taskSelector.data.filter((item) => item.COMPLETED).map((item, index) => (
                    <TaskItem
                      key={item._id}
                      title={item.TITLE}
                      task={item.TASK}
                      time={item.TIME.slice(0, 5)}
                      label={item.LABEL}
                      completed={item.COMPLETED}
                      index={index}
                    />
                  ))
                }
              </View>
            </View>
        }
      </ScrollView>
      <AlertNotification
        ref={alertNotificationRef}
        type={alertNotification.type}
        text={alertNotification.text}/>
    </View>
  )
}

export default Progress;
