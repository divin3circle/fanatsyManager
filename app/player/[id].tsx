import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  Pressable,
} from "react-native";
import React, { useEffect } from "react";
import { useGlobalSearchParams } from "expo-router";
import { Bootstrap } from "../components/fantasy/Suggestions";
import { fetchData, PlayerData } from "../../utils/Suggested";
import { COLORS } from "../../utils/Colors";
import { Ionicons } from "@expo/vector-icons";
//https://resources.premierleague.com/premierleague/photos/players/250x250/p80201.png

function Header({ player }: { player: PlayerData | undefined }) {
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
            source={require("../../assests/images/team-logos/liv.png")}
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
            Midfielder
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
            Jersey: 11
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../assests/images/team-logos/liv.png")}
            style={{
              width: 42,
              height: 42,
              backgroundColor: COLORS["card-light"],
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
            Liverpool
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

const PlayerModal = () => {
  const { id } = useGlobalSearchParams();
  const [player, setPlayer] = React.useState<PlayerData | undefined>(undefined);
  const [loading, setLoading] = React.useState<boolean>(true);
  // console.log(id);

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
          Player with id: {id} not found
        </Text>
      </View>
    );
  }

  return (
    <View>
      <Header player={player} />
      <Text>
        {player?.second_name} {player?.first_name}
      </Text>
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
