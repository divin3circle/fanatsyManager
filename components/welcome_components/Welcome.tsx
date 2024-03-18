import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Platform,
} from "react-native";
import React from "react";
import { COLORS } from "../../utils/Colors";
import Caurosel from "./Carousel";
import { router, useRouter } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";

const premIcon = require("../../assests/images/icons/prem.png");

const Welcome = () => {
  const router = useRouter();
  const [fontsLoaded, fontError] = useFonts({
    InclusiveSans: require("../../assests/fonts/InclusiveSans-Regular.ttf"),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {/* Prem-logo imagae */}

        <View style={{ flexDirection: "column", marginBottom: 10 }}>
          <Image
            source={premIcon}
            accessibilityLabel="prem-logo"
            style={{ height: 120, width: 120, alignSelf: "center" }}
            resizeMode="contain"
          />
          <Text style={styles.appText}>Fantasy Assistant</Text>
        </View>
        <View>
          <Text style={styles.descriptionText}>
            A simple and easy way to manage your fantasy team.
          </Text>
        </View>

        {/* Carousel */}
        <View style={{ marginTop: 15, padding: 10 }}>
          <Caurosel />
        </View>
        {/* Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/register")}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary,
  },
  appText: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: COLORS["app-dark"],
    fontFamily: "InclusiveSans",
  },
  buttonContainer: {
    marginTop: 20,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 5, height: 5 },
        shadowColor: COLORS["app-dark"],
        shadowOpacity: 0.5,
        shadowRadius: 2,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  button: {
    backgroundColor: COLORS["app-dark"],
    padding: 15,
    borderRadius: 10,
    width: 200,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: COLORS["text-dark"],
    fontSize: 17,
    fontFamily: "InclusiveSans",
  },
  descriptionText: {
    fontSize: 17,
    color: COLORS["app-dark"],
    fontWeight: "300",
    padding: 15,
    textAlign: "center",
    fontFamily: "InclusiveSans",
  },
});
