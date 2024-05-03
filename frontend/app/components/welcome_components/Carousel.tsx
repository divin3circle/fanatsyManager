import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import React from "react";
import { teams } from "../../../utils/Data";
import { COLORS } from "../../../utils/Colors";

type CauroselProps = {
  name: string;
  logo: any;
};

const CauroselItem = ({ name, logo }: CauroselProps) => {
  return (
    <View style={{}}>
      <Image
        source={logo}
        accessibilityLabel={name}
        style={{ height: 50, width: 50 }}
      />
    </View>
  );
};

const Caurosel = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={teams}
        renderItem={({ item }) => (
          <CauroselItem name={item.name} logo={item.logo} />
        )}
        keyExtractor={(item) => item.name}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default Caurosel;

const styles = StyleSheet.create({
  container: {
    height: 50,
  },
});
