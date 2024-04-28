import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  FlatList,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../utils/Colors";
import { router } from "expo-router";

type Fees = {
  title: string;
  fee: number;
  descriptions: string;
  info: string[];
  discount?: number;
};

function TitleBar() {
  return (
    <Pressable style={styles.titlebar} onPress={() => router.back()}>
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
    </Pressable>
  );
}

function Fee({ fee }: { fee: Fees }) {
  return (
    <View
      style={[
        styles.fee,
        fee.discount ? { borderColor: COLORS.primary, borderWidth: 2 } : null,
      ]}
    >
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
          {fee.title}
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
          ${fee.fee}
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: "gray",
            fontFamily: "InclusiveSans",
          }}
        >
          {fee.descriptions}
        </Text>
      </View>
      <View
        style={{
          marginVertical: 20,
          width: "100%",
        }}
      >
        {fee.info.map((item, index) => {
          return (
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
                {item}
              </Text>
            </View>
          );
        })}
      </View>
      <Pressable style={styles.footer}>
        <Ionicons name="notifications-outline" size={24} color="black" />
        <Text
          style={{
            fontFamily: "InclusiveSans",
            fontSize: 12,
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
        //alignItems: "center",
      }}
    >
      {/* titlebar */}
      <TitleBar />
      <FlatList
        data={fees}
        renderItem={({ item }) => {
          return (
            <View
              key={item.title}
              style={{
                width: 400,
              }}
            >
              <Fee fee={item} />
            </View>
          );
        }}
        keyExtractor={(item) => item.title}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
      {/* <View></View> */}
    </SafeAreaView>
  );
};

export default Subscribe;

const styles = StyleSheet.create({
  titlebar: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
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
    shadowColor: COLORS.primary,
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
