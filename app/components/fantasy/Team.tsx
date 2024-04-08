import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS } from "../../../utils/Colors";
import { Ionicons } from "@expo/vector-icons";
import { teams } from "../../../utils/Data";
import { PlayerInformation } from "../../(tabs)/Fantasy";
import { Skeleton } from "moti/skeleton";

type ChipPlay = {
  chip_name: string;
  num_played: number;
};

type TopElementInfo = {
  id: number;
  points: number;
};

type GameWeek = {
  id: number;
  name: string;
  deadline_time: string;
  release_time: string | null;
  average_entry_score: number;
  finished: boolean;
  data_checked: boolean;
  highest_scoring_entry: number;
  deadline_time_epoch: number;
  deadline_time_game_offset: number;
  highest_score: number;
  is_previous: boolean;
  is_current: boolean;
  is_next: boolean;
  cup_leagues_created: boolean;
  h2h_ko_matches_created: boolean;
  ranked_count: number;
  chip_plays: ChipPlay[];
  most_selected: number;
  most_transferred_in: number;
  top_element: number;
  top_element_info: TopElementInfo;
  transfers_made: number;
  most_captained: number;
  most_vice_captained: number;
};

export const NoTeam = () => {
  const [teamId, setTeamId] = useState<number | null>(null);
  const [eventInfo, setEventInfo] = useState<any>(null);

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 20,
          fontFamily: "InclusiveSans",
          textAlign: "center",
          padding: 10,
          marginBottom: 10,
        }}
      >
        Please provide FPL Team ID
      </Text>
      <View
        style={{
          width: "100%",

          justifyContent: "center",
          alignItems: "center",
          padding: 10,
        }}
      >
        <TextInput
          style={{
            height: 40,
            marginHorizontal: 20,
            width: "80%",
            padding: 5,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: COLORS.primary,
            textAlign: "center",
            fontFamily: "InclusiveSans",
          }}
          placeholder="Enter team ID"
          keyboardType="numeric"
        />
      </View>
    </View>
  );
};

const Team = ({
  playerInformation,
}: {
  playerInformation: PlayerInformation | null;
}) => {
  const [currentEvent, setCurrentEvent] = useState<number>(
    playerInformation?.current_event!
  );
  const [eventInfo, setEventInfo] = useState<GameWeek | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [favTeamID, setFavTeamID] = useState<number | null>(null);

  const fetchEventInfo = async (id: number) => {
    if (currentEvent) {
      try {
        setLoading(true);
        const res = await fetch(
          "https://fantasy.premierleague.com/api/bootstrap-static/"
        );
        const data = await res.json();
        const events: GameWeek[] = data.events;
        const currEvent = events.filter((event) => event.id === id);
        setEventInfo(currEvent[0]);
        setLoading(false);
      } catch (error) {
        console.error(error, "Error fetching data");
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const favTeam = playerInformation?.favourite_team! - 1;
    setFavTeamID(favTeam);
    setCurrentEvent(playerInformation?.current_event ?? 0);
  }, [playerInformation]);

  useEffect(() => {
    if (currentEvent) {
      fetchEventInfo(currentEvent);
      console.log(eventInfo?.average_entry_score, eventInfo?.highest_score);
    }
  }, [currentEvent]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <View style={styles.nameTextContainer}>
          <Text style={styles.nameText}>{playerInformation?.name}</Text>
        </View>
      </View>
      <View style={styles.pointsContainer}>
        <View style={styles.appPointsContainer}>
          <Text style={styles.pointsText}>Average</Text>
          <Skeleton show={loading} colorMode="light" height={50} width={50}>
            <Text
              style={{
                fontSize: 25,
                fontFamily: "InclusiveSans",
                marginTop: 5,
              }}
            >
              {eventInfo?.average_entry_score}
            </Text>
          </Skeleton>
        </View>
        <View style={styles.userPointsContainer}>
          <Text style={styles.userPointsText}>My Team</Text>
          <Text style={{ fontSize: 30, fontFamily: "InclusiveSans" }}>
            {playerInformation?.summary_event_points}
          </Text>
          <Ionicons name="arrow-forward-outline" size={24} />
        </View>
        <View style={styles.appPointsContainer}>
          <Text style={styles.pointsText}>Highest</Text>
          <Skeleton show={loading} colorMode="light" height={50} width={50}>
            <Text
              style={{
                fontSize: 25,
                fontFamily: "InclusiveSans",
                marginTop: 5,
              }}
            >
              {eventInfo?.highest_score}
            </Text>
          </Skeleton>
        </View>
      </View>
      <View style={styles.valueContainer}>
        <View style={[styles.appValueContainer, { width: "27%" }]}>
          {/* <Text style={{ fontSize: 14, fontFamily: "InclusiveSans" }}>
            Base Team
          </Text> */}
          <Image
            source={teams[favTeamID!].logo}
            style={{ width: 40, height: 40 }}
          />
        </View>
        <View style={styles.rankContainer}>
          <Text style={{ fontSize: 14, fontFamily: "InclusiveSans" }}>
            My Rank
          </Text>
          <Text style={styles.rankText}>
            {playerInformation?.summary_overall_rank.toLocaleString()}
          </Text>
        </View>
        <View style={styles.appValueContainer}>
          <Text style={{ fontSize: 14, fontFamily: "InclusiveSans" }}>
            GameWeek
          </Text>
          <Text style={styles.valueText}>
            {playerInformation?.current_event}/37
          </Text>
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
