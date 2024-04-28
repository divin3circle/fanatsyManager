import { StyleSheet, Text, View, SafeAreaView, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../utils/Colors";

type Fees = {
  title: string;
  fee: number;
  descriptions: string;
  info: string[];
  discount?: number;
};

function TitleBar() {
  return (
    <View style={styles.titlebar}>
      <Ionicons name="chevron-back" size={28} color="black" />
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex: 2,
        }}
      >
        <Text style={styles.titlebarText}>Subscribe</Text>
      </View>
    </View>
  );
}

const Subscribe = () => {
  const fees: Fees[] = [
    {
      title: "Basic Monthly",
      fee: 0.99,
      descriptions: "Billed monthly after free trial",
      info: [
        "7 day free trial",
        "Access to all pro features",
        "Cancel anytime",
      ],
    },
    {
      title: "Premium Yearly",
      fee: 9.99,
      descriptions: "Save 20% with yearly subscription",
      info: [
        "Access to all features",
        "20% discount",
        "24/7 support",
        "Cancel anytime",
      ],
      discount: 20,
    },
  ];
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
      }}
    >
      {/* titlebar */}
      <TitleBar />
      <View style={styles.fee}>
        <View
          style={{
            marginVertical: 20,
            width: "100%",
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontFamily: "InclusiveSans",
            }}
          >
            Plan Title
          </Text>
        </View>
        <View
          style={{
            marginVertical: 20,
            width: "100%",
          }}
        >
          <Text
            style={{
              fontSize: 34,
              fontWeight: "bold",
              color: COLORS.primary,
            }}
          >
            Plan Fee
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: "gray",
              fontFamily: "InclusiveSans",
            }}
          >
            Plan Description
          </Text>
        </View>
        <View
          style={{
            marginVertical: 20,
            width: "100%",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 10,
              gap: 10,
            }}
          >
            <Ionicons
              name="checkmark-circle"
              size={18}
              color={COLORS.primary}
            />
            <Text
              style={{
                fontFamily: "InclusiveSans",
                fontSize: 15,
              }}
            >
              Plan Info
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 10,
              gap: 10,
            }}
          >
            <Ionicons
              name="checkmark-circle"
              size={18}
              color={COLORS.primary}
            />
            <Text
              style={{
                fontFamily: "InclusiveSans",
                fontSize: 15,
              }}
            >
              Plan Info
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 10,
              gap: 10,
            }}
          >
            <Ionicons
              name="checkmark-circle"
              size={18}
              color={COLORS.primary}
            />
            <Text
              style={{
                fontFamily: "InclusiveSans",
                fontSize: 15,
              }}
            >
              Plan Info
            </Text>
          </View>
        </View>
        <Pressable style={styles.footer}>
          <Ionicons name="notifications-outline" size={24} color="black" />
          <Text
            style={{
              fontFamily: "InclusiveSans",
              fontSize: 14,
              marginLeft: 10,
            }}
          >
            Get a reminder before your trial ends
          </Text>
        </Pressable>
        <Pressable
          style={{
            position: "absolute",
            bottom: 20,
            backgroundColor: COLORS.primary,
            width: "80%",
            padding: 10,
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: COLORS["card-light2"],
              fontFamily: "InclusiveSans",
              fontSize: 18,
            }}
          >
            Make Payment
          </Text>
        </Pressable>
      </View>
      <View></View>
    </SafeAreaView>
  );
};

export default Subscribe;

const styles = StyleSheet.create({
  titlebar: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
  },
  titlebarText: {
    fontSize: 20,
    fontFamily: "InclusiveSans",
  },
  fee: {
    backgroundColor: COLORS["card-light"],
    marginHorizontal: 20,
    height: "70%",
    width: "85%",
    borderRadius: 10,
    padding: 20,
    marginTop: 50,
    position: "relative",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  footer: {
    position: "absolute",
    bottom: 80,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
  },
});
