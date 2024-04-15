import {
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  SafeAreaView,
} from "react-native";
import React, { useEffect } from "react";
import useThemeStore from "../../utils/store";
import ManagerDetails, {
  AppCustoms,
} from "../components/manager/ManagerDetails";
import { COLORS } from "../../utils/Colors";
import NoManager from "../components/manager/NoManager";
import { PlayerData } from "../types/Manager";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Manager = () => {
  const { theme } = useThemeStore();
  const [managerID, setManagerID] = React.useState<number | null>(null);
  const [managerDetails, setManagerDetails] = React.useState<PlayerData | null>(
    null
  );
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  useEffect(() => {
    const getManager = async (id: number) => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://fantasy.premierleague.com/api/entry/${id}/`
        );
        if (!res.ok) throw new Error("Error fetching data");
        const data = await res.json();
        setManagerDetails(data);
        setLoading(false);
      } catch (error) {
        setManagerID(null);
        setError("An error occurred");
      }
    };
    if (managerID === null) return;
    getManager(managerID);
    AsyncStorage.setItem("managerID", managerID!.toString());
  }, [managerID]);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <StatusBar
          barStyle={theme === "dark" ? "light-content" : "dark-content"}
        />
        <View>
          {error ? (
            <>
              <NoManager setManagerID={setManagerID} />
            </>
          ) : managerID === null ? (
            <>
              <NoManager setManagerID={setManagerID} />
            </>
          ) : (
            <ManagerDetails managerDetails={managerDetails} loading={loading} />
          )}
        </View>
        <View style={{ marginHorizontal: 15, marginTop: managerID ? 0 : 100 }}>
          <AppCustoms />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Manager;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  divider: {
    width: "100%",
    height: StyleSheet.hairlineWidth,
    backgroundColor: "gray",
    marginVertical: 12,
  },
});
