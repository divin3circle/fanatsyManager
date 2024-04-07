import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import React from "react";
import { COLORS } from "../../../utils/Colors";
import { def, gks, jerseys, mid, strikers } from "../../../utils/Data";
import { Ionicons } from "@expo/vector-icons";

type PositionProps = {
  position: number;
  players: any[];
};
const Player = ({ player }: any) => {
  return (
    <View style={styles.playerContainer}>
      <View style={styles.iconContainer}>
        <Ionicons name="information-outline" size={24} />
      </View>
      <View
        style={{ height: "100%", backgroundColor: "gray", width: 1 }}
      ></View>
      <View style={styles.detailsContainer}>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <View style={{ marginBottom: 5, height: 5 }}></View>
          <Image
            style={{
              width: 20,
              height: 70,
              alignItems: "center",
              justifyContent: "center",
            }}
            source={jerseys[player.team_id].jerseyImage}
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.textName}>{player.name}</Text>
          <Text style={styles.textTeam}>
            {jerseys[player.team_id].name.toLocaleUpperCase()}
          </Text>
        </View>
      </View>
      <View
        style={{ height: "100%", backgroundColor: "gray", width: 1 }}
      ></View>
      <View style={{ width: "8%" }}>
        <Text>€{player.price}</Text>
      </View>
      <View
        style={{ height: "100%", backgroundColor: "gray", width: 1 }}
      ></View>
      <View style={{ width: "8%" }}>
        <Text>{player.combined_index}</Text>
      </View>
    </View>
  );
};

const Position = ({ position, players }: PositionProps) => {
  const playerPosition =
    position == 1
      ? "Goalkeepers"
      : position == 2
      ? "Defenders"
      : position == 3
      ? "Midfielders"
      : "Forwards";
  return (
    <View style={styles.positionContainer}>
      <View
        style={{
          width: "100%",
          borderTopColor: "gray",
          borderTopWidth: 1,
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <View
          style={{
            backgroundColor: "#38003c",
            width: "50%",
            borderBottomRightRadius: 15,
            borderBottomLeftRadius: 15,
            paddingVertical: 5,
            marginBottom: 5,
          }}
        >
          <Text style={styles.positionText}>{playerPosition}</Text>
        </View>
        <View style={styles.playerContainer}>
          <Text>Info</Text>
          <Text
            style={{
              width: "30%",
              textAlign: "center",
              fontFamily: "InclusiveSans",
            }}
          >
            Name
          </Text>
          <Text
            style={{
              width: "10%",
              textAlign: "center",
              fontFamily: "InclusiveSans",
            }}
          >
            Price
          </Text>
          <Text
            style={{
              width: "10%",
              textAlign: "center",
              fontFamily: "InclusiveSans",
            }}
          >
            Index
          </Text>
        </View>
      </View>
      <View>
        {players.map((player) => {
          return (
            <View key={player.id}>
              <Player player={player} />
            </View>
          );
        })}
      </View>
    </View>
  );
};

const Suggestions = () => {
  return (
    <ScrollView>
      <View style={styles.titleContainer}>
        <Text style={{ fontFamily: "InclusiveSans", fontSize: 20 }}>
          Suggested Transfers
        </Text>
        <Text
          style={{ fontFamily: "InclusiveSans", fontSize: 17, color: "gray" }}
        >
          Gameweek 34
        </Text>
      </View>
      <View>
        <Position position={1} players={gks} />
      </View>
      <View>
        <Position position={2} players={def} />
      </View>
      <View>
        <Position position={3} players={mid} />
      </View>
      <View>
        <Position position={4} players={strikers} />
      </View>
    </ScrollView>
  );
};

export default Suggestions;

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  positionContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  positionText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 17,
    fontFamily: "InclusiveSans",
    color: COLORS.primary,
  },
  playerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginVertical: 5,
    backgroundColor: COLORS["card-light"],
    width: "100%",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  infoContainer: {
    flexDirection: "column",
    justifyContent: "center",
  },
  iconContainer: {
    width: "5%",
  },
  detailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "32%",
    justifyContent: "space-evenly",
  },
  textName: {
    fontFamily: "InclusiveSans",
    fontSize: 17,
  },
  textTeam: {
    fontFamily: "InclusiveSans",
    fontSize: 12,
    color: "gray",
  },
});
