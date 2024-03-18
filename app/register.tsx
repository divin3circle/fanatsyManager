import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  ImageBackground,
  useColorScheme,
} from "react-native";
import React from "react";
import Welcome from "../components/welcome_components/Welcome";
import { Link } from "expo-router";
import { COLORS } from "../utils/Colors";

const Register = () => {
  const [isUser, setIsUser] = React.useState(false);
  const colorScheme = useColorScheme();
  const bgStyle =
    colorScheme === "dark" ? styles.welcomeDark : styles.welcomeLight;
  return (
    <View style={[styles.welcome, bgStyle]}>
      <View>
        <Image
          source={
            colorScheme !== "dark"
              ? require("../assests/images/icons/prem.png")
              : require("../assests/images/icons/prembg.png")
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
              <Text style={styles.appText}>Welcome back</Text>
              <Text style={styles.describeText}>Sign into your account</Text>
            </>
          ) : (
            <>
              <Text style={styles.appText}>Sign Up</Text>
              <Text style={styles.describeText}>Craete an account</Text>
            </>
          )}
        </View>
        <View style={{ margin: 15 }}>
          <Button
            title={!isUser ? "Create Account" : "Member?"}
            onPress={() => setIsUser(!isUser)}
          />
        </View>
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
