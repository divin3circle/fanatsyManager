import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const Layout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="Home"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Explore"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="search" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Fantasy"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="trophy" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Manager"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;

const styles = StyleSheet.create({});
