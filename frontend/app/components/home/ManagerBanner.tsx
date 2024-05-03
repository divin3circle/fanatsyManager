import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS } from "../../../utils/Colors";
import Animated, { FadeInDown } from "react-native-reanimated";
import { managerBanner } from "../../../utils/Data";

type ManagerBannerProps = {
  id: number;
  name: string;
  team: string;
  image: any;
  quote: string;
};
const ManagerBanner = () => {
  const [displayManager, setManagerBanner] =
    useState<ManagerBannerProps | null>(null);
  const [bgColor, setBgColor] = useState<string>("");
  useEffect(() => {
    const randIndex = Math.floor(Math.random() * managerBanner.length);
    const manager = managerBanner[randIndex];
    setManagerBanner(manager);
    setBgColor(manager.bgColor);
  }, [displayManager]);

  return (
    <Animated.View
      style={[styles.managerBannerContainer]}
      entering={FadeInDown.delay(100).duration(1000)}
    >
      {/** manager image */}
      <View style={styles.imageContainer}>
        <Image source={displayManager?.image} style={styles.image} />
      </View>
      {/** manager info */}
      <View style={styles.infoContainer}>
        <View style={styles.infoTextContainer}>
          <Text style={styles.infoText}>{displayManager?.name}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text
            numberOfLines={5}
            ellipsizeMode="tail"
            style={styles.managerText}
          >
            {displayManager?.quote}
          </Text>
        </View>
        <View style={styles.infoTextContainer}>
          <Text style={styles.infoText}>{displayManager?.team}</Text>
        </View>
      </View>
    </Animated.View>
  );
};

export default ManagerBanner;

const styles = StyleSheet.create({
  managerBannerContainer: {
    height: 175,
    width: "100%",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: COLORS.primary,
  },
  imageContainer: {
    height: 160,
    width: 100,
  },
  image: {
    height: "100%",
    width: "100%",
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
  },
  infoTextContainer: {
    flexDirection: "row",

    margin: 10,
  },
  textContainer: {},
  managerText: {
    flexShrink: 1,
    color: COLORS["app-dark"],
    fontFamily: "InclusiveSans",
    fontSize: 15,
  },
  infoText: {
    fontSize: 17,
    color: COLORS["text-dark"],
    fontWeight: "bold",
    fontFamily: "InclusiveSans",
  },
});
//107 lines
