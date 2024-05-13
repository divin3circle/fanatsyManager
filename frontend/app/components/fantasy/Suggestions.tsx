import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS } from "../../../utils/Colors";
import { def, gks, jerseys, mid, strikers } from "../../../utils/Data";
import { Ionicons } from "@expo/vector-icons";
import {
  combinedIndexCalculator,
  combinedIndexCalculatorGks,
  fetchData,
  PlayerData,
  sortByIndex,
  sortPlayers,
} from "../../../utils/Suggested";
import { Skeleton } from "moti/skeleton";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Link } from "expo-router";
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";

type PositionProps = {
  position: number;
  players: PlayerData[];
};
export type Bootstrap = {
  events: any[];
  game_settings: any;
  phases: any[];
  teams: any[];
  total_players: number;
  elements: PlayerData[];
  element_stats: any[];
  element_types: any[];
};
type PlayerStats = {
  player: PlayerData;
};
const Player = (player: any) => {
  return (
    <View style={styles.playerContainer}>
      <Link href={`/player/${player.element}`} asChild>
        <Pressable style={styles.iconContainer}>
          <Ionicons name="information-outline" size={24} />
        </Pressable>
      </Link>
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
            source={jerseys[player.teamID].jerseyImage}
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.textName}>{player.name}</Text>
          <Text style={styles.textTeam}>
            {jerseys[player.teamID].name.toLocaleUpperCase()}
          </Text>
        </View>
      </View>
      <View
        style={{ height: "100%", backgroundColor: "gray", width: 1 }}
      ></View>
      <View style={{ width: "10%" }}>
        <Text
          style={{
            fontFamily: "InclusiveSans",
            fontSize: 12,
          }}
        >
          {Number(player.ownership).toFixed(0)}%
        </Text>
      </View>
      <View
        style={{ height: "100%", backgroundColor: "gray", width: 1 }}
      ></View>
      <View style={{ width: "8%" }}>
        <Text
          style={{
            fontFamily: "InclusiveSans",
            fontSize: 12,
          }}
        >
          {player.combined_index?.toFixed(1) * 100}%
        </Text>
      </View>
    </View>
  );
};

const fetchSuggestions = async ({ queryKey }: QueryFunctionContext) => {
  const [_key, position] = queryKey;
  const data = await fetch(
    `http://192.168.100.11:3000/api/fantasy/suggested/${position}`
  );
  return data.json();
};

const Position = ({ position }: { position: number }) => {
  const playerPosition =
    position == 1
      ? "Goalkeepers"
      : position == 2
      ? "Defenders"
      : position == 3
      ? "Midfielders"
      : position === 4
      ? "Forwards"
      : "Captains";

  const { data, isLoading, error } = useQuery({
    queryKey: ["suggestedPlayers", position],
    queryFn: fetchSuggestions,
  });
  // console.log(data, isLoading, error);
  let slicedData;
  if (data) {
    slicedData = data?.suggestions.slice(0, 3);
  }

  return (
    <Animated.View
      entering={FadeInDown.delay(100).duration(1000)}
      style={styles.positionContainer}
    >
      <Skeleton show={isLoading} colorMode="light">
        <View>
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
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: "InclusiveSans",
                  fontSize: 12,
                }}
              >
                Info
              </Text>
              <Text
                style={{
                  width: "30%",
                  textAlign: "center",
                  fontFamily: "InclusiveSans",
                  fontSize: 12,
                }}
              >
                Name
              </Text>
              <Text
                style={{
                  width: "10%",
                  textAlign: "center",
                  fontFamily: "InclusiveSans",
                  fontSize: 12,
                }}
              >
                Own
              </Text>
              <Text
                style={{
                  width: "10%",
                  textAlign: "center",
                  fontFamily: "InclusiveSans",
                  fontSize: 12,
                }}
              >
                Index
              </Text>
            </View>
          </View>
          <View>
            {slicedData &&
              !isLoading &&
              !error &&
              slicedData?.map((player: any) => {
                return (
                  <View key={player.element}>
                    <Skeleton show={isLoading} height={100} colorMode="light">
                      <Player {...player} />
                    </Skeleton>
                  </View>
                );
              })}
          </View>
        </View>
      </Skeleton>
    </Animated.View>
  );
};

const Suggestions = ({ gameWeek }: { gameWeek: number | undefined }) => {
  return (
    <ScrollView>
      <View style={styles.titleContainer}>
        <Text style={{ fontFamily: "InclusiveSans", fontSize: 20 }}>
          Suggested Transfers
        </Text>
        <Text
          style={{ fontFamily: "InclusiveSans", fontSize: 17, color: "gray" }}
        >
          Gameweek {gameWeek ? ++gameWeek : ""}
        </Text>
      </View>
      <View>
        <Position position={1} />
      </View>
      <View>
        <Position position={2} />
      </View>
      <View>
        <Position position={3} />
      </View>
      <View>
        <Position position={4} />
      </View>
      {/* <View style={styles.titleContainer}>
        <Text style={{ fontFamily: "InclusiveSans", fontSize: 20 }}>
          Captain Picks
        </Text>
        <Text
          style={{ fontFamily: "InclusiveSans", fontSize: 17, color: "gray" }}
        >
          Gameweek {gameWeek ? gameWeek : ""}
        </Text>
      </View>
      <View>
        <Position players={captains} loading={loading} />
      </View> */}
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
    fontSize: 15,
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
    fontSize: 15,
  },
  textTeam: {
    fontFamily: "InclusiveSans",
    fontSize: 11,
    color: "gray",
  },
});
