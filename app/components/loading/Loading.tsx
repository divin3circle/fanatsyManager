import { ActivityIndicator, Modal, StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../../../utils/Colors";

type LoadingProps = {
  loading: boolean;
};
const Loading = ({ loading }: LoadingProps) => {
  return (
    <Modal transparent={true} visible={loading}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#9fcd8f",
        }}
      >
        <ActivityIndicator size="large" color={COLORS["card-dark"]} />
      </View>
    </Modal>
  );
};

export default Loading;

const styles = StyleSheet.create({});
