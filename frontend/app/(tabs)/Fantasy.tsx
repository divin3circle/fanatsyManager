import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  SafeAreaView,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import useThemeStore from "../../utils/store";
import Team, { NoTeam } from "../components/fantasy/Team";
import Suggestions from "../components/fantasy/Suggestions";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type PlayerInformation = {
  id: number;
  joined_time: string;
  started_event: number;
  favourite_team: number;
  player_first_name: string;
  player_last_name: string;
  player_region_id: number;
  player_region_name: string;
  player_region_iso_code_short: string;
  player_region_iso_code_long: string;
  years_active: number;
  summary_overall_points: number;
  summary_overall_rank: number;
  summary_event_points: number;
  summary_event_rank: number;
  current_event: number;
  leagues: any[];
  name: string;
  name_change_blocked: boolean;
  entered_events: any[];
  kit: any;
  last_deadline_bank: number;
  last_deadline_value: number;
  last_deadline_total_transfers: number;
};
const Fantasy = () => {
  const { theme, toggleTheme } = useThemeStore();
  const [fplteamId, setFplteamId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 1985425 ==> fpl id
  const [playerInformation, setPlayerInformation] =
    useState<PlayerInformation | null>(null);
  const fetchPlayerInformation = async (id: number | null) => {
    if (id === null) return;
    try {
      const res = await fetch(
        `https://fantasy.premierleague.com/api/entry/${id}/`
      );
      if (!res.ok) throw new Error("Error fetching data");
      const data = await res.json();
      setPlayerInformation(data);
    } catch (error) {
      setFplteamId(null);
      // console.error(error);
      setError("Error fetching data");
    }
  };
  // !!!!DON'T DELETE THIS CODE!!!!
  // useEffect(() => {
  //   const getFplteamId = async () => {
  //     const storedFplteamId = await AsyncStorage.getItem("fplteamId");
  //     setFplteamId(storedFplteamId ? parseInt(storedFplteamId) : null);
  //   };

  //   getFplteamId();
  // }, []);

  useEffect(() => {
    if (fplteamId === null) return;
    fetchPlayerInformation(fplteamId);
    AsyncStorage.setItem("fplteamId", fplteamId!.toString());
  }, [fplteamId]);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView
        style={{
          backgroundColor: theme === "dark" ? "black" : "white",
          flex: 1,
          paddingTop: Platform.OS === "android" ? 25 : 0,
        }}
      >
        <StatusBar
          barStyle={theme === "dark" ? "light-content" : "dark-content"}
        />
        <View style={styles.componentContainer}>
          {error ? (
            <>
              <Text>{error}</Text>
              <NoTeam setFplteamId={setFplteamId} fplteamId={fplteamId} />
            </>
          ) : fplteamId === null ? (
            <>
              <NoTeam setFplteamId={setFplteamId} fplteamId={fplteamId} />
            </>
          ) : (
            <Team playerInformation={playerInformation} />
          )}
        </View>
        <View style={styles.componentContainer}>
          <Suggestions gameWeek={playerInformation?.current_event} />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Fantasy;

const styles = StyleSheet.create({
  componentContainer: {
    padding: 0,
  },
});
