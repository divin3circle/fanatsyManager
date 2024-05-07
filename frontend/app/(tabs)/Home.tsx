import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  View,
  StatusBar,
  Pressable,
  Modal,
} from "react-native";
import React, { useState } from "react";
import useThemeStore from "../../utils/store";
import ManagerBanner from "../components/home/ManagerBanner";
import PlayersCarousel from "../components/home/PlayersCarousel";
import Fixtures from "../components/home/Fixtures";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Provider } from "react-redux";
import { store } from "../store";

const Home = () => {
  const { theme, toggleTheme } = useThemeStore();
  const now = new Date();
  const currentHour = now.getHours();

  return (
    <Provider store={store}>
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
            marginTop: 10,
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
              Good{" "}
              {currentHour < 12
                ? "Morning"
                : currentHour < 16
                ? "Afternoon"
                : "Evening"}{" "}
            </Text>
          </View>
          <Pressable onPress={() => router.navigate("/notify-modal")}>
            <Ionicons name="notifications" size={24} color="black" />
          </Pressable>
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
    </Provider>
  );
};

export default Home;

const styles = StyleSheet.create({
  componentContainer: {
    padding: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
