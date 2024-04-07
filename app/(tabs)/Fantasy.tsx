import { StyleSheet, Text, View, StatusBar, ScrollView } from "react-native";
import React from "react";
import useThemeStore from "../../utils/store";
import Team, { NoTeam } from "../components/fantasy/Team";
import Suggestions from "../components/fantasy/Suggestions";

const Fantasy = () => {
  const { theme, toggleTheme } = useThemeStore();
  return (
    <ScrollView>
      <View>
        <StatusBar
          barStyle={theme === "dark" ? "light-content" : "dark-content"}
        />
        <View style={styles.componentContainer}>
          <Team />
        </View>
        <View style={styles.componentContainer}>
          <Suggestions />
        </View>
      </View>
    </ScrollView>
  );
};

export default Fantasy;

const styles = StyleSheet.create({
  componentContainer: {
    padding: 0,
  },
});
