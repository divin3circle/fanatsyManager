import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { COLORS } from "../../../utils/Colors";
import { Ionicons } from "@expo/vector-icons";
import { GAMEWEEKS } from "../../../utils/Gameweeks";

type GameweekProps = {
  id: number;
  title: string;
  selected: boolean;
  onSelect: (id: number) => void;
};

const changeStyles = (id: number) => {};
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
const Fixtures = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  return (
    <View>
      <View style={styles.headingTextContainer}>
        <Text style={styles.headingText}>Upcoming Fixtures</Text>
        <Text style={styles.altHeadingText}>GAMEWEEK 30</Text>
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
              setSelectedId(item.id);
            }}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
      {/*   Favourite fixtures List  */}
      <View style={styles.fixtureContainer}>
        {/*   Title */}
        <View style={styles.fixtureTitleContainer}>
          <Text style={styles.fixtureTitle}>Favourite</Text>
          <Ionicons name="star" size={17} color={COLORS.primary} />
        </View>
        {/*   Divider */}
        <View style={styles.divider}></View>
        {/*   Fav content  */}
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
          <View style={styles.fixturesConatiner}>
            {/*   home team  */}
            <View style={styles.teamConatiner}>
              <Text style={styles.fixtureText}>Chelsea</Text>
              <Image
                style={styles.teamLlogo}
                source={require("../../../assests/images/team-logos/che.png")}
              />
            </View>
            {/*   vs/score  */}
            <View style={styles.scoreContainer}>
              <Text style={styles.scoreText}>2 - 2</Text>
            </View>
            {/*   away team  */}
            <View>
              <View style={styles.teamConatiner}>
                <Text style={styles.fixtureText}>Arsenal</Text>
                <Image
                  style={styles.teamLlogo}
                  source={require("../../../assests/images/team-logos/ars.png")}
                />
              </View>
            </View>
          </View>
          <View>
            <Text style={styles.fullTimeText}>FT</Text>
          </View>
        </View>
      </View>

      {/*   Fixture List  */}
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
  },
  divider: {
    height: 0.2,
    backgroundColor: COLORS["text-light"],
    margin: 5,
  },
  fixtureText: {
    fontFamily: "InclusiveSans",
    fontSize: 14,
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
  },
  fullTimeText: {
    fontFamily: "InclusiveSans",
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.primary,
  },
});
