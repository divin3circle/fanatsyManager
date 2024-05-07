import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Pressable,
} from "react-native";
import React, { useEffect } from "react";
import { COLORS } from "../../../utils/Colors";
import { Skeleton } from "moti/skeleton";
import { jerseys } from "../../../utils/Data";
import { Link } from "expo-router";

type PlayerProps = {
  element: number;
  points: number;
  position: number;
};
type PlayerDataProps = {
  id: number;
  code: number;
  team_h: number;
  team_h_score: number | null;
  team_a: number;
  team_a_score: number | null;
  event: number;
  finished: boolean;
  minutes: number;
  provisional_start_time: boolean;
  kickoff_time: string;
  event_name: string;
  is_home: boolean;
  difficulty: number;
};
const Player = ({ element, points, position }: PlayerProps) => {
  const [playerData, setPlayerData] = React.useState<PlayerDataProps[] | null>(
    null
  );
  const [playerTeamId, setPlayerTeamId] = React.useState<number>(0);
  const [elementIDN, setElementIDN] = React.useState<number | null>(null);
  const [playerName, setPlayerName] = React.useState<string>("");
  const [form, setForm] = React.useState<number>(0);
  const [totalPoints, setTotalPoints] = React.useState<number>(0);
  const [price, setPrice] = React.useState<number>(0);
  const [own, setOwn] = React.useState<number>(0);
  const [jersey, setJersey] = React.useState<number>(0);
  //TODO: Fix loading typo
  const [laodingPlayerData, setLoadingPlayerData] =
    React.useState<boolean>(true);
  const fetchData = async (url: string) => {
    const response = await fetch(url);
    return await response.json();
  };

  const handleElementSummaryResponse = (data: any) => {
    const firstFixture = data.fixtures[0];
    const elementID = firstFixture.element;
    setElementIDN(elementID);
    const teamId = firstFixture.is_home
      ? firstFixture.team_h
      : firstFixture.team_a;
    setJersey(teamId);
    setPlayerTeamId(teamId);
    setPlayerData(firstFixture);
  };

  const handleBootstrapResponse = (data: any, element: number) => {
    const players = data.elements as any[];
    const player = players.find((player) => player.id === element);
    setElementIDN(player.code);
    setForm(player.form);
    setTotalPoints(player.total_points);
    setPrice(player.ict_index);
    setOwn(player.selected_by_percent);
    const playerName = player.first_name + " " + player.second_name;
    setPlayerName(playerName);
  };

  const fetchTeam = async (element: number) => {
    try {
      setLoadingPlayerData(true);
      const elementSummaryData = await fetchData(
        `https://fantasy.premierleague.com/api/element-summary/${element}/`
      );
      handleElementSummaryResponse(elementSummaryData);
      const bootstrapData = await fetchData(
        "https://fantasy.premierleague.com/api/bootstrap-static/"
      );
      handleBootstrapResponse(bootstrapData, element);
      setLoadingPlayerData(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTeam(element);
  }, [element]);
  return (
    <Link href={`/player/${elementIDN}`} asChild>
      <Pressable style={styles.carouselItem}>
        <View style={styles.carouselImageContainer}>
          <View
            style={{
              marginVertical: 5,
              paddingHorizontal: 10,
            }}
          >
            <Skeleton show={laodingPlayerData} colorMode="light" radius={10}>
              <Image
                source={jerseys[jersey].jerseyImage}
                style={{ width: 175, height: 175, marginTop: 4 }}
              />
            </Skeleton>
          </View>
        </View>
        <View style={styles.carouselDetailsContainer}>
          <Skeleton show={laodingPlayerData} colorMode="light" radius={10}>
            <Text style={styles.carouselTextName}>
              {playerName.substring(0, 12)}...
            </Text>
          </Skeleton>
          <Skeleton show={laodingPlayerData} colorMode="light" radius={10}>
            <Text style={styles.carouselTextPosition}>
              {/* {jerseys[playerTeamId].name.toLocaleUpperCase()} */}
              {points}
            </Text>
          </Skeleton>
        </View>
        <View style={styles.divider}></View>
        {/* <Text>{team}</Text> */}
        <View style={styles.carouselStatsContainer}>
          <View style={styles.carouselInfoContainer}>
            <View style={{ marginBottom: 2 }}>
              <Skeleton show={laodingPlayerData} colorMode="light" radius={10}>
                <Text style={styles.carouselTextStats}>Form: {form}</Text>
              </Skeleton>
            </View>
            <View>
              <Skeleton show={laodingPlayerData} colorMode="light" radius={10}>
                <Text style={styles.carouselTextStats}>
                  Total: {totalPoints}
                </Text>
              </Skeleton>
            </View>
          </View>
          <View style={styles.carouselInfoContainer}>
            <View style={{ marginBottom: 2 }}>
              <Skeleton show={laodingPlayerData} colorMode="light" radius={10}>
                <Text style={styles.carouselTextStats}>ICT: {price}</Text>
              </Skeleton>
            </View>
            <View>
              <Skeleton show={laodingPlayerData} colorMode="light" radius={10}>
                <Text style={styles.carouselTextStats}>Own: {own}%</Text>
              </Skeleton>
            </View>
          </View>
        </View>
      </Pressable>
    </Link>
  );
};

type EventId = number | null;
type DreamPlayer = {
  element: number;
  points: number;
  position: number;
};
const PlayersCarousel = () => {
  const [eventId, setEventId] = React.useState<EventId | null>(null);
  const [dreamTeam, setDreamTeam] = React.useState<DreamPlayer[]>([]);
  const [loadingDreamTeam, setLoadingDreamTeam] = React.useState<boolean>(true);

  const fetchEventId = async () => {
    try {
      setLoadingDreamTeam(true);
      const response = await fetch(
        "https://fantasy.premierleague.com/api/fixtures/?future=1"
      );
      const data = await response.json();
      const actualGameweek = data[4]?.event - 1;
      setEventId(actualGameweek);
      setLoadingDreamTeam(false);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDreamTeam = async () => {
    try {
      setLoadingDreamTeam(true);
      const response = await fetch(
        `https://fantasy.premierleague.com/api/dream-team/${eventId}/`
      );
      const data = await response.json();
      setDreamTeam(data.team);
      setLoadingDreamTeam(false);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchEventId();
    fetchDreamTeam();
    // console.log("Dream Team", dreamTeam);
  }, [eventId]);

  return (
    <Skeleton show={loadingDreamTeam} colorMode="light">
      <View style={{ minHeight: 150 }}>
        <View style={styles.headingTextContainer}>
          <Text style={styles.headingText}>Players of Week</Text>
          <Text style={styles.altHeadingText}>Gameweek {eventId}</Text>
        </View>
        {/* Caurosel - Dream Team  */}
        <FlatList
          data={dreamTeam}
          renderItem={({ item }) => (
            // <Link href={`/player/${204}`} asChild>
            //   <Pressable>
            <Player
              element={item.element}
              points={item.points}
              position={item.position}
            />
            //   </Pressable>
            // </Link>
          )}
          keyExtractor={(item) => item.element.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </Skeleton>
  );
};

export default PlayersCarousel;

const styles = StyleSheet.create({
  headingTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    alignItems: "center",
  },
  headingText: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "InclusiveSans",
  },
  altHeadingText: {
    fontSize: 12,
    fontWeight: "bold",
    fontFamily: "InclusiveSans",
    color: COLORS["text-light"],
  },
  carouselItem: {
    width: 200,
    backgroundColor: COLORS["card-light2"],
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 10,
    margin: 10,
  },
  carouselImageContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
  },
  carouselDetailsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  carouselStatsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    // marginTop: 10,
  },
  carouselInfoContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  carouselTextName: {
    fontWeight: "bold",
    fontSize: 16,
    fontFamily: "InclusiveSans",
  },
  carouselTextPosition: {
    fontWeight: "100",
    fontSize: 16,
    fontFamily: "InclusiveSans",
    color: COLORS["text-light"],
  },
  carouselTextStats: {
    fontWeight: "bold",
    fontSize: 15,
    fontFamily: "InclusiveSans",
    margin: 5,
  },
  divider: {
    height: 0.2,
    backgroundColor: COLORS["text-light"],
    margin: 5,
  },
});
//162 lines
