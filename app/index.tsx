import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";

import { Link } from "expo-router";
import Welcome from "../components/welcome_components/Welcome";
import { COLORS } from "../utils/Colors";
const Page = () => {
  return (
    <View style={styles.welcomeContainer}>
      <Welcome />
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  welcomeContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
  },
});
