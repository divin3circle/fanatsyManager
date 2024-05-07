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
import { useGetDreamTeamQuery } from "../../service/fantasyData";

type TPlayer = {
  _id: string;
  element: number;
  form: number;
  totalPoints: number;
  ict: number;
  ownership: number;
  name: string;
  teamID: number;
  __v: number;
  createdAt: string;
  updatedAt: string;
};

const Player = ({ item, isLoading }: { item: TPlayer; isLoading: boolean }) => {
  return (
    <Link href={`/player/${item.element}`} asChild>
      <Pressable style={styles.carouselItem}>
        <View style={styles.carouselImageContainer}>
          <View
            style={{
              marginVertical: 5,
              paddingHorizontal: 10,
            }}
          >
            <Skeleton show={isLoading} colorMode="light" radius={10}>
              <Image
                source={jerseys[item.teamID].jerseyImage}
                style={{ width: 175, height: 175, marginTop: 4 }}
              />
            </Skeleton>
          </View>
        </View>
        <View style={styles.carouselDetailsContainer}>
          <Skeleton show={isLoading} colorMode="light" radius={10}>
            <Text style={styles.carouselTextName}>{item.name}</Text>
          </Skeleton>
        </View>
        <View style={styles.divider}></View>
        {/* <Text>{team}</Text> */}
        <View style={styles.carouselStatsContainer}>
          <View style={styles.carouselInfoContainer}>
            <View style={{ marginBottom: 2 }}>
              <Skeleton show={isLoading} colorMode="light" radius={10}>
                <Text style={styles.carouselTextStats}>Form: {item.form}</Text>
              </Skeleton>
            </View>
            <View>
              <Skeleton show={isLoading} colorMode="light" radius={10}>
                <Text style={styles.carouselTextStats}>
                  Total: {item.totalPoints}
                </Text>
              </Skeleton>
            </View>
          </View>
          <View style={styles.carouselInfoContainer}>
            <View style={{ marginBottom: 2 }}>
              <Skeleton show={isLoading} colorMode="light" radius={10}>
                <Text style={styles.carouselTextStats}>ICT: {item.ict}</Text>
              </Skeleton>
            </View>
            <View>
              <Skeleton show={isLoading} colorMode="light" radius={10}>
                <Text style={styles.carouselTextStats}>
                  Own: {item.ownership}%
                </Text>
              </Skeleton>
            </View>
          </View>
        </View>
      </Pressable>
    </Link>
  );
};

type EventId = number | null;
const PlayersCarousel = () => {
  const [eventId, setEventId] = React.useState<EventId | null>(null);
  const fetchEventId = async () => {
    try {
      const response = await fetch(
        "https://fantasy.premierleague.com/api/fixtures/?future=1"
      );
      const data = await response.json();
      const actualGameweek = data[4]?.event - 1;
      setEventId(actualGameweek);
    } catch (error) {
      console.error(error);
    }
  };

  const { data, isError, isLoading, isSuccess } = useGetDreamTeamQuery({});

  useEffect(() => {
    fetchEventId();
  }, [eventId]);

  if (isLoading) {
    <View style={{ minHeight: 150 }}>
      <Text style={styles.headingText}>Loading..</Text>
    </View>;
  }

  if (isError) {
    <View style={{ minHeight: 150 }}>
      <Text style={styles.headingText}>An Error Ocurred</Text>
    </View>;
  }

  return (
    <Skeleton show={isLoading} colorMode="light">
      <View style={{ minHeight: 150 }}>
        <View style={styles.headingTextContainer}>
          <Text style={styles.headingText}>Players of Week</Text>
          <Text style={styles.altHeadingText}>Gameweek {eventId}</Text>
        </View>
        {/* Caurosel - Dream Team  */}
        {isSuccess && (
          <FlatList
            data={data?.dreamTeam}
            renderItem={({ item }) => (
              <Player item={item} isLoading={isLoading} />
            )}
            keyExtractor={(item) => item.element.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        )}
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
