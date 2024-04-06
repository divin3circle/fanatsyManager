import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { COLORS } from "../../../utils/Colors";
import { Ionicons } from "@expo/vector-icons";
import { GAMEWEEKS } from "../../../utils/Gameweeks";
import { teams } from "../../../utils/Data";
import { Skeleton } from "moti/skeleton";

type GameweekProps = {
  id: number;
  title: string;
  selected: boolean;
  onSelect: (id: number) => void;
};
type FixtureProps = {
  event: number;
  homeTeamId: number;
  awayTeamId: number;
  homeScore: number;
  awayScore: number;
  finished: boolean;
  started: boolean;
  kickOffTime: string;
};
// https://fantasy.premierleague.com/api/fixtures/?event=26

export type Fixture = {
  code: number;
  event: number;
  finished: boolean;
  finished_provisional: boolean;
  id: number;
  kickoff_time: string;
  minutes: number;
  provisional_start_time: boolean;
  started: boolean;
  team_a: number;
  team_a_score: number;
  team_h: number;
  team_h_score: number;
  stats: Array<any>;
  team_h_difficulty: number;
  team_a_difficulty: number;
  pulse_id: number;
};
const Fixture = ({
  event,
  homeTeamId,
  awayTeamId,
  homeScore,
  awayScore,
  finished,
  started,
  kickOffTime,
}: FixtureProps) => {
  const homeTeam = teams.find((team) => team.id === homeTeamId);
  const awayTeam = teams.find((team) => team.id === awayTeamId);
  const date = new Date(kickOffTime);
  const localTime = date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return (
    <View style={styles.fixturesConatiner}>
      {/*   home team  */}
      <View style={styles.teamConatiner}>
        <Text style={styles.fixtureText}>{homeTeam?.name}</Text>
        <View style={styles.logoContainer}>
          <Image style={styles.teamLlogo} source={homeTeam?.logo} />
        </View>
      </View>
      {/*   vs/score  */}
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>
          {started ? `${homeScore} - ${awayScore}` : localTime}
        </Text>
      </View>
      {/*   away team  */}
      <View>
        <View style={styles.teamConatiner}>
          <Text style={styles.fixtureText}>{awayTeam?.name}</Text>
          <Image style={styles.teamLlogo} source={awayTeam?.logo} />
        </View>
      </View>
    </View>
  );
};
const GameWeekCarousel = ({ id, title, selected, onSelect }: GameweekProps) => {
  return (
    <TouchableOpacity
      style={
        !selected ? styles.gameweekContainer : styles.selctedGameweekContainer
      }
      onPress={() => onSelect(id)}
    >
      <View
        style={
          !selected ? styles.gameweekContainer : styles.selctedGameweekContainer
        }
      >
        <Ionicons
          name="football-outline"
          size={14}
          color={selected ? "white" : COLORS["text-light"]}
        />
        <Text
          style={!selected ? styles.gameweekText : styles.selectedGameweekText}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const FixtureContainer = ({
  event,
  homeTeamId,
  awayTeamId,
  homeScore,
  awayScore,
  finished,
  started,
  kickOffTime,
}: FixtureProps) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        margin: 5,
      }}
    >
      <View>
        <Ionicons
          name="notifications-outline"
          size={17}
          color={COLORS.primary}
        />
      </View>
      <Fixture
        homeTeamId={homeTeamId}
        homeScore={homeScore}
        awayScore={awayScore}
        awayTeamId={awayTeamId}
        finished={finished}
        started={started}
        kickOffTime={kickOffTime}
        event={event}
      />
      <View>
        <Text style={styles.fullTimeText}>
          {finished ? "FT" : started ? "OG" : "NT"}
        </Text>
      </View>
    </View>
  );
};
const Fixtures = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [fixtures, setFixtures] = useState<Fixture[]>([]);
  const [loadingFixtures, setLoadingFixtures] = useState(false);
  const fetchFixtures = async () => {
    setLoadingFixtures(true);
    const response = await fetch(
      "https://fantasy.premierleague.com/api/fixtures/?future=1"
    );
    const fixtures = await response.json();
    setFixtures(fixtures);
    setSelectedId(fixtures[4]?.event);
    setLoadingFixtures(false);
  };
  const fetchGameweekFixture = async (id: number) => {
    setSelectedId(id);
    setLoadingFixtures(true);
    const response = await fetch(
      `https://fantasy.premierleague.com/api/fixtures/?event=${id}`
    );
    const fixtures = await response.json();
    setFixtures(fixtures);
    setLoadingFixtures(false);
  };

  React.useEffect(() => {
    fetchFixtures();
  }, []);

  return (
    <View>
      <View style={styles.headingTextContainer}>
        <Text style={styles.headingText}>Upcoming Fixtures</Text>
        <Text style={styles.altHeadingText}>GAMEWEEK {fixtures[4]?.event}</Text>
      </View>
      {/*   Sort List  */}
      <FlatList
        style={{ padding: 10, marginBottom: 10 }}
        data={GAMEWEEKS}
        renderItem={({ item }) => (
          <GameWeekCarousel
            id={item.id}
            title={item.name}
            selected={item.id === selectedId}
            onSelect={() => {
              fetchGameweekFixture(item.id);
            }}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />

      {/*   Favorite fixtures List  */}
      <View style={styles.fixtureContainer}>
        {/*   Title */}
        <View style={styles.fixtureTitleContainer}>
          <Text style={styles.fixtureTitle}>Featured Matches</Text>
          <Ionicons name="star" size={17} color={COLORS.primary} />
        </View>
        {/*   Divider */}
        <View style={styles.divider}></View>
        <View style={styles.divider}></View>
        {/*   Fav content  */}
        {fixtures.slice(0, 2).map((fixture) => {
          return (
            <View key={fixture.code} style={{ marginBottom: 2 }}>
              <Skeleton show={loadingFixtures} colorMode="light">
                <FixtureContainer
                  key={fixture.id}
                  homeTeamId={fixture.team_h}
                  homeScore={fixture.team_h_score}
                  awayTeamId={fixture.team_a}
                  awayScore={fixture.team_a_score}
                  kickOffTime={fixture.kickoff_time}
                  event={fixture.event}
                  finished={fixture.finished}
                  started={fixture.started}
                />
              </Skeleton>
            </View>
          );
        })}
      </View>

      {/*   Fixture List  */}
      <View style={styles.fixtureContainer}>
        {/*   Title */}
        <View style={styles.fixtureTitleContainer}>
          <Text style={styles.fixtureTitle}>Other Fixtures</Text>
          <Ionicons name="alarm-outline" size={17} color={COLORS.primary} />
        </View>
        {/*   Divider */}
        <View style={styles.divider}></View>
        <View style={styles.divider}></View>
        {/*   Fixture content  */}
        {fixtures.slice(2, 10).map((fixture) => {
          return (
            <View key={fixture.code} style={{ marginBottom: 2 }}>
              <Skeleton show={loadingFixtures} colorMode="light">
                <FixtureContainer
                  key={fixture.id}
                  homeTeamId={fixture.team_h}
                  homeScore={fixture.team_h_score}
                  awayTeamId={fixture.team_a}
                  awayScore={fixture.team_a_score}
                  kickOffTime={fixture.kickoff_time}
                  event={fixture.event}
                  finished={fixture.finished}
                  started={fixture.started}
                />
              </Skeleton>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default Fixtures;

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
  gameweekContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5,
    alignItems: "center",
    gap: 5,
    backgroundColor: "#e5e5e5",
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 10,
  },
  // TODO: Fix this typo
  selctedGameweekContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5,
    alignItems: "center",
    gap: 5,
    backgroundColor: COLORS.primary,
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 10,
  },
  gameweekText: {
    fontSize: 10,
    fontFamily: "InclusiveSans",
  },
  selectedGameweekText: {
    fontSize: 10,
    fontFamily: "InclusiveSans",
    color: COLORS["text-dark"],
  },
  fixtureTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  fixtureTitle: {
    fontFamily: "InclusiveSans",
    fontSize: 16,
    fontWeight: "bold",
  },
  fixtureContainer: {
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 10,
    // margin: 10,
    backgroundColor: COLORS["card-light2"],
    marginBottom: 15,
  },
  divider: {
    height: 0.2,
    backgroundColor: COLORS["text-light"],
    margin: 5,
  },
  fixtureText: {
    fontFamily: "InclusiveSans",
    fontSize: 13,
    fontWeight: "bold",
  },
  teamLlogo: {
    width: 30,
    height: 30,
  },
  teamConatiner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 100,
  },
  logoContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
  },
  fixturesConatiner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  scoreContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 5,
  },
  scoreText: {
    // fontFamily: "InclusiveSans",
    fontSize: 17,
    fontWeight: "bold",
    padding: 5,
    marginRight: 5,
    marginLeft: 5,
  },
  fullTimeText: {
    fontFamily: "InclusiveSans",
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  activityIndicatorContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 250,
  },
  favactivityIndicatorContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 150,
  },
});
//432 lines
