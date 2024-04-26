import { router } from "expo-router";
import { Alert } from "react-native";

export const handleProActions = (isPro: boolean) => {
  isPro
    ? router.navigate("proscreen")
    : Alert.alert("Oh-oh😬", "This one is for the pros😎", [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "Become a PRO", onPress: () => router.navigate("proscreen") },
      ]);
};
