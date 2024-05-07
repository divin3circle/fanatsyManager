import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams, Link, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../utils/Colors";
import { PlayerData } from "../utils/Suggested";
import { ScrollView } from "moti";
import { handleProActions } from "../utils/Subscribe";
import { useNavigation } from "@react-navigation/native";

const AdditionalStats = () => {
  const navigation = useNavigation();
  const params = useLocalSearchParams();
  const [season, setSeason] = React.useState();
  let p: PlayerData | null;
  let pd;
  const { player, playerData } = params;

  if (typeof player === "string" && typeof playerData === "string") {
    p = JSON.parse(player);
    pd = JSON.parse(playerData);
  } else {
    p = null;
    pd = null;
  }

  // console.log(p, pd);

  if (!p && !pd) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontFamily: "InclusiveSans",
          }}
        >
          Aww Snap😞!
        </Text>
        <Link
          href="/(tabs)/Home"
          style={{
            marginVertical: 20,
            padding: 10,
          }}
        >
          <Pressable>
            <Text
              style={{
                fontSize: 15,
                fontFamily: "InclusiveSans",
                color: "gray",
              }}
            >
              Couldn't load the stats. Try again later
            </Text>
          </Pressable>
        </Link>
      </View>
    );
  }
  const seasonalStats = [
    "dreamteam_count",
    "element_type",
    "minutes",
    "goals_scored",
    "assists",
    "clean_sheets",
    "goals_conceded",
    "own_goals",
    "penalties_saved",
    "penalties_missed",
    "yellow_cards",
    "red_cards",
    "saves",
    "starts",
    "expected_goals",
    "expected_assists",
    "expected_goal_involvements",
    "expected_goals_conceded",
    "expected_goals_per_90",
    "saves_per_90",
    "expected_assists_per_90",
    "expected_goal_involvements_per_90",
    "expected_goals_conceded_per_90",
    "goals_conceded_per_90",
    "clean_sheets_per_90",
    "combined_index",
  ];
  const keyMapping = {
    dreamteam_count: "TOTW Appearances",
    element_type: "Position",
    minutes: "Minutes",
    goals_scored: "Goals scored",
    assists: "Assists",
    clean_sheets: "Clean sheets",
    goals_conceded: "Goals conceded",
    own_goals: "Own goals",
    penalties_saved: "Penalties Saved",
    penalties_missed: "Penalties missed",
    yellow_cards: "Yellow cards",
    red_cards: "Red cards",
    saves: "Saves",
    starts: "Starts",
    expected_goals: "XG",
    expected_assists: "XA",
    expected_goal_involvements: "XGI",
    expected_goals_conceded: "XG conceded",
    expected_goals_per_90: "XG per 90",
    saves_per_90: "Saves per 90",
    expected_assists_per_90: "XA per 90",
    expected_goal_involvements_per_90: "XGI per 90",
    expected_goals_conceded_per_90: "XG conceded per 90",
    goals_conceded_per_90: "Goals conceded per 90",
    clean_sheets_per_90: "Clean sheets per 90",
    combined_index: "Combined Index",
  };
  const fplStats = [
    "chance_of_playing_next_round",
    "chance_of_playing_this_round",
    "total_points",
    "event_points",
    "form",
    "form_rank_type",
    "points_per_game",
    "points_per_game_rank_type",
    "selected_by_percent",
    "selected_rank_type",
    "transfers_in_event",
    "transfers_out_event",
    "bonus",
    "influence_rank_type",
    "creativity_rank_type",
    "threat_rank_type",
    "ict_index_rank",
    "starts_per_90",
  ];
  const fplStatsKeyMapping = {
    chance_of_playing_next_round: "Chance of Playing Next Round",
    chance_of_playing_this_round: "Chance of Playing This Round",
    total_points: "Total Points",
    event_points: "Event Points",
    form: "Form",
    form_rank_type: "Form Rank",
    points_per_game: "Points Per Game",
    points_per_game_rank_type: "Points Per Game Rank",
    selected_by_percent: "Selected By Percent",
    selected_rank_type: "Selected Rank",
    transfers_in_event: "Transfers In",
    transfers_out_event: "Transfers Out",
    bonus: "Bonus",
    influence_rank_type: "Influence Rank",
    creativity_rank_type: "Creativity Rank",
    threat_rank_type: "Threat Rank",
    ict_index_rank: "ICT Index Rank",
    starts_per_90: "Starts Per 90",
  };

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          //   justifyContent: "space-between",
          alignItems: "center",
          marginVertical: 15,
          marginHorizontal: 10,
        }}
      >
        <Pressable
          style={{
            flex: 2,
          }}
          onPress={() => router.back()}
        >
          <Ionicons name="close" size={28} color="black" />
        </Pressable>
        <View
          style={{
            flex: 4,
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontFamily: "InclusiveSans",
            }}
          >
            {p.first_name} {p.second_name}
          </Text>
        </View>
        <Pressable
          style={{
            flex: 2,
          }}
        >
          <Text
            style={{
              color: "blue",
              fontSize: 15,
              fontFamily: "InclusiveSans",
            }}
          >
            Compare
          </Text>
        </Pressable>
      </View>
      <ScrollView
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            marginHorizontal: 5,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            backgroundColor: "white",
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            borderTopRightRadius: 10,
            width: "95%",
          }}
        >
          <View
            style={{
              backgroundColor: "#38003c",
              width: "30%",
              borderBottomRightRadius: 10,
              // borderBottomLeftRadius: 10,
              paddingVertical: 5,
              marginBottom: 5,
              marginHorizontal: 0,
            }}
          >
            <Text style={styles.positionText}>Seasonal Stats</Text>
          </View>
          <View>
            {p ? (
              Object.keys(p)
                .filter((key) => {
                  if (p["element_type"] === 1 && key === "penalties_missed") {
                    return false; // don't show 'penalties_missed' when 'element_type' is 1
                  }
                  if (
                    p["element_type"] > 1 &&
                    [
                      "saves",
                      "clean_sheets",
                      "saves_per_90",
                      "clean_sheets_per_90",
                      "penalties_saved",
                    ].includes(key)
                  ) {
                    return false; // don't show these keys when 'element_type' is greater than 1
                  }
                  if (
                    p["element_type"] >= 3 &&
                    [
                      "expected_goals_conceded",
                      "expected_goals_conceded_per_90",
                      "goals_conceded_per_90",
                      "goals_conceded",
                    ].includes(key)
                  ) {
                    return false; // don't show these keys when 'element_type' is greater than or equal to 3
                  }
                  return seasonalStats.includes(key);
                })
                .map((key, index) => (
                  <View key={index}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        padding: 10,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          fontFamily: "InclusiveSans",
                          fontWeight: "bold",
                        }}
                      >
                        {keyMapping[key]}
                      </Text>
                      <Text
                        style={{
                          color: "gray",
                          fontSize: 14,
                          fontFamily: "InclusiveSans",
                          fontWeight: "bold",
                        }}
                      >
                        {key.includes("minutes")
                          ? p[key].toLocaleString()
                          : p[key]}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "100%",
                        height: StyleSheet.hairlineWidth,
                        backgroundColor: "gray",
                      }}
                    ></View>
                  </View>
                ))
            ) : (
              <Text>An Error occurred</Text>
            )}
          </View>
          <View
            style={{
              backgroundColor: "#38003c",
              width: "30%",
              borderBottomRightRadius: 10,
              // borderBottomLeftRadius: 10,
              paddingVertical: 5,
              marginBottom: 5,
              marginHorizontal: 0,
              // marginTop: 10,
            }}
          >
            <Text style={styles.positionText}>FPL Stats</Text>
          </View>
          <View
            style={{
              marginBottom: 10,
            }}
          >
            {p ? (
              Object.keys(p)
                .filter((key) => fplStats.includes(key))
                .map((key, index) => (
                  <View key={index}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        padding: 10,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          fontFamily: "InclusiveSans",
                          fontWeight: "bold",
                        }}
                      >
                        {fplStatsKeyMapping[key]}
                        <Text
                          style={{
                            color: "gray",
                            fontSize: 12,
                          }}
                        >
                          {" "}
                          {key.includes("rank") &&
                          p.element_type === 1 &&
                          key !== "ict_index_rank"
                            ? " (Goalkeepers)"
                            : null}
                          {key.includes("rank") &&
                          p.element_type === 2 &&
                          key !== "ict_index_rank"
                            ? " (Defenders)"
                            : null}
                          {key.includes("rank") &&
                          p.element_type === 3 &&
                          key !== "ict_index_rank"
                            ? " (Midfielders)"
                            : null}
                          {key.includes("rank") &&
                          p.element_type === 4 &&
                          key !== "ict_index_rank"
                            ? " (Attackers)"
                            : null}
                        </Text>
                      </Text>
                      <Text
                        style={{
                          color: "gray",
                          fontSize: 14,
                          fontFamily: "InclusiveSans",
                          fontWeight: "bold",
                        }}
                      >
                        {key.includes("transfer")
                          ? p[key].toLocaleString()
                          : p[key]}

                        {key === "chance_of_playing_next_round" ||
                        key === "chance_of_playing_this_round" ||
                        key === "selected_by_percent"
                          ? "%"
                          : ""}
                        {key.includes("rank") &&
                        p.element_type === 1 &&
                        key !== "ict_index_rank"
                          ? " / 98"
                          : null}
                        {key.includes("rank") &&
                        p.element_type === 2 &&
                        key !== "ict_index_rank"
                          ? " / 276"
                          : null}
                        {key.includes("rank") &&
                        p.element_type === 3 &&
                        key !== "ict_index_rank"
                          ? " / 370"
                          : null}
                        {key.includes("rank") &&
                        p.element_type === 4 &&
                        key !== "ict_index_rank"
                          ? " / 113"
                          : null}
                        {key === "ict_index_rank" ? " / 857" : null}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "100%",
                        height: StyleSheet.hairlineWidth,
                        backgroundColor: "gray",
                      }}
                    ></View>
                  </View>
                ))
            ) : (
              <Text>An Error occurred</Text>
            )}
          </View>
        </View>

        <View
          style={{
            marginHorizontal: 10,
            marginBottom: 100,
          }}
        >
          <Pressable
            style={{
              backgroundColor: COLORS.primary,
              borderRadius: 10,
              padding: 10,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginVertical: 10,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
            onPress={() => handleProActions(false, navigation)}
          >
            <Text
              style={{
                fontFamily: "InclusiveSans",
                color: "white",
                marginHorizontal: 5,
              }}
            >
              Digest this data
            </Text>
            <Ionicons name="analytics-outline" size={24} color="white" />
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default AdditionalStats;

const styles = StyleSheet.create({
  positionText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
    fontFamily: "InclusiveSans",
    color: COLORS.primary,
  },
});
