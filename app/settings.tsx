import {
  Pressable,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

const Settings = () => {
  const [isPro, setIsPro] = React.useState<boolean>(false);
  return (
    <View
      style={{
        paddingHorizontal: 10,
        backgroundColor: "white",
        flex: 1,
      }}
    >
      {/* search */}
      <View style={styles.searchContainer}>
        <TextInput style={styles.search} placeholder="Search setting" />
        <Ionicons name="search-outline" size={24} color="gray" />
      </View>

      {/* account */}
      <View>
        <Text style={styles.title}>Account</Text>
        <View style={styles.settingContainer}>
          <View style={styles.setting}>
            <View style={styles.info}>
              <Text style={styles.text}>Membership</Text>
              <Text style={styles.infoText}>
                {isPro
                  ? "You are already a pro manager"
                  : "Be a pro manager for only $.99"}
              </Text>
            </View>
            <View>
              {isPro ? (
                <Ionicons
                  name="checkmark-circle-outline"
                  size={24}
                  color="green"
                />
              ) : (
                <Ionicons name="arrow-forward" size={24} color="gray" />
              )}
            </View>
          </View>
          <View style={styles.divider}></View>
          <View style={styles.setting}>
            <View style={styles.info}>
              <Text style={styles.text}>Email</Text>
              <Text style={styles.infoText}>
                Your email address is verified
              </Text>
            </View>
            <View>
              <Text style={styles.infoText}>test@gmail.com</Text>
            </View>
          </View>
          <View style={styles.divider}></View>
          <View style={styles.setting}>
            <View style={styles.info}>
              <Text style={styles.text}>Password</Text>
              <Text style={styles.infoText}>
                Change your password or reset it
              </Text>
            </View>
            <View>
              <Text style={styles.infoText}>******</Text>
            </View>
          </View>
        </View>
      </View>

      {/* preferences */}
      <View>
        <Text style={styles.title}>Preferences</Text>
        <View style={styles.settingContainer}>
          <View style={styles.setting}>
            <View style={styles.info}>
              <Text style={styles.text}>Notifications</Text>
              <Text style={styles.infoText}>
                Allow notifications for important updates
              </Text>
            </View>
            <View>
              <Switch value={true} />
            </View>
          </View>
          <View style={styles.divider}></View>
          <View style={styles.setting}>
            <View style={styles.info}>
              <Text style={styles.text}>Language</Text>
              <Text style={styles.infoText}>
                Select your preferred language
              </Text>
            </View>
            <View>
              <Text style={styles.infoText}>English</Text>
            </View>
          </View>
          <View style={styles.divider}></View>
          <View style={styles.setting}>
            <View style={styles.info}>
              <Text style={styles.text}>Dark Mode</Text>
              <Text style={styles.infoText}>
                Toggle dark mode for better viewing experience
              </Text>
            </View>
            <View>
              <Switch value={false} />
            </View>
          </View>
        </View>
      </View>
      <Pressable
        style={{
          backgroundColor: "#ff67f7",
          padding: 10,
          margin: 10,
          marginVertical: 20,
          borderRadius: 10,
          paddingHorizontal: 20,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "white",
            fontFamily: "InclusiveSans",
            fontSize: 18,
          }}
        >
          Log out
        </Text>
      </Pressable>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  searchContainer: {
    marginVertical: 10,
    marginTop: 20,
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  search: {
    color: "gray",
  },
  settingContainer: {
    padding: 10,
    marginHorizontal: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 10,
  },
  setting: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  text: {
    fontSize: 18,
    fontFamily: "InclusiveSans",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "InclusiveSans",
    marginVertical: 10,
    marginHorizontal: 10,
  },
  info: {
    width: "65%",
  },
  infoText: {
    color: "gray",
    fontSize: 12,
    fontFamily: "InclusiveSans",
  },
  icon: {},
  divider: {
    width: "100%",
    height: StyleSheet.hairlineWidth,
    backgroundColor: "gray",
    marginVertical: 5,
  },
});
