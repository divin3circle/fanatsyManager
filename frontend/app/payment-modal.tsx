import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const Pay = () => {
  return (
    <View style={{}}>
      {/* apple pay */}
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            width: "90%",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#000",
            borderRadius: 10,
            marginHorizontal: 10,
            paddingVertical: 15,
            marginVertical: 5,
          }}
        >
          <Ionicons name="logo-apple" size={24} color="white" />
          <Text
            style={{
              fontFamily: "InclusiveSans",
              fontSize: 20,
              color: "white",
            }}
          >
            Pay
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            width: "90%",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff",
            borderRadius: 10,
            marginHorizontal: 10,
            paddingVertical: 15,
            marginVertical: 5,
          }}
        >
          <Ionicons name="logo-google" size={24} color="black" />
          <Text
            style={{
              fontFamily: "InclusiveSans",
              fontSize: 20,
              color: "black",
            }}
          >
            Google Pay
          </Text>
        </View>
      </View>
      {/* divider */}
      <View
        style={{
          marginHorizontal: 10,
        }}
      >
        <View
          style={{
            backgroundColor: "gray",
            height: 1,
            marginVertical: 20,
            width: "100%",
          }}
        ></View>
      </View>
      {/* card info */}
      <View></View>
      {/* billing address */}
      <View></View>
      {/* terms & conditions */}
      <View></View>
      {/* pay */}
      <View></View>
    </View>
  );
};

export default Pay;

const styles = StyleSheet.create({});
