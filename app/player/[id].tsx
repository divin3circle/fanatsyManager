import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  Pressable,
  Alert,
  FlatList,
} from "react-native";
import React, { useEffect } from "react";
import { useGlobalSearchParams } from "expo-router";
import { Bootstrap } from "../components/fantasy/Suggestions";
import { fetchData, PlayerData } from "../../utils/Suggested";
import { colorCodes, COLORS } from "../../utils/Colors";
import { Ionicons } from "@expo/vector-icons";
import { teams } from "../../utils/Data";
import { Fixtures, PlayerInfo } from "../types/PlayerModal";
//https://resources.premierleague.com/premierleague/photos/players/250x250/p80201.png

function Header({ player }: { player: PlayerData | undefined }) {
  useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      {/* image */}
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: `https://resources.premierleague.com/premierleague/photos/players/250x250/p${player?.code}.png`,
          }}
          style={{
            width: 175,
            height: 175,
            backgroundColor: COLORS["card-light"],
            borderRadius: 10,
          }}
        />
        <View style={styles.logoContainer}>
          <Image
            source={teams[player?.team! - 1].logo}
            style={{
              width: 42,
              height: 42,
              backgroundColor: COLORS["card-light"],
              borderRadius: 20,
            }}
          />
        </View>
      </View>
      {/* info */}
      <View style={styles.infoContainer}>
        {/* name */}
        <View style={styles.nameContainer}>
          <Text
            style={{
              fontSize: 22,
              fontFamily: "InclusiveSans",
              padding: 5,
            }}
          >
            {player?.first_name} {player?.second_name}
          </Text>
        </View>
        {/* position */}
        <View style={styles.positionContainer}>
          <Text
            style={{
              fontSize: 15,
              fontFamily: "InclusiveSans",
              padding: 5,
              paddingVertical: 10,
              backgroundColor: COLORS["card-light"],
            }}
          >
            {player?.element_type === 1
              ? "Goalkeeper"
              : player?.element_type === 2
              ? "Defender"
              : player?.element_type === 3
              ? "Midfielder"
              : "Forward"}
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontFamily: "InclusiveSans",
              paddingVertical: 10,
              padding: 5,
              backgroundColor: COLORS["card-light"],
            }}
          >
            Total Points: {player?.total_points}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            source={teams[player?.team! - 1].logo}
            style={{
              width: 42,
              height: 42,
              // backgroundColor: COLORS["card-light"],
              borderRadius: 20,
            }}
          />
          <Text
            style={{
              fontSize: 15,
              fontFamily: "InclusiveSans",
              padding: 5,
            }}
          >
            {teams[player?.team! - 1].name}
          </Text>
        </View>
        {/* save */}
        <View style={styles.saveContainer}>
          <Pressable
            style={{
              padding: 10,
              backgroundColor: COLORS["card-light"],
              borderRadius: 10,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Ionicons name="git-compare-outline" size={24} />
            <Text
              style={{
                fontSize: 12,
                fontFamily: "InclusiveSans",
                padding: 5,
              }}
            >
              Compare
            </Text>
          </Pressable>
          <Pressable
            style={{
              padding: 10,
              backgroundColor: COLORS.primary,
              borderRadius: 10,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "35%",
            }}
          >
            <Ionicons name="bookmark-outline" size={24} />
            <Text
              style={{
                fontSize: 12,
                fontFamily: "InclusiveSans",
                padding: 5,
              }}
            >
              Save
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const UpcomingFixtures = ({ fixtures }: { fixtures: Fixtures[] }) => {
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          paddingHorizontal: 0,
          // backgroundColor: COLORS["card-light"],
          marginHorizontal: 0,
          width: "100%",
        }}
      >
        <View
          style={{
            backgroundColor: COLORS.primary,
            height: 1,
            width: "35%",
          }}
        ></View>
        <Text
          style={{
            fontFamily: "InclusiveSans",
            fontSize: 13,
          }}
        >
          Fixtures
        </Text>
        <View
          style={{
            backgroundColor: COLORS.primary,
            height: 1,
            width: "35%",
          }}
        ></View>
      </View>
      <View>
        <FlatList
          data={fixtures}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            const color =
              item.difficulty === 1
                ? colorCodes.one
                : item.difficulty === 2
                ? colorCodes.two
                : item.difficulty === 3
                ? colorCodes.three
                : item.difficulty === 4
                ? colorCodes.four
                : colorCodes.five;
            const team = item.is_home ? item.team_a : item.team_h;
            return (
              <View
                style={{
                  marginHorizontal: 10,
                  width: 100,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 5,
                  }}
                >
                  <Image
                    source={teams[team - 1].logo}
                    style={{
                      width: 40,
                      height: 40,
                    }}
                  />
                </View>
                <View
                  style={{
                    backgroundColor: color,
                    padding: 10,
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "InclusiveSans",
                      color: item.difficulty <= 3 ? "black" : "white",
                    }}
                  >
                    {item.difficulty}
                  </Text>
                </View>
              </View>
            );
          }}
          horizontal
          style={{
            marginVertical: 10,
            paddingHorizontal: 10,
            flexDirection: "row",
            // justifyContent: "space-around",
          }}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};
const PlayerModal = () => {
  const { id } = useGlobalSearchParams();
  const [player, setPlayer] = React.useState<PlayerData | undefined>(undefined);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [playerData, setPlayerData] = React.useState<PlayerInfo | null>(null);

  // useEffect(() => {
  //   const getPlayerData = async (id: number) => {
  //     fetch(`https://fantasy.premierleague.com/api/element-summary/${id}/`);
  //   };
  //   if(player !==)
  // }, []);

  const getPlayer = async (url: string) => {
    try {
      const playerID = Number(id);
      const data: Bootstrap = await fetchData(url);
      const players: PlayerData[] = data.elements;
      const player = players.find((player) => player.code === playerID);
      setPlayer(player);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert("Error fetching player data");
      console.error(error);
    }
  };
  useEffect(() => {
    getPlayer("https://fantasy.premierleague.com/api/bootstrap-static/");
  }, [id]);
  const getPlayerData = async (id: number) => {
    const res = await fetch(
      `https://fantasy.premierleague.com/api/element-summary/${id}/`
    );
    const data = await res.json();
    setPlayerData(data);
  };
  useEffect(() => {
    try {
      setLoading(true);
      if (player?.id !== undefined) {
        getPlayerData(player?.id);
      }
      setLoading(false);
      // console.log(playerData?.history_past);
    } catch (error) {
      console.warn(error);
      setLoading(false);
      Alert.alert("Awww Snap!!!");
    }
  }, [player]);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <ActivityIndicator size="large" color="black" />
        <Text
          style={{
            fontSize: 20,
            fontFamily: "InclusiveSans",
          }}
        >
          Loading...
        </Text>
      </View>
    );
  }

  if (!player) {
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
          Please wait...
        </Text>
      </View>
    );
  }

  return (
    <View>
      <Header player={player} />
      {/* <Text>{playerData?.fixtures[0].difficulty}</Text> */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <UpcomingFixtures fixtures={playerData?.fixtures!} />
      </View>
    </View>
  );
};

export default PlayerModal;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    // justifyContent: "space-between",
    // alignItems: "center",
    padding: 15,
    gap: 10,
  },
  imageContainer: {
    position: "relative",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  logoContainer: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  infoContainer: {
    flexDirection: "column",
    justifyContent: "center",
    width: "55%",
  },
  nameContainer: {},
  positionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
  saveContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
});
