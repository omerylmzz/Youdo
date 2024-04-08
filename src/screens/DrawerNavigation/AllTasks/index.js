import React from "react";
import { View } from "react-native";
import PrimaryHeader from "../../../components/headers/PrimaryHeader";
import styles from "./styles";

const AllTasks = ({navigation}) => {
  return(
    <View style={styles.container}>
      <PrimaryHeader
        mode={false}
        title="All Tasks"
        leftIcon="menu"
        leftPress={() => navigation.openDrawer()}
      />
    </View>
  )
}

export default AllTasks;
