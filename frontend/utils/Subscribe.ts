import { router } from "expo-router";
import { Alert } from "react-native";

export const handleProActions = (isPro: boolean, navigation?: any) => {
  isPro
    ? navigation
      ? navigation.navigate("proscreen")
      : router.navigate("proscreen")
    : Alert.alert("Oh-oh😬", "This one is for the pros😎", [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Become a PRO",
          onPress: () =>
            navigation
              ? navigation.navigate("proscreen")
              : router.navigate("proscreen"),
        },
      ]);
};
