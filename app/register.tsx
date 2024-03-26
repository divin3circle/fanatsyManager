import {
  Text,
  View,
  StyleSheet,
  Image,
  StatusBar,
  ScrollView,
  Button,
  Platform,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import React from "react";
import { useNavigation } from "expo-router";
import Welcome from "./components/welcome_components/Welcome";
import { Link } from "expo-router";
import { COLORS } from "../utils/Colors";
import useThemeStore from "../utils/store";
import Animated, { FadeInUp, FadeInDown } from "react-native-reanimated";
import useUseRegisterStore from "../utils/userRegister";
import useUserLoginStore from "../utils/userLogin";
import Loading from "./components/loading/Loading";

const Register = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(false);
  const { theme, toggleTheme } = useThemeStore();
  const [isUser, setIsUser] = React.useState(false);
  const {
    email,
    fplTeam,
    eplTeam,
    password,
    setEmail,
    setEplTeam,
    setFplTeam,
    register,
    setPassword,
  } = useUseRegisterStore();
  const { login, userEmail, userPassword, setUserEmail, setUserPassWord } =
    useUserLoginStore();

  const bgStyle = theme === "dark" ? styles.welcomeDark : styles.welcomeLight;
  const textColor = theme === "dark" ? styles.textDark : null;
  // console.log(email, fplTeam, eplTeam, password);
  const signIn = async () => {
    setLoading(true);
    const isLoggedIn = await login();
    isLoggedIn
      ? navigation.navigate("(tabs)")
      : Alert.alert("Error", "Check sign up credentials and try again.", [
          { text: "OK" },
        ]);
    setLoading(false);
  };
  const signUp = async () => {
    setLoading(true);
    const isRegistred = await register();
    if (isRegistred) {
      navigation.navigate("(tabs)");
    } else {
      Alert.alert("Error", "Check sign up credentials and try again.", [
        { text: "OK" },
      ]);
    }
    setLoading(false);
  };
  if (loading) {
    return <Loading loading={loading} />;
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        style={{ flex: 1, backgroundColor: bgStyle.backgroundColor }}
        // keyboardShouldPersistTaps="handled"
      >
        <View style={[styles.welcome, bgStyle]}>
          <StatusBar
            barStyle={theme === "dark" ? "light-content" : "dark-content"}
          />
          <Animated.View
            entering={FadeInUp.delay(100).duration(1000).springify().damping(7)}
          >
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
                    Create an account
                  </Text>
                </>
              )}
            </View>
            {/* <View style={{ margin: 15 }}>
        <Button
          title={!isUser ? "Create Account" : "Member?"}
          onPress={() => setIsUser(!isUser)}
        />
      </View> */}
            {/* <Button title="Toggle Theme" onPress={toggleTheme} /> */}
          </Animated.View>
          {/* <Link href={"/Home"} replace asChild>
      <Button title="Login" />
    </Link> */}
          {/* Sign In Form */}
          {isUser ? (
            <Animated.View
              entering={FadeInUp.delay(100).duration(1000)}
              className="justify-around pt-5 pb-10 w-full"
            >
              {/*user - true*/}
              <View className="flex items-center space-y-4 mx-4">
                <View className=" bg-black/5 rounded-xl p-4 w-full">
                  <TextInput
                    value={email}
                    onChangeText={(text) => setEmail(text.toLocaleLowerCase())}
                    placeholder="Enter email address"
                    placeholderTextColor={"gray"}
                  />
                </View>
                <View className=" bg-black/5 rounded-xl p-4 w-full">
                  <TextInput
                    value={fplTeam}
                    onChangeText={(text) => setFplTeam(text)}
                    secureTextEntry={false}
                    placeholder="FPL team name"
                    placeholderTextColor={"gray"}
                  />
                </View>
                <View className=" bg-black/5 rounded-xl p-4 w-full">
                  <TextInput
                    value={eplTeam}
                    onChangeText={(text) => setEplTeam(text)}
                    secureTextEntry={false}
                    placeholder="Favourite EPL team"
                    placeholderTextColor={"gray"}
                  />
                </View>
                <View className=" bg-black/5 rounded-xl p-4 w-full mb-3">
                  <TextInput
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    placeholder="Password"
                    placeholderTextColor={"gray"}
                    secureTextEntry
                  />
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.button} onPress={signUp}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View className="flex-row justify-center mt-5">
                <Text className="text-gray-700">Already have an account?</Text>
                <TouchableOpacity onPress={() => setIsUser(!isUser)}>
                  <Text className="text-blue-500">Log In</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          ) : (
            <Animated.View
              entering={FadeInDown.delay(100).duration(1000)}
              className=" justify-around pt-5 pb-10 w-full"
            >
              <View className="flex items-center space-y-4 mx-4">
                <View className=" bg-black/5 rounded-xl p-5 w-full">
                  <TextInput
                    placeholder="Email"
                    placeholderTextColor={"gray"}
                    value={userEmail}
                    onChangeText={(text) =>
                      setUserEmail(text.toLocaleLowerCase())
                    }
                  />
                </View>
                <View className=" bg-black/5 rounded-xl p-5 w-full mb-3">
                  <TextInput
                    value={userPassword}
                    onChangeText={(text) => setUserPassWord(text)}
                    placeholder="Password"
                    placeholderTextColor={"gray"}
                    secureTextEntry
                  />
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.button} onPress={signIn}>
                    <Text style={styles.buttonText}>Log In</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View className="flex-row justify-center mt-5">
                <Text className="text-gray-700">Don't have an account?</Text>
                <TouchableOpacity onPress={() => setIsUser(!isUser)}>
                  <Text className="text-blue-500">Sign Up</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Register;

const styles = StyleSheet.create({
  welcome: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  test: {
    backgroundColor: COLORS["card-light2"],
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
  buttonText: {
    color: COLORS["text-dark"],
    fontSize: 17,
    fontFamily: "InclusiveSans",
  },
  button: {
    backgroundColor: COLORS["app-dark"],
    padding: 15,
    borderRadius: 10,
    width: 200,
    alignItems: "center",
    marginTop: 20,
  },
});
