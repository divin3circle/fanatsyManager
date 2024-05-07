import { StyleSheet, View } from "react-native";
import React from "react";
import Welcome from "./components/welcome_components/Welcome";
import { COLORS } from "../utils/Colors";
import { store } from "./store";
import { Provider } from "react-redux";

const Page = () => {
  return (
    <Provider store={store}>
      <View style={styles.welcomeContainer}>
        <Welcome />
      </View>
    </Provider>
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
