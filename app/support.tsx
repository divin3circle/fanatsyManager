import {
  Image,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
} from "react-native";
import React from "react";

import { carouselData } from "../utils/Data";

type CarouselItemProps = {
  id: number;
  title: string;
  description: string;
  image: any;
};

function CarouselItem({ id, title, description, image }: CarouselItemProps) {
  return (
    <View
      style={{
        backgroundColor: "white",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
      }}
    >
      <Image
        source={image}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 10,
          marginHorizontal: 10,
        }}
      />
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "black",
          opacity: 0.5,
          width: "100%",
          height: "100%",
          borderRadius: 10,
          justifyContent: "flex-end",
          marginHorizontal: 10,
          marginVertical: 10,
        }}
      >
        <View
          style={{
            padding: 10,
            zIndex: 10,
          }}
        >
          <Text
            style={{
              color: "white",
              fontFamily: "InclusiveSans",
              fontSize: 18,
              zIndex: 10,
            }}
          >
            {title}
          </Text>
          <Text
            style={{
              color: "white",
              fontFamily: "InclusiveSans",
              fontSize: 14,
              lineHeight: 20,
              padding: 10,
            }}
          >
            {description}
          </Text>
        </View>
      </View>
    </View>
  );
}

const Support = () => {
  return (
    <SafeAreaView
      style={{
        backgroundColor: "white",
        flex: 1,
      }}
    >
      <FlatList
        data={carouselData}
        renderItem={({ item }) => (
          <View
            key={item.id}
            style={{
              width: 400,
            }}
          >
            <CarouselItem
              id={item.id}
              title={item.title}
              description={item.description}
              image={item.image}
            />
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
      />
    </SafeAreaView>
  );
};

export default Support;

const styles = StyleSheet.create({});
