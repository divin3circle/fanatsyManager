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
const Player = (player: PlayerData) => {
  return (
    <View style={styles.playerContainer}>
      <Link href={`/player/${player.code}`} asChild>
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
            source={jerseys[player.team].jerseyImage}
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.textName}>{player.web_name}</Text>
          <Text style={styles.textTeam}>
            {jerseys[player.team].name.toLocaleUpperCase()}
          </Text>
        </View>
      </View>
      <View
        style={{ height: "100%", backgroundColor: "gray", width: 1 }}
      ></View>
      <View style={{ width: "8%" }}>
        <Text>{Number(player.selected_by_percent).toFixed(0)}%</Text>
      </View>
      <View
        style={{ height: "100%", backgroundColor: "gray", width: 1 }}
      ></View>
      <View style={{ width: "8%" }}>
        <Text>{player.combined_index?.toFixed(1)}</Text>
      </View>
    </View>
  );
};

const Position = ({
  position,
  players,
  loading,
}: {
  position?: number;
  players: PlayerData[] | null;
  loading: boolean;
}) => {
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
  return (
    <Animated.View
      entering={FadeInDown.delay(100).duration(1000)}
      style={styles.positionContainer}
    >
      <Skeleton show={loading} colorMode="light">
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
                Own
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
            {players?.map((player) => {
              return (
                <View key={player.code}>
                  <Skeleton show={loading} height={100} colorMode="light">
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
  const [gk, setGk] = useState<PlayerData[] | null>(null);
  const [defs, setDef] = useState<PlayerData[] | null>(null);
  const [mids, setMid] = useState<PlayerData[] | null>(null);
  const [sts, setSts] = useState<PlayerData[] | null>(null);
  const [captains, setCaptains] = useState<PlayerData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getSuggestedPlayers = async (url: string) => {
    try {
      setLoading(true);
      //fetch bootstrap data
      const players: Bootstrap = await fetchData(url);
      //sort players into positions
      const { gks, def, mid, st } = sortPlayers(players.elements);
      //sort players by index(ict)
      const sortedGks = sortByIndex(gks);
      const sortedDefs = sortByIndex(def);
      const sortedMids = sortByIndex(mid);
      const sortedSts = sortByIndex(st);
      //sort captains by ict
      const sortedCaptains = sortByIndex(players.elements);
      //calculate CI for top 3 players
      const suggestedGks = combinedIndexCalculatorGks(sortedGks);
      const suggestedDefs = combinedIndexCalculatorGks(sortedDefs);
      const suggestedMids = combinedIndexCalculator(sortedMids);
      const suggestedSts = combinedIndexCalculator(sortedSts);
      const suggestedCaptains = combinedIndexCalculator(sortedCaptains);
      //set state
      setGk(suggestedGks);
      setDef(suggestedDefs);
      setMid(suggestedMids);
      setSts(suggestedSts);
      setCaptains(suggestedCaptains);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getSuggestedPlayers(
      "https://fantasy.premierleague.com/api/bootstrap-static/"
    );
    // );
  }, []);

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
        <Position position={1} players={gk} loading={loading} />
      </View>
      <View>
        <Position position={2} players={defs} loading={loading} />
      </View>
      <View>
        <Position position={3} players={mids} loading={loading} />
      </View>
      <View>
        <Position position={4} players={sts} loading={loading} />
      </View>
      <View style={styles.titleContainer}>
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
