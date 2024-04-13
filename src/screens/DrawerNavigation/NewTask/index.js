import React, { useState } from "react";
import { SafeAreaView, FlatList, ScrollView, Switch, Text, View } from "react-native";
import styles from "./styles";
import PrimaryHeader from "../../../components/headers/PrimaryHeader";
import PrimaryTextInput from "../../../components/inputs/PrimaryTextInput";
import PrimaryPicker from "../../../components/buttons/PrimaryPicker";
import { lightColors } from "../../../components/styles/Colors";
import { horizontalScale, verticalScale } from "../../../helper/Metrics";
import ColorCategoryItem from "../../../components/items/ColorCategoryItem";
import PrimaryButton from "../../../components/buttons/PrimaryButton";
import { useDispatch, useSelector } from "react-redux";
import { selectColor } from "../../../redux/slices/ColorCategorySlice";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const NewTask = ({navigation}) => {

  const [toggle, setToggle] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [modeDatePicker, setModeDatePicker] = useState("");

  const selector = useSelector((state) => state.colorCategory);
  const dispatch = useDispatch();

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

    modeDatePicker === "date" ? setDate(time.toLocaleDateString()) : setTime(time.toLocaleTimeString());
    hidePicker();

  }


  return(
    <SafeAreaView style={styles.container}>
      <PrimaryHeader
        mode={false}
        title="New Task"
        leftIcon="menu"
        leftPress={() => navigation.openDrawer()}/>
      <ScrollView contentContainerStyle={{alignItems: "center", paddingBottom: verticalScale(16)}}>
        <PrimaryTextInput
          mode={true}
          title="Title"
          placeholder="Write title..."/>
        <PrimaryTextInput
          mode={true}
          title="Task"
          placeholder="Write new task..."
          multiline={true}/>
        <View style={styles.row}>
          <PrimaryPicker
            mode={true}
            title="Date"
            placeholder={date}
            right={true}
            icon="calendar-range"
            onPress={() => showPicker("date")}/>
          <PrimaryPicker
            mode={true}
            title="Time"
            placeholder={time}
            right={true}
            icon="clock-outline"
            onPress={() => showPicker("time")}/>
        </View>
        <View>
          <Text style={styles.title}>
            Reminder
          </Text>
          <View style={styles.row}>
            <Text style={styles.text}>
              Remind me
            </Text>
            <Switch
              trackColor={{true: lightColors.green, false: lightColors.placeholder}}
              thumbColor={lightColors.white}
              onValueChange={() => setToggle(item => !item)}
              value={toggle} />
          </View>
        </View>
        <Text style={[styles.title, {width: horizontalScale(350)}]}>
          Color
        </Text>
        <FlatList
          contentContainerStyle={{paddingHorizontal: horizontalScale(8)}}
          keyExtractor={item => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={selector.array}
          renderItem={({item}) => (
            <ColorCategoryItem
              color={item.color}
              selected={item.selected}
              onPress={() => dispatch(selectColor(item))}/>
          )}/>
      </ScrollView>
      <View>
        <PrimaryButton
          mode={true}
          text="Create"
          onPress={() => setDatePickerVisibility(true)}/>
        <DateTimePickerModal
          mode={modeDatePicker}
          is24Hour={true}
          isVisible={isDatePickerVisible}
          onConfirm={handlePicker}
          onCancel={hidePicker}/>
      </View>
    </SafeAreaView>
  )
}

export default NewTask;
