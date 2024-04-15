import {
  Button,
  StyleSheet,
  SafeAreaView,
  Text,
  ScrollView,
  View,
  StatusBar,
} from "react-native";
import React from "react";
import { Link } from "expo-router";
import useThemeStore from "../../utils/store";
import ManagerBanner from "../components/home/ManagerBanner";
import PlayersCarousel from "../components/home/PlayersCarousel";
import Fixtures from "../components/home/Fixtures";

const Home = () => {
  const { theme, toggleTheme } = useThemeStore();
  return (
    <SafeAreaView
      style={{
        backgroundColor: theme === "dark" ? "black" : "white",
        flex: 1,
      }}
    >
      <ScrollView>
        <StatusBar barStyle="light-content" />
        <View style={styles.componentContainer}>
          <ManagerBanner />
        </View>
        <View style={styles.componentContainer}>
          <PlayersCarousel />
        </View>
        <View style={styles.componentContainer}>
          <Fixtures />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  componentContainer: {
    padding: 10,
  },
});
