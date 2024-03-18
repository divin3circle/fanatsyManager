import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import useThemeStore from "../../utils/store";
import { COLORS } from "../../utils/Colors";

const Layout = () => {
  const { theme, toggleTheme } = useThemeStore();
  return (
    <Tabs>
      <Tabs.Screen
        name="Home"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
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
            <Ionicons name="search" size={24} color={color} />
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
            <Ionicons name="trophy" size={24} color={color} />
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
            <Ionicons name="person" size={24} color={color} />
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
