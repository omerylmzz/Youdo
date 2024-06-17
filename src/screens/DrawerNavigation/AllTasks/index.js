import React, { useCallback, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  RefreshControl,
  SafeAreaView,
  ScrollView, StatusBar,
  Text, TouchableOpacity,
  View,
} from "react-native";
import PrimaryHeader from "../../../components/headers/PrimaryHeader";
import styles from "./styles";
import CalendarItem from "../../../components/items/CalendarItem";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, getAllTasks, getCalendar, selectDate } from "../../../redux/slices/AllTasksSlice";
import { horizontalScale, verticalScale } from "../../../helper/Metrics";
import TaskItem from "../../../components/items/TaskItem";
import moment from "moment";
import Animated, { FadeIn } from "react-native-reanimated";
import LottieView from "lottie-react-native";
import AlertNotification from "../../../components/layouts/AlertNotification";
import client from "../../../api/client";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "@react-navigation/native";
import { ThemeContext } from "../../../theme/ThemeContext";

const AllTasks = ({navigation}) => {

  // Redux Definitions
  const dispatch = useDispatch();
  const calendarSelector = useSelector((state) => state.calendar);
  const taskSelector = useSelector((state) => state.allTasks);

  const { isDarkTheme } = useContext(ThemeContext);
  const { colors } = useTheme();

  const {t} = useTranslation();
  const alertNotificationRef = useRef(null);
  const [alertNotification, setAlertNotification] = useState({
    type: "",
    text: ""
  });

  // Refresh State
  const [refreshing, setRefreshing] = useState(false);
  // Modal State
  const [modal, setModal] = useState({status: false, data: {}});

  // Variable that returns selected day
  const selectedDay = `${calendarSelector.selectedDate.day} ${calendarSelector.selectedDate.month} ${calendarSelector.selectedDate.year}`;

  useEffect(() => {
    // Redux Methods
    dispatch(getCalendar());
    dispatch(getAllTasks());
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <PrimaryHeader
          mode={false}
          title={t("header.all-tasks")}
          leftIcon="menu"
          leftPress={() => navigation.openDrawer()}/>
      )
    })
  }, []);


  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      dispatch(getAllTasks());
    }, 2000)
  })

  const onPress = useCallback(async () => {
    try {

      const LANGUAGE = await AsyncStorage.getItem("LANGUAGE");

      const response = await client.delete(`/task/delete/${modal.data._id}`);

      if (response.data.SUCCESSFUL){
        dispatch(deleteTask(modal.data));
        setModal({status: false, data: {}});
        setAlertNotification({type: "successful", text: LANGUAGE === "English" ? response.data.MESSAGE : "Görev başarılı bir şekilde silindi"});
        alertNotificationRef?.current?.showAlertNotification();
      }
      else {
        setModal({status: false, data: {}});
        setAlertNotification({type: "error", text: LANGUAGE === "English" ? "Something went wrong" : "Bir şeyler ters gitti"});
        alertNotificationRef?.current?.showAlertNotification();
      }
    }
    catch (error){
      console.log("DELETE TASK ERROR: " + error);
      setModal({status: false, data: {}});
      setAlertNotification({type: "error", text: "Something went wrong"});
      alertNotificationRef?.current?.showAlertNotification();
    }


  })

  return(
    <SafeAreaView style={[styles.container, {backgroundColor: colors.background}]}>
      <StatusBar backgroundColor={colors.background} barStyle={isDarkTheme ? "light-content" : "dark-content"} hidden={modal.status} showHideTransition="fade"/>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
        }
        stickyHeaderIndices={[1]}>
        <FlatList
          style={styles.flatList}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={calendarSelector.data}
          keyExtractor={item => item.day}
          renderItem={({item}) => (
            <CalendarItem
              day={item.day}
              month={item.month.toUpperCase()}
              name={item.name}
              selected={item.selected}
              onPress={() => dispatch(selectDate(item))}/>)}/>
        <View style={styles.section}>
          <Text style={[styles.title, {color: colors.title}]}>
            {t("title.all-tasks")}
          </Text>
        </View>
        <View style={{paddingHorizontal: horizontalScale(8)}}>
          {
            taskSelector.loading ?
              (
                <View style={{paddingVertical: verticalScale(24)}}>
                  <ActivityIndicator color={colors.primaryBlue} size="large" animating={true}/>
                </View>
              )
              :
              taskSelector.data.filter((item) => moment(item.DATE + item.TIME).format("D MMM Y") === selectedDay).length ?
                taskSelector.data.filter((item) => moment(item.DATE + item.TIME).format("D MMM Y") === selectedDay).map((item, index) => (
                  <TaskItem
                    key={item._id}
                    title={item.TITLE}
                    task={item.TASK}
                    time={item.TIME.slice(0, 5)}
                    label={item.LABEL}
                    deletable={true}
                    onPress={() => setModal({status: true, data: item})}
                    index={index}/>
                ))
                :
                <Animated.View entering={FadeIn} style={{justifyContent: "center", alignItems: "center"}}>
                  <Image
                    style={styles.image}
                    resizeMode="contain"
                    source={require("./../../../../assets/images/empy_task.png")}/>
                </Animated.View>

          }
        </View>
      </ScrollView>
      <Modal transparent={true} visible={modal.status} animationType="fade">
        <View style={{flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#000000aa"}}>
          <View style={[styles.modal, {backgroundColor: colors.background}]}>
            <View style={[styles.modalAnimationFrame, {backgroundColor: colors.secondary}]}>
              <LottieView
                style={styles.animation}
                source={require("../../../../assets/animations/xB9JFfTjnY.json")}
                autoPlay={true}
                loop={true}/>
            </View>
            <Text style={[styles.modalText, {color: colors.text}]}>
              {t("description.all-tasks")}
            </Text>
            <TouchableOpacity style={[styles.modalButton, {backgroundColor: colors.primaryBlue}]} onPress={onPress} activeOpacity={0.5}>
              <Text style={[styles.modalButtonText, {color: colors.white}]}>
                {t("button.yes")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalButton, {backgroundColor: colors.white, borderWidth: isDarkTheme ? 0 : 1, borderColor: colors.primaryBlue}]} onPress={() => setModal( {status: false, data: {}})} activeOpacity={0.5}>
              <Text style={[styles.modalButtonText, {color: colors.primaryBlue}]}>
                {t("button.no")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <AlertNotification
        ref={alertNotificationRef}
        type={alertNotification.type}
        text={alertNotification.text}/>
    </SafeAreaView>
  )
}

export default AllTasks;
