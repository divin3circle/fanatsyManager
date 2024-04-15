import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import useThemeStore from "../../utils/store";
import { COLORS } from "../../utils/Colors";

const Layout = () => {
  const { theme, toggleTheme } = useThemeStore();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarStyle: {
          marginHorizontal: 12,
          borderRadius: 20,
          backgroundColor: COLORS["card-light"],
          shadowColor: "black",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          alignItems: "center",
          paddingBottom: 0,
        },
        tabBarItemStyle: {
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 5,
        },

        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={28} color={color} />
          ),
          headerStyle: {
            backgroundColor: theme === "dark" ? COLORS["app-dark"] : "white",
          },
          headerTintColor: theme === "dark" ? "white" : "black",
        }}
      />
      <Tabs.Screen
        name="Explore"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="search" size={28} color={color} />
          ),
          headerStyle: {
            backgroundColor: theme === "dark" ? COLORS["app-dark"] : "white",
          },
          headerTintColor: theme === "dark" ? "white" : "black",
        }}
      />
      <Tabs.Screen
        name="Fantasy"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="trophy" size={28} color={color} />
          ),
          headerStyle: {
            backgroundColor: theme === "dark" ? COLORS["app-dark"] : "white",
          },
          headerTintColor: theme === "dark" ? "white" : "black",
        }}
      />
      <Tabs.Screen
        name="Manager"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={28} color={color} />
          ),
          headerStyle: {
            backgroundColor: theme === "dark" ? COLORS["app-dark"] : "white",
          },
          headerTintColor: theme === "dark" ? "white" : "black",
        }}
      />
    </Tabs>
  );
};

export default Layout;

const styles = StyleSheet.create({});
