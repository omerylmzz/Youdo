import React, { useState } from "react";
import { FlatList, ScrollView, Switch, Text, View } from "react-native";
import styles from "./styles";
import PrimaryHeader from "../../../components/headers/PrimaryHeader";
import PrimaryTextInput from "../../../components/inputs/PrimaryTextInput";
import PrimaryPicker from "../../../components/buttons/PrimaryPicker";
import { lightColors } from "../../../components/styles/Colors";
import { horizontalScale, verticalScale } from "../../../helper/Metrics";
import ColorCategoryItem from "../../../components/items/ColorCategoryItem";
import ColorCategoryData from "../../../data/ColorCategoryData";
import PrimaryButton from "../../../components/buttons/PrimaryButton";
import { useDispatch, useSelector } from "react-redux";
import { selectColor } from "../../../redux/slices/ColorCategorySlice";

const NewTask = ({navigation}) => {

  const [toggle, setToggle] = useState(false);

  const selector = useSelector((state) => state.colorCategory);
  const dispatch = useDispatch();

  const aa = () => {
    const day = new Date().getDate();
    console.log(day)
  }

  return(
    <View style={styles.container}>
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
            right={true}
            icon="calendar-range"/>
          <PrimaryPicker
            mode={true}
            title="Time"
            right={true}
            icon="clock-outline"/>
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
          onPress={() => aa()}
        />
      </View>
    </View>
  )
}

export default NewTask;
