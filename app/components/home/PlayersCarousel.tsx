import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import React from "react";

import { PLAYERS } from "../../../utils/Players";
import { COLORS } from "../../../utils/Colors";

type PlayerProps = {
  name: string;
  team: string;
  position: string;
  form: number;
  price: number;
  totalPoints: number;
  ownership: number;
  image: any;
};

const Player = ({
  name,
  team,
  position,
  form,
  price,
  totalPoints,
  ownership,
  image,
}: PlayerProps) => {
  return (
    <View style={styles.carouselItem}>
      <View style={styles.carouselImageContainer}>
        <Image source={image} style={{ height: 100, width: 100 }} />
      </View>
      <View style={styles.carouselDetailsContainer}>
        <Text style={styles.carouselTextName}>{name}</Text>
        <Text style={styles.carouselTextPosition}>{position}</Text>
      </View>
      <View style={styles.divider}></View>
      {/* <Text>{team}</Text> */}
      <View style={styles.carouselStatsContainer}>
        <View style={styles.carouselInfoContainer}>
          <Text style={styles.carouselTextStats}>Form: {form}</Text>
          <Text style={styles.carouselTextStats}>Total: {totalPoints}</Text>
        </View>
        <View style={styles.carouselInfoContainer}>
          <Text style={styles.carouselTextStats}>Price: {price}</Text>

          <Text style={styles.carouselTextStats}>Own: {ownership}%</Text>
        </View>
      </View>
    </View>
  );
};
const PlayersCarousel = () => {
  return (
    <View>
      <View style={styles.headingTextContainer}>
        <Text style={styles.headingText}>Players of Week</Text>
        <Text style={styles.altHeadingText}>View All</Text>
      </View>
      {/* Caurosel  */}
      <FlatList
        data={PLAYERS}
        renderItem={({ item }) => (
          <Player
            name={item.name}
            team={item.team}
            position={item.position}
            form={item.form}
            price={item.price}
            totalPoints={item.totalPoints}
            ownership={item.ownership}
            image={item.image}
          />
        )}
        keyExtractor={(item) => item.name}
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
    marginTop: 10,
  },
  carouselDetailsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 10,
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
