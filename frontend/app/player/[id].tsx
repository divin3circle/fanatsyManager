import {
  Modal,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  Pressable,
  Alert,
  FlatList,
  ScrollView,
  Platform,
} from "react-native";
import React, { useEffect } from "react";
import { useGlobalSearchParams } from "expo-router";
import { Bootstrap } from "../components/fantasy/Suggestions";
import { PlayerData, fetchData } from "../../utils/Suggested";
import { colorCodes, COLORS } from "../../utils/Colors";
import { Ionicons } from "@expo/vector-icons";
import { teams } from "../../utils/Data";
import {
  Fixtures,
  PlayerHistory,
  PlayerInfo,
  HistoryPast,
} from "../types/PlayerModal";
import { Link } from "expo-router";
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";

function Header({ player }: { player: PlayerData | undefined }) {
  return (
    <View style={[styles.container]}>
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
            {player?.web_name}
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
          {/* <Pressable
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
          </Pressable> */}
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
          Upcoming Fixtures
        </Text>
        <View
          style={{
            backgroundColor: COLORS.primary,
            height: 1,
            width: "35%",
          }}
        ></View>
      </View>
      {fixtures?.length > 0 ? (
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
                        width: 50,
                        height: 50,
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
      ) : (
        <Text
          style={{
            fontFamily: "InclusiveSans",
            textAlign: "center",
            fontSize: 15,
            marginVertical: 10,
          }}
        >
          No Upcoming Fixtures
        </Text>
      )}
    </View>
  );
};

function PlayerCoreStats({ player }: { player: PlayerData }) {
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          marginVertical: 5,
          marginHorizontal: 10,
          backgroundColor: COLORS["card-light"],
          padding: 10,
          borderRadius: 10,
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View>
            <Text
              style={{
                fontFamily: "InclusiveSans",
                fontSize: 15,
                textAlign: "center",
              }}
            >
              ICT: {player.ict_index}
            </Text>
          </View>
          <View
            style={{
              width: "100%",
              height: StyleSheet.hairlineWidth,
              backgroundColor: COLORS.primary,
              marginVertical: 15,
            }}
          ></View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "InclusiveSans",
                fontSize: 15,
                textAlign: "center",
              }}
            >
              Rank: {player.ict_index_rank}
            </Text>
          </View>
        </View>
        <View
          style={{
            width: 1,
            height: "100%",
            backgroundColor: COLORS.primary,
          }}
        ></View>
        <View>
          <View>
            <Text
              style={{
                fontFamily: "InclusiveSans",
                fontSize: 15,
                textAlign: "center",
              }}
            >
              Form: {player.form}
            </Text>
          </View>
          <View
            style={{
              width: "100%",
              height: StyleSheet.hairlineWidth,
              backgroundColor: COLORS.primary,
              marginVertical: 15,
            }}
          ></View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "InclusiveSans",
                fontSize: 15,
                textAlign: "center",
              }}
            >
              Rank: {player.form_rank}
            </Text>
          </View>
        </View>
        <View
          style={{
            width: 1,
            height: "100%",
            backgroundColor: COLORS.primary,
          }}
        ></View>
        <View>
          <View>
            <Text
              style={{
                fontFamily: "InclusiveSans",
                fontSize: 15,
                textAlign: "center",
              }}
            >
              Cost: £{player.now_cost / 10}
            </Text>
          </View>
          <View
            style={{
              width: "100%",
              height: StyleSheet.hairlineWidth,
              backgroundColor: COLORS.primary,
              marginVertical: 15,
            }}
          ></View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "InclusiveSans",
                fontSize: 15,
                textAlign: "center",
              }}
            >
              Rank: {player.now_cost_rank}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

