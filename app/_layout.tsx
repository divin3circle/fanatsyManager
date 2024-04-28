import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          title: "Sign Up",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(tabs)"
        options={{ title: "Back", headerShown: false }}
      />
      <Stack.Screen
        name="settings"
        options={{ title: "Settings", headerShown: true }}
      />
      <Stack.Screen
        name="support"
        options={{ title: "Support", headerShown: true }}
      />
      {/* <Stack.Screen
        name="/player/:id"
        options={{
          title: "Player Details",
          headerShown: true,
        }}
      /> */}
      <Stack.Screen
        name="player/[id]"
        options={{
          title: "Player Details",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="proscreen"
        options={{
          title: "Subscribe",
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default Layout;

const styles = StyleSheet.create({
  stack: {
    backgroundColor: "red",
  },
});
