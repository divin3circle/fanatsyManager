import { StyleSheet, Text, View, StatusBar } from "react-native";
import React from "react";
import useThemeStore from "../../utils/store";

const Manager = () => {
  const { theme } = useThemeStore();
  return (
    <View>
      <StatusBar
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
      />
      <Text>Manager</Text>
    </View>
  );
};

export default Manager;

const styles = StyleSheet.create({});
