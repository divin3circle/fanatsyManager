import { StyleSheet, Text, View, StatusBar, SafeAreaView } from "react-native";
import React from "react";
import useThemeStore from "../../utils/store";
import ManagerDetails from "../components/manager/ManagerDetails";
import { COLORS } from "../../utils/Colors";

const Manager = () => {
  const { theme } = useThemeStore();
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <StatusBar
          barStyle={theme === "dark" ? "light-content" : "dark-content"}
        />
        <View>
          <ManagerDetails />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Manager;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  divider: {
    width: "100%",
    height: StyleSheet.hairlineWidth,
    backgroundColor: "gray",
    marginVertical: 12,
  },
});
