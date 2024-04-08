import React from "react";
import { ScrollView, Text, View } from "react-native";
import styles from "./styles";
import HomeHeader from "../../../components/headers/HomeHeader";
import { verticalScale } from "../../../helper/Metrics";
const Progress = ({navigation}) => {
  return(
    <View style={styles.container}>
      <HomeHeader
        leftIcon="menu"
        leftPress={() => navigation.openDrawer()}
        rightIcon="bell-outline"
        rightPress={() => console.log("BELL")}/>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View>
          <Text style={styles.title}>
            Hey, User
          </Text>
          <Text style={styles.description}>
            Here are your tasks today
          </Text>
        </View>
        <View style={{paddingVertical: verticalScale(12)}}>
          <Text style={styles.section}>
            Tasks
          </Text>
        </View>
      </ScrollView>
    </View>
  )
}

export default Progress;
