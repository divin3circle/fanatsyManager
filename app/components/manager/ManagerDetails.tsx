import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { teams } from "../../../utils/Data";
import { COLORS } from "../../../utils/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Classic, PlayerData } from "../../types/Manager";
import { fetchData } from "../../../utils/Suggested";
import { SafeAreaView } from "react-native-safe-area-context";

function ManagerHeader({ manager }: { manager: PlayerData | null }) {
  return (
    <View style={styles.managerHeader}>
      {/* manager club */}
      <View style={styles.managerClub}>
        <Image
          source={teams[manager?.favourite_team! - 1]?.logo}
          style={{ width: 150, height: 150 }}
        />
      </View>
      {/* manager name */}
      <View>
        <Text style={styles.managerName}>
          {manager?.player_first_name + " " + manager?.player_last_name}
        </Text>
      </View>
      {/* manager region */}
      <View>
        <Text style={styles.managerRegion}>{manager?.player_region_name}</Text>
      </View>
      <View style={styles.premiumContainer}>
        <Pressable style={styles.premiumButton}>
          <Text style={[styles.premiumText]}>Pro Manager</Text>
          <View
            style={{ width: 1, height: "auto", backgroundColor: "gray" }}
          ></View>
          <Text style={[styles.premiumText]}>$0.99/month</Text>
        </Pressable>
        <Pressable style={styles.joinPremiumButton}>
          <Text style={styles.joinText}>Join Premium</Text>
        </Pressable>
      </View>
    </View>
  );
}
function ManagerInformation({ manager }: { manager: PlayerData | null }) {
  return (
    <View style={styles.informationContainer}>
      {/* overall points */}
      <View style={styles.information}>
        <Text style={styles.infoText}>Overall Points</Text>
        <Text style={styles.statsText}>
          {manager?.summary_overall_points ?? 0}
        </Text>
      </View>
      {/* overall rank */}
      <View style={styles.information}>
        <Text style={styles.infoText}>Overall Rank</Text>
        <Text style={styles.statsText}>
          {manager?.summary_overall_rank.toLocaleString() ?? 0}
        </Text>
      </View>
      {/* team value */}
      <View style={styles.information}>
        <Text style={styles.infoText}>Team Value</Text>
        <Text style={styles.statsText}>
          ${manager?.last_deadline_value! / 10}
        </Text>
      </View>
    </View>
  );
}

type League = "classic" | "h2h" | "cups";

function ManagerLeagues({ manger }: { manger: PlayerData | null }) {
  const [leaguesShown, setLeaguesShown] = React.useState<League>("classic");

  const toggleLeagues = (leagueType: string) => {
    switch (leagueType) {
      case "classic":
        setLeaguesShown("classic");
        break;
      case "h2h":
        setLeaguesShown("h2h");
        break;
      case "cups":
        setLeaguesShown("cups");
        break;
    }
  };
  return (
    <View style={styles.managerLeagues}>
      {/* filter */}
      <View style={styles.filter}>
        <Pressable
          style={[
            styles.leagues,
            {
              backgroundColor: leaguesShown === "classic" ? "white" : undefined,
            },
          ]}
          onPress={() => toggleLeagues("classic")}
        >
          <Text style={styles.leagueText}>Classic Leagues</Text>
        </Pressable>
        <Pressable
          style={[
            styles.leagues,
            { backgroundColor: leaguesShown === "h2h" ? "white" : undefined },
          ]}
          onPress={() => toggleLeagues("h2h")}
        >
          <Text style={styles.leagueText}>H2H Leagues</Text>
        </Pressable>
        <Pressable
          style={[
            styles.leagues,
            { backgroundColor: leaguesShown === "cups" ? "white" : undefined },
          ]}
          onPress={() => toggleLeagues("cups")}
        >
          <Text style={styles.leagueText}>Cups</Text>
        </Pressable>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text
          style={{
            width: "30%",
            fontSize: 16,
            fontFamily: "InclusiveSans",
            color: "gray",
          }}
        >
          Rank
        </Text>
        <Text
          style={{ fontSize: 16, fontFamily: "InclusiveSans", color: "gray" }}
        >
          League{" "}
        </Text>
      </View>
      <View style={styles.divider}></View>
      {leaguesShown === "classic" &&
        manger?.leagues.classic.slice(0, 5).map((league) => {
          return (
            <View key={league.id}>
              <Standings league={league} />
              <View style={styles.divider}></View>
            </View>
          );
        })}
      {leaguesShown === "h2h" && (
        <Pressable
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 20,
          }}
        >
          <Ionicons name="lock-closed-outline" size={17} color="gray" />
          <Text style={{ fontFamily: "InclusiveSans", color: "gray" }}>
            Subscribe to Pro Manager to unlock
          </Text>
        </Pressable>
      )}
      {leaguesShown === "cups" && (
        <Pressable
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 20,
          }}
        >
          <Ionicons name="lock-closed-outline" size={17} color="gray" />
          <Text style={{ fontFamily: "InclusiveSans", color: "gray" }}>
            Subscribe to Pro Manager to unlock
          </Text>
        </Pressable>
      )}
      {leaguesShown === "classic" && (
        <Text
          style={{
            color: "gray",
            fontFamily: "InclusiveSans",
            textAlign: "center",
            marginVertical: 10,
          }}
        >
          View All
        </Text>
      )}
    </View>
  );
}

