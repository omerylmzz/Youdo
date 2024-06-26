import React, { useCallback, useRef, useState } from "react";
import { SafeAreaView, FlatList, ScrollView, Switch, Text, View } from "react-native";
import styles from "./styles";
import PrimaryHeader from "../../../components/headers/PrimaryHeader";
import PrimaryTextInput from "../../../components/inputs/PrimaryTextInput";
import PrimaryPicker from "../../../components/buttons/PrimaryPicker";
import { horizontalScale, verticalScale } from "../../../helper/Metrics";
import ColorCategoryItem from "../../../components/items/ColorCategoryItem";
import PrimaryButton from "../../../components/buttons/PrimaryButton";
import { useDispatch, useSelector } from "react-redux";
import { selectColor } from "../../../redux/slices/ColorCategorySlice";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AlertNotification from "../../../components/layouts/AlertNotification";
import client from "../../../api/client";
import serverErrorsData from "../../../data/ServerErrorsData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";
import { useTheme } from "@react-navigation/native";

const NewTask = ({navigation}) => {
  // Theme Variable
  const { colors } = useTheme();
  // Language Variable
  const {t} = useTranslation();
  // Redux Variables
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.colorCategory);
  // Input States
  const [title, setTitle] = useState("");
  const [task, setTask] = useState("");
  const [date, setDate] = useState({string: "", iso: ""});
  const [time, setTime] = useState({string: "", iso: ""});
  // Reminder State
  const [reminder, setReminder] = useState(false);
  // Modal States
  const [modeDatePicker, setModeDatePicker] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  // State that controls the loading of the button
  const [isLoading, setIsLoading] = useState(false);
  // Alert Notification Ref
  const alertNotificationRef = useRef(null);
  const [alertNotification, setAlertNotification] = useState({
    type: "",
    text: ""
  });

  const showPicker = (key) => {
    if (key === "date") {
      setModeDatePicker("date");
      setDatePickerVisibility(true);
    }
    else {
      setModeDatePicker("time");
      setDatePickerVisibility(true);
    }
  }

  const hidePicker = () => {
    setDatePickerVisibility(false);
  }

  const handlePicker = (time) => {

    modeDatePicker === "date" ?
      setDate({string: new Date(time).toLocaleDateString("en-AU"), iso: time.toISOString().slice(0, 11)})
      :
      setTime({string: new Date(time).toLocaleTimeString("tr-TR"), iso: time.toISOString().slice(11, 19)});

    hidePicker();

    // time.toISOString() = 2024-05-18T09:00:00.000Z
    // time.toISOString().slice(0, 11) = 2024-05-18T
    // time.toISOString().slice(11, 19) = 09:00:00

  }

  const createTask = useCallback(() => {
    setIsLoading(true);
    setTimeout(async () => {
      try {

        const ACCESS_TOKEN = await AsyncStorage.getItem("ACCESS_TOKEN");
        const LANGUAGE = await AsyncStorage.getItem("LANGUAGE");

        const headers = {
          "Content-Type": "application/json",
          "X-Auth-User-Token": ACCESS_TOKEN
        }

        const data = {
          TITLE: title.trim(),
          TASK: task.trim(),
          DATE: date.iso,
          TIME: time.iso,
          REMINDER: reminder,
          LABEL: selector.selectedColor
        }

        const response = await client.post("/task/create", data, { headers });

        if(response.data.SUCCESSFUL) {
          setIsLoading(false);
          setTitle("");
          setTask("");
          setDate({string: "", iso: ""});
          setTime({string: "", iso: ""});
          setReminder(false);
          dispatch(selectColor({id: "0", color: "#E72929"}));
          setAlertNotification({type: "success", text: LANGUAGE === "English" ? response.data.MESSAGE : "Görev başarılı bir şekilde oluşturuldu"});
          alertNotificationRef?.current?.showAlertNotification();
        }
        else {
          setIsLoading(false);
          const Index = serverErrorsData.findIndex((item) => item.message === response.data.MESSAGE);
          setAlertNotification({type: "error", text: LANGUAGE === "English" ? serverErrorsData[Index].en : serverErrorsData[Index].tr});
          alertNotificationRef?.current?.showAlertNotification();
        }
      }
      catch(error) {
        setIsLoading(false);
        console.log("NEW TASK ERROR: " + error);
        setAlertNotification({type: "error", text: "Something went wrong"});
        alertNotificationRef?.current?.showAlertNotification();
      }
    }, 2000);
  })



  return(
    <SafeAreaView style={[styles.container, {backgroundColor: colors.background}]}>
      <PrimaryHeader
        mode={false}
        title={t("header.new-task")}
        leftIcon="menu"
        leftPress={() => navigation.openDrawer()}/>
      <ScrollView contentContainerStyle={{alignItems: "center", paddingBottom: verticalScale(16)}}>
        <PrimaryTextInput
          mode={true}
          title={t("title.new-task.title")}
          placeholder={t("placeholder.title")}
          value={title}
          onChangeText={setTitle}/>
        <PrimaryTextInput
          mode={true}
          title={t("title.new-task.task")}
          placeholder={t("placeholder.task")}
          value={task}
          onChangeText={setTask}
          multiline={true}/>
        <View style={styles.row}>
          <PrimaryPicker
            mode={true}
            title={t("title.new-task.date")}
            placeholder={date.string}
            right={true}
            icon="calendar-range"
            onPress={() => showPicker("date")}/>
          <PrimaryPicker
            mode={true}
            title={t("title.new-task.time")}
            placeholder={time.string}
            right={true}
            icon="clock-outline"
            onPress={() => showPicker("time")}/>
        </View>
        <View>
          <Text style={[styles.title, {color: colors.title}]}>
            {t("title.new-task.reminder")}
          </Text>
          <View style={styles.row}>
            <Text style={[styles.text, {color: colors.text}]}>
              {t("description.new-task")}
            </Text>
            <Switch
              trackColor={{true: colors.green, false: colors.placeholder}}
              thumbColor={colors.white}
              onValueChange={() => setReminder(item => !item)}
              value={reminder} />
          </View>
        </View>
        <Text style={[styles.title, {color: colors.title, width: horizontalScale(350)}]}>
          {t("title.new-task.color")}
        </Text>
        <FlatList
          contentContainerStyle={{paddingHorizontal: horizontalScale(8)}}
          keyExtractor={item => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={selector.data}
          renderItem={({item}) => (
            <ColorCategoryItem
              color={item.color}
              selected={item.selected}
              onPress={() => dispatch(selectColor(item))}/>
          )}/>
      </ScrollView>
      <View style={{position: "absolute", bottom: verticalScale(16)}}>
        <PrimaryButton
          mode={true}
          text={t("button.create")}
          onPress={createTask}
          loading={isLoading}
          disable={isLoading}/>
      </View>
      <DateTimePickerModal
        mode={modeDatePicker}
        is24Hour={true}
        isVisible={isDatePickerVisible}
        onConfirm={handlePicker}
        onCancel={hidePicker}/>
      <AlertNotification
        ref={alertNotificationRef}
        type={alertNotification.type}
        text={alertNotification.text}/>
    </SafeAreaView>
  )
}

export default NewTask;
