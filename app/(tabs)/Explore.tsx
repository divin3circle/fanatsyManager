import { StyleSheet, Text, View, StatusBar } from "react-native";
import React from "react";
import useThemeStore from "../../utils/store";
import { COLORS } from "../../utils/Colors";

const Explore = () => {
  const { theme, toggleTheme } = useThemeStore();
  return (
    <View
      style={[
        styles.container,
        theme === "dark"
          ? { backgroundColor: COLORS["app-dark"] }
          : { backgroundColor: COLORS["app-light"] },
      ]}
    >
      <StatusBar
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
      />
      <Text
        style={
          theme === "dark"
            ? {
                color: COLORS["app-light"],
              }
            : {
                color: COLORS["app-dark"],
              }
        }
      >
        Explore
      </Text>
    </View>
  );
};

export default Explore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
