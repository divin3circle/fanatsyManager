import { StyleSheet, Text, View, StatusBar } from "react-native";
import React from "react";
import useThemeStore from "../../utils/store";

const Fantasy = () => {
  const { theme, toggleTheme } = useThemeStore();
  return (
    <View>
      <StatusBar
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
      />
      <Text>Fantasy</Text>
    </View>
  );
};

export default Fantasy;

const styles = StyleSheet.create({});