function PastFive({ playerHistory }: { playerHistory: PlayerHistory[] }) {
  const pastFive = playerHistory?.slice(-5);
  // console.log(pastFive)
  //TODO: ADD INDIVIDUAL FIXTURE MODAL
  return (
    <View>
      {pastFive?.length > 0 ? (
        <View>
          <FlatList
            data={pastFive}
            keyExtractor={(item) => item.fixture.toString()}
            renderItem={({ item }) => {
              const color =
                item.total_points === 0
                  ? colorCodes.five
                  : item.total_points <= 4
                  ? colorCodes.four
                  : item.total_points <= 8
                  ? colorCodes.three
                  : item.total_points > 8
                  ? colorCodes.two
                  : colorCodes.two;

              return (
                <Pressable
                  style={{
                    marginHorizontal: 10,
                    width: 100,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={teams[item.opponent_team - 1].logo}
                    style={{
                      width: 50,
                      height: 50,
                    }}
                  />
                  <View
                    style={{
                      backgroundColor: color,
                      padding: 10,
                      borderRadius: 10,
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                      marginVertical: 5,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "InclusiveSans",
                        color: item.total_points <= 4 ? "white" : "black",
                      }}
                    >
                      {item.total_points}
                    </Text>
                  </View>
                </Pressable>
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
      ) : (
        <Text
          style={{
            fontFamily: "InclusiveSans",
            textAlign: "center",
            fontSize: 15,
            marginVertical: 10,
          }}
        >
          Nothing to show here
        </Text>
      )}
    </View>
  );
}

function PlayerSeasonHistory({ historyPast }: { historyPast: HistoryPast[] }) {
  return (
    <View>
      {historyPast?.length > 0 ? (
        <View
          style={{
            justifyContent: "center",
            flexDirection: "column",
            marginLeft: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginHorizontal: 10,
              width: "100%",
            }}
          >
            <View style={{ flex: 2 }}>
              <Text
                style={{
                  fontFamily: "InclusiveSans",
                  fontSize: 15,
                  color: "gray",
                }}
              >
                Season
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontFamily: "InclusiveSans",
                  fontSize: 15,
                  color: "gray",
                }}
              >
                Points
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontFamily: "InclusiveSans",
                  fontSize: 15,
                  color: "gray",
                }}
              >
                MP
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontFamily: "InclusiveSans",
                  fontSize: 15,
                  color: "gray",
                }}
              >
                ICT
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontFamily: "InclusiveSans",
                  fontSize: 15,
                  color: "gray",
                }}
              >
                xGI
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontFamily: "InclusiveSans",
                  fontSize: 15,
                  color: "gray",
                }}
              >
                xGC
              </Text>
            </View>
          </View>
          <FlatList
            data={historyPast}
            keyExtractor={(item) => item.season_name}
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginHorizontal: 10,
                    marginVertical: 5,
                    width: "100%",
                  }}
                >
                  <View style={{ flex: 2 }}>
                    <Text
                      style={{
                        fontFamily: "InclusiveSans",
                        fontSize: 12,
                      }}
                    >
                      {item.season_name}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontFamily: "InclusiveSans",
                        fontSize: 12,
                        // textAlign: "center",
                      }}
                    >
                      {item.total_points}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontFamily: "InclusiveSans",
                        fontSize: 12,
                      }}
                    >
                      {item.minutes}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontFamily: "InclusiveSans",
                        fontSize: 12,
                      }}
                    >
                      {item.ict_index}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontFamily: "InclusiveSans",
                        fontSize: 12,
                      }}
                    >
                      {item.expected_goal_involvements}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontFamily: "InclusiveSans",
                        fontSize: 12,
                      }}
                    >
                      {item.expected_goals_conceded}
                    </Text>
                  </View>
                </View>
              );
            }}
            style={{
              marginBottom: 20,
            }}
          />
        </View>
      ) : (
        <Text
          style={{
            fontFamily: "InclusiveSans",
            textAlign: "center",
            fontSize: 15,
            marginVertical: 10,
          }}
        >
          Nothing to show here
        </Text>
      )}
    </View>
  );
}

const PlayerModal = () => {
  const { id } = useGlobalSearchParams();
  const [player, setPlayer] = React.useState<PlayerData | null | undefined>(
    null
  );
  const [loading, setLoading] = React.useState<boolean>(true);
  const [playerData, setPlayerData] = React.useState<PlayerInfo | null>(null);

  const getPlayer = async (url: string) => {
    try {
      setLoading(true);
      const playerID = Number(id);
      // console.log(playerID, "nnn");
      const data: Bootstrap = await fetchData(url);
      const players: PlayerData[] = data.elements;
      const player = players.find((player) => player.id === playerID);
      // console.log(player);
      setPlayer(player);
      // setLoading(false);
    } catch (error) {
      alert("Error fetching player data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getPlayer("https://fantasy.premierleague.com/api/bootstrap-static/");
  }, [id]);

  const getPlayerData = async (id: number) => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://fantasy.premierleague.com/api/element-summary/${id}/`
      );
      const data = await res.json();
      setPlayerData(data);
    } catch (error) {
      console.warn(error);
      Alert.alert("Awww Snap!!!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (player) {
      getPlayerData(player.id);
    } else {
      // console.log(id);
      // console.log("missing");
      return;
    }
  }, [player, id]);

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
          Aww Snap!
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
              Seems like a broken link😞It must be us.
            </Text>
          </Pressable>
        </Link>
      </View>
    );
  }

  return (
    <>
      <FlatList
        ListHeaderComponent={
          <>
            <Header player={player} />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <UpcomingFixtures fixtures={playerData?.fixtures!} />
            </View>
          </>
        }
        data={[
          {
            title: "Core Stats & Rankings",
            component: <PlayerCoreStats player={player} />,
          },
          {
            title: "Points Last 5 Games",
            component: <PastFive playerHistory={playerData?.history!} />,
          },
          {
            title: "Season History",
            component: (
              <PlayerSeasonHistory historyPast={playerData?.history_past!} />
            ),
          },
          {
            // title: "Detailed Stats",
            component: (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Link
                  asChild
                  href={{
                    pathname: `/${player.id}`,
                    params: {
                      player: JSON.stringify(player),
                      playerData: JSON.stringify(playerData),
                    },
                  }}
                >
                  <Pressable
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: COLORS.primary,
                      padding: 10,
                      borderRadius: 10,
                      paddingHorizontal: 15,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        fontFamily: "InclusiveSans",
                        color: "black",
                      }}
                    >
                      View all
                    </Text>
                  </Pressable>
                </Link>
              </View>
            ),
          },
        ]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              marginBottom: 25,
            }}
          >
            {item.title ? (
              <Text
                style={{
                  fontFamily: "InclusiveSans",
                  fontSize: 20,
                  marginVertical: 10,
                  marginHorizontal: 10,
                }}
              >
                {item.title}
              </Text>
            ) : null}
            {item.component}
          </View>
        )}
      />
    </>
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
    marginHorizontal: 5,
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
