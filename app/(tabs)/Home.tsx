import { Button, StyleSheet, Text, View, StatusBar } from "react-native";
import React from "react";
import { Link } from "expo-router";
import useThemeStore from "../../utils/store";

const Home = () => {
  const { theme, toggleTheme } = useThemeStore();
  return (
    <View>
      <StatusBar
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
      />
      <Text>Home</Text>
      <Link href="/" replace asChild>
        <Button title="Logout" />
      </Link>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
