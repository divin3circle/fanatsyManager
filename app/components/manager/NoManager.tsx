import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { COLORS } from "../../../utils/Colors";

const NoManager = ({
  setManagerID,
}: {
  setManagerID: React.Dispatch<React.SetStateAction<number | null>>;
}) => {
  const [id, setID] = React.useState<number | null>(null);
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 20,
          fontFamily: "InclusiveSans",
          textAlign: "center",
          padding: 10,
          marginBottom: 10,
          marginVertical: 30,
        }}
      >
        Please provide FPL Manager ID
      </Text>
      <View
        style={{
          width: "100%",

          justifyContent: "center",
          alignItems: "center",
          padding: 10,
        }}
      >
        <TextInput
          style={{
            height: 40,
            marginHorizontal: 20,
            width: "80%",
            padding: 5,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: COLORS.primary,
            textAlign: "center",
            fontFamily: "InclusiveSans",
          }}
          placeholder="Enter your manager ID"
          keyboardType="numeric"
          value={id ? id.toString() : ""}
          onChangeText={(text) => {
            setID(parseInt(text));
          }}
        />
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.primary,
            padding: 10,
            borderRadius: 10,
            marginTop: 10,
          }}
          onPress={() => {
            setManagerID(id);
          }}
          disabled={id === null ? true : id!.toString().length < 3}
        >
          <Text style={{ color: "white", fontFamily: "InclusiveSans" }}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NoManager;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS["card-light"],
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
    padding: 10,
    flexDirection: "column",
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
