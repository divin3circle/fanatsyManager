import { View, Text } from "react-native";
import React from "react";

const Register = () => {
  return (
    <View className="h-full w-full justify-around pt-40 pb-10">
      {/** Register form title */}
      <View className="flex items-center">
        <Text className="text-white font-bold tracking-wider text-5xl">
          Join Us Now!
        </Text>
      </View>
    </View>
  );
};

export default Register;
