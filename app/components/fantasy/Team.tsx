import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { COLORS } from "../../../utils/Colors";
import { Ionicons } from "@expo/vector-icons";

export const NoTeam = () => {
  return (
    <View style={styles.container}>
      <TextInput
        style={{ height: 25, marginHorizontal: 20, width: "50%" }}
        placeholder="Enter team ID"
      />
    </View>
  );
};

const Team = () => {
  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <View style={styles.nameTextContainer}>
          <Text style={styles.nameText}>Team Name</Text>
        </View>
      </View>
      <View style={styles.pointsContainer}>
        <View style={styles.appPointsContainer}>
          <Text style={styles.pointsText}>Average</Text>
          <Text style={{ fontSize: 25, fontFamily: "InclusiveSans" }}>25</Text>
        </View>
        <View style={styles.userPointsContainer}>
          <Text style={styles.userPointsText}>My Team</Text>
          <Text style={{ fontSize: 30, fontFamily: "InclusiveSans" }}>30</Text>
          <Ionicons name="arrow-forward-outline" size={24} />
        </View>
        <View style={styles.appPointsContainer}>
          <Text style={styles.pointsText}>Highest</Text>
          <Text style={{ fontSize: 25, fontFamily: "InclusiveSans" }}>40</Text>
        </View>
      </View>
      <View style={styles.valueContainer}>
        <View style={styles.appValueContainer}>
          <Text style={{ fontSize: 14, fontFamily: "InclusiveSans" }}>
            Team Value
          </Text>
          <Text style={styles.valueText}>$100</Text>
        </View>
        <View style={styles.rankContainer}>
          <Text style={{ fontSize: 14, fontFamily: "InclusiveSans" }}>
            My Rank
          </Text>
          <Text style={styles.rankText}>10,000,000</Text>
        </View>
        <View style={styles.appValueContainer}>
          <Text style={{ fontSize: 14, fontFamily: "InclusiveSans" }}>
            GameWeek
          </Text>
          <Text style={styles.valueText}>33/37</Text>
        </View>
      </View>
    </View>
  );
};

export default Team;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS["card-light"],
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
    padding: 10,
    flexDirection: "column",
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nameTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: 10,
  },
  nameText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 17,
    fontFamily: "InclusiveSans",
  },

  pointsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    padding: 10,
  },
  appPointsContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  userPointsContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    width: "40%",

    padding: 10,
  },
  pointsText: {
    fontSize: 15,
    fontFamily: "InclusiveSans",
  },
  userPointsText: {
    fontSize: 20,
    fontFamily: "InclusiveSans",
  },

  valueContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,

    paddingHorizontal: 10,
  },
  appValueContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  rankContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "45%",
    padding: 10,
  },
  valueText: {
    fontSize: 20,
    fontFamily: "InclusiveSans",
  },
  rankText: {
    fontSize: 14,
    fontFamily: "InclusiveSans",
  },
});