function Standings({ league }: { league: Classic }) {
  return (
    <View style={{ flexDirection: "row", marginVertical: 5 }}>
      <View
        style={{
          width: "30%",
          alignItems: "center",
          alignContent: "center",
          flexDirection: "row",
          gap: 5,
        }}
      >
        <Ionicons
          name={
            league.entry_last_rank > league.entry_rank
              ? "caret-up-outline"
              : league.entry_last_rank < league.entry_rank
              ? "caret-down-outline"
              : "remove-outline"
          }
          size={14}
          color={COLORS["drop-rank"]}
        />
        <Text style={{ fontFamily: "InclusiveSans", fontSize: 14 }}>
          {league.entry_rank.toLocaleString()}
        </Text>
      </View>
      <Text style={{ width: "65%", fontFamily: "InclusiveSans", fontSize: 14 }}>
        {league.name}
      </Text>
      <Ionicons name="arrow-forward-outline" size={24} color="black" />
    </View>
  );
}

export function AppCustoms() {
  return (
    <View>
      {/* settings */}
      <Pressable style={styles.appItem}>
        <Ionicons
          name="settings-outline"
          size={30}
          color="black"
          style={{ width: "10%" }}
        />
        <Text
          style={{ width: "85%", fontSize: 20, fontFamily: "InclusiveSans" }}
        >
          Settings
        </Text>
        <Ionicons name="arrow-forward-outline" size={24} color="black" />
      </Pressable>
      {/* refer */}
      <Pressable style={styles.appItem}>
        <Ionicons
          name="share-social-outline"
          size={30}
          color="black"
          style={{ width: "10%" }}
        />
        <Text
          style={{ width: "85%", fontSize: 20, fontFamily: "InclusiveSans" }}
        >
          Share App
        </Text>
        <Ionicons name="arrow-forward-outline" size={24} color="black" />
      </Pressable>
      {/* about */}
      <Pressable style={styles.appItem}>
        <Ionicons
          name="information-circle-outline"
          size={30}
          color="black"
          style={{ width: "10%" }}
        />
        <Text
          style={{ width: "85%", fontSize: 20, fontFamily: "InclusiveSans" }}
        >
          About
        </Text>
        <Ionicons name="arrow-forward-outline" size={24} color="black" />
      </Pressable>
      {/* sponsor */}
      <Pressable style={styles.appItem}>
        <Ionicons
          name="help-outline"
          size={30}
          color="black"
          style={{ width: "10%" }}
        />
        <Text
          style={{ width: "85%", fontSize: 20, fontFamily: "InclusiveSans" }}
        >
          Support
        </Text>
        <Ionicons name="arrow-forward-outline" size={24} color="black" />
      </Pressable>
    </View>
  );
}

const ManagerDetails = ({
  managerDetails,
  loading,
}: {
  managerDetails: PlayerData | null;
  loading: boolean;
}) => {
  // const [managerDetails, setManagerDetails] = React.useState<PlayerData | null>(
  //   null
  // );
  // https://fantasy.premierleague.com/api/entry/565066/

  // useEffect(() => {
  //   const getManager = async () => {
  //     const res = await fetch(
  //       "https://fantasy.premierleague.com/api/entry/1985425/"
  //     );
  //     const data = await res.json();
  //     setManagerDetails(data);
  //   };
  //   getManager();
  // }, []);

  if (loading) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text style={{ fontFamily: "InclusiveSans", fontSize: 16 }}>
          Just a moment...
        </Text>
      </SafeAreaView>
    );
  }
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {/* navigation */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: 15,
          marginHorizontal: 15,
        }}
      >
        <View>
          <Ionicons name="chevron-back" size={30} color="black" />
        </View>
        <View>
          <Ionicons name="log-out-outline" size={30} color="black" />
        </View>
      </View>
      <ManagerHeader manager={managerDetails} />
      <View style={{ marginHorizontal: 15 }}>
        <ManagerInformation manager={managerDetails} />
      </View>
      <ManagerLeagues manger={managerDetails} />
      {/* <View style={styles.divider}></View> */}
    </ScrollView>
  );
};

export default ManagerDetails;

const styles = StyleSheet.create({
  managerHeader: {
    alignItems: "center",
    flexDirection: "column",
    marginTop: 20,
  },
  managerClub: {},
  managerName: {
    fontSize: 25,
    fontWeight: "bold",
    fontFamily: "InclusiveSans",
  },
  managerRegion: {
    fontSize: 15,
    color: "gray",
    fontFamily: "InclusiveSans",
  },
  premiumContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 15,
    alignItems: "center",
    marginVertical: 20,
  },
  premiumButton: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
  },
  joinPremiumButton: {
    backgroundColor: COLORS["card-light"],
    borderRadius: 5,
    padding: 10,
  },
  premiumText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 17,
    fontFamily: "InclusiveSans",
    marginVertical: 5,
  },
  joinText: {
    color: "black",
    fontSize: 17,
    fontFamily: "InclusiveSans",
    marginVertical: 5,
  },
  informationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  information: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  infoText: {
    fontSize: 14,
    color: "gray",
    fontFamily: "InclusiveSans",
  },
  statsText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5,
  },
  managerLeagues: {
    marginHorizontal: 15,
    marginTop: 20,
    marginBottom: 20,
  },
  filter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    padding: 10,
    backgroundColor: COLORS["card-light"],
    borderRadius: 5,
  },
  leagues: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 35,
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  leagueText: {
    fontSize: 16,
    fontFamily: "InclusiveSans",
  },
  divider: {
    width: "100%",
    height: StyleSheet.hairlineWidth,
    backgroundColor: "gray",
    marginVertical: 12,
  },
  appItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
});
