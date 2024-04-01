import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import React, { useEffect } from "react";

import { PLAYERS } from "../../../utils/Players";
import { COLORS } from "../../../utils/Colors";
import { Skeleton } from "moti/skeleton";
import { jerseys } from "../../../utils/Data";

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
  // console.log(element, "element");
  // console.log(points, "points");
  // console.log(position, "position");
  const [playerData, setPlayerData] = React.useState<PlayerDataProps[] | null>(
    null
  );
  const [playerTeamId, setPlayerTeamId] = React.useState<number>(0);
  const [playerName, setPlayerName] = React.useState<string>("");
  const [form, setForm] = React.useState<number>(0);
  const [totalPoints, setTotalPoints] = React.useState<number>(0);
  const [price, setPrice] = React.useState<number>(0);
  const [own, setOwn] = React.useState<number>(0);
  const [laodingPlayerData, setLoadingPlayerData] =
    React.useState<boolean>(true);
  const fetchTeam = async () => {
    try {
      setLoadingPlayerData(true);
      const response = await fetch(
        `https://fantasy.premierleague.com/api/element-summary/${element}/`
      );
      // console.log("=>", element, points, position);
      const data = await response.json();
      const firstFixture = data.fixtures[0];
      const teamId = firstFixture.is_home
        ? firstFixture.team_h
        : firstFixture.team_a;
      // console.log(element, teamId, "=>", points, position);
      setPlayerTeamId(teamId);
      setPlayerData(firstFixture);
      const bootstrap = await fetch(
        "https://fantasy.premierleague.com/api/bootstrap-static/"
      );
      const bootstrapData = await bootstrap.json();
      const players = bootstrapData.elements as any[];
      const player = players.find((player) => player.id === element);
      setForm(player.form);
      setTotalPoints(player.total_points);
      setPrice(player.ep_this);
      setOwn(player.selected_by_percent);
      const playerName = player.first_name + " " + player.second_name;
      setPlayerName(playerName);
      setLoadingPlayerData(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, [element]);
  return (
    <View style={styles.carouselItem}>
      <View style={styles.carouselImageContainer}>
        <View
          style={{
            marginVertical: 5,
            paddingHorizontal: 10,
          }}
        >
          <Skeleton show={laodingPlayerData} colorMode="light" radius={10}>
            <Image
              source={jerseys[playerTeamId].jerseyImage}
              style={{ width: 200, height: 200 }}
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
            {jerseys[playerTeamId].name.toLocaleUpperCase()}
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
              <Text style={styles.carouselTextStats}>Total: {totalPoints}</Text>
            </Skeleton>
          </View>
        </View>
        <View style={styles.carouselInfoContainer}>
          <View style={{ marginBottom: 2 }}>
            <Skeleton show={laodingPlayerData} colorMode="light" radius={10}>
              <Text style={styles.carouselTextStats}>Price: £{price}</Text>
            </Skeleton>
          </View>
          <View>
            <Skeleton show={laodingPlayerData} colorMode="light" radius={10}>
              <Text style={styles.carouselTextStats}>Own: {own}%</Text>
            </Skeleton>
          </View>
        </View>
      </View>
    </View>
  );
};

type EventId = number | null;
type DreamTeam = {
  element: number;
  points: number;
  position: number;
};
const PlayersCarousel = () => {
  const [eventId, setEventId] = React.useState<EventId>(null);
  const [dreamTeam, setDreamTeam] = React.useState<DreamTeam[]>([]);
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
      // console.log(data.team);
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
    <View>
      <View style={styles.headingTextContainer}>
        <Text style={styles.headingText}>Players of Week</Text>
        <Text style={styles.altHeadingText}>Gameweek {eventId}</Text>
      </View>
      {/* Caurosel  */}
      <FlatList
        data={dreamTeam}
        renderItem={({ item }) => (
          <Player
            element={item.element}
            points={item.points}
            position={item.position}
          />
        )}
        keyExtractor={(item) => item.element.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
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
