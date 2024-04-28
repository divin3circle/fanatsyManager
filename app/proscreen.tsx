import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

type Fees = {
  title: string;
  fee: number;
  descriptions: string;
  info: string[];
  discount?: number;
};

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
    <SafeAreaView>
      {/* titlebar */}
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
      <View></View>
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
});
