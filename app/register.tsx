import { StyleSheet, Text, View, Image, Button, StatusBar } from "react-native";
import React from "react";
import Welcome from "../components/welcome_components/Welcome";
import { Link } from "expo-router";
import { COLORS } from "../utils/Colors";
import useThemeStore from "../utils/store";

const Register = () => {
  const { theme, toggleTheme } = useThemeStore();
  const [isUser, setIsUser] = React.useState(false);

  const bgStyle = theme === "dark" ? styles.welcomeDark : styles.welcomeLight;
  const textColor = theme === "dark" ? styles.textDark : null;
  return (
    <View style={[styles.welcome, bgStyle]}>
      <StatusBar
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
      />
      <View>
        <Image
          source={
            theme === "dark"
              ? require("../assests/images/icons/prembg.png")
              : require("../assests/images/icons/prem.png")
          }
          accessibilityLabel="prem-logo"
          style={{
            height: 120,
            width: 120,
            alignSelf: "center",
            marginTop: 150,
          }}
          resizeMode="contain"
        />
        <View style={styles.textConainter}>
          {!isUser ? (
            <>
              <Text style={[styles.appText, textColor]}>Welcome back</Text>
              <Text style={[styles.describeText, textColor]}>
                Sign into your account
              </Text>
            </>
          ) : (
            <>
              <Text style={[styles.appText, textColor]}>Sign Up</Text>
              <Text style={[styles.describeText, textColor]}>
                Craete an account
              </Text>
            </>
          )}
        </View>
        <View style={{ margin: 15 }}>
          <Button
            title={!isUser ? "Create Account" : "Member?"}
            onPress={() => setIsUser(!isUser)}
          />
        </View>
        <Button title="Toggle Theme" onPress={toggleTheme} />
      </View>
      <Link href={"/Home"} replace asChild>
        <Button title="Login" />
      </Link>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  welcome: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  welcomeLight: {
    backgroundColor: COLORS.primary,
  },
  welcomeDark: {
    backgroundColor: COLORS["app-dark"],
  },
  textDark: {
    color: COLORS["app-light"],
  },
  appText: {
    fontSize: 30,
    fontWeight: "900",
    textAlign: "center",
    color: COLORS["app-dark"],
    fontFamily: "InclusiveSans",
  },
  describeText: {
    fontSize: 17,
    textAlign: "center",
    color: COLORS["app-dark"],
    fontFamily: "InclusiveSans",
  },
  textConainter: {
    marginTop: 10,
    marginBottom: 10,
  },
});
