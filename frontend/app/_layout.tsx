import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "./store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient();

const Layout = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={client}>
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
          <Stack.Screen
            name="notify-modal"
            options={{
              title: "Notifications",
              headerShown: false,
              presentation: "modal",
            }}
          />
          <Stack.Screen
            name="[id]"
            options={{
              title: "Stats",
              headerShown: false,
              presentation: "modal",
            }}
          />
          <Stack.Screen
            name="payment-modal"
            options={{
              presentation: "modal",
              headerShown: false,
            }}
          />
        </Stack>
      </QueryClientProvider>
    </Provider>
  );
};

export default Layout;

const styles = StyleSheet.create({
  stack: {
    backgroundColor: "red",
  },
});
