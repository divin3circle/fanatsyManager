import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  View,
  StatusBar,
} from "react-native";
import React from "react";
import useThemeStore from "../../utils/store";
import ManagerBanner from "../components/home/ManagerBanner";
import PlayersCarousel from "../components/home/PlayersCarousel";
import Fixtures from "../components/home/Fixtures";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../utils/Colors";

const Home = () => {
  const { theme, toggleTheme } = useThemeStore();
  const now = new Date();
  const currentHour = now.getHours();

  return (
    <SafeAreaView
      style={{
        backgroundColor: theme === "dark" ? "black" : "white",
        flex: 1,
      }}
    >
      {/* navigation */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 15,
          // shadowColor: "#000",
          // shadowOffset: {
          //   width: 0,
          //   height: 2,
          // },
          // shadowOpacity: 0.25,
          // shadowRadius: 3.84,
          // elevation: 5,
          paddingHorizontal: 20,
        }}
      >
        <View>
          <Text
            style={{
              fontFamily: "InclusiveSans",
              fontSize: 20,
            }}
          >
            {currentHour < 12
              ? "Morning"
              : currentHour < 16
              ? "Afternoon"
              : "Evening"}{" "}
            Manager
          </Text>
        </View>
        <View>
          <Ionicons name="notifications" size={24} color="black" />
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
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
