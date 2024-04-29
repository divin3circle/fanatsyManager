import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../utils/Colors";
import { router } from "expo-router";

const Notifications = () => {
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          //   justifyContent: "space-between",
          alignItems: "center",
          marginVertical: 15,
          marginHorizontal: 10,
        }}
      >
        <Pressable
          style={{
            flex: 2,
          }}
          onPress={() => router.back()}
        >
          <Ionicons name="close" size={28} color="black" />
        </Pressable>
        <View
          style={{
            flex: 4,
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontFamily: "InclusiveSans",
            }}
          >
            Notifications
          </Text>
        </View>
        <Pressable
          style={{
            flex: 2,
          }}
        >
          <Text
            style={{
              color: "blue",
              fontSize: 14,
              fontFamily: "InclusiveSans",
            }}
          >
            Mark as read
          </Text>
        </Pressable>
      </View>
      <Text
        style={{
          fontFamily: "InclusiveSans",
          fontSize: 16,
          marginHorizontal: 10,
          marginVertical: 5,
        }}
      >
        Newer
      </Text>
      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 10,
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: COLORS["card-light"],
              height: 70,
              justifyContent: "center",
              alignItems: "center",
              width: 70,
              borderRadius: 35,
              marginHorizontal: 5,
            }}
          >
            <Ionicons name="game-controller" size={28} color={COLORS.primary} />
          </View>
          <View
            style={{
              flex: 5,
              marginHorizontal: 5,
            }}
          >
            <View>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                  marginBottom: 10,
                }}
              >
                This is a brief and fast headline about the notification
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "InclusiveSans",
                }}
              >
                FPL AI •{" "}
                <Text
                  style={{
                    color: "gray",
                  }}
                >
                  MONDAY, 4:15PM
                </Text>
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 10,
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: COLORS["card-light"],
              height: 70,
              justifyContent: "center",
              alignItems: "center",
              width: 70,
              borderRadius: 35,
              marginHorizontal: 5,
            }}
          >
            <Ionicons name="newspaper" size={28} color={COLORS.primary} />
          </View>
          <View
            style={{
              flex: 5,
              marginHorizontal: 5,
            }}
          >
            <View>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                  marginBottom: 10,
                }}
              >
                This is a brief and fast headline about the notification
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "InclusiveSans",
                }}
              >
                FPL NEWS •{" "}
                <Text
                  style={{
                    color: "gray",
                  }}
                >
                  SATURDAY, 6:15AM
                </Text>
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 10,
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: COLORS["card-light"],
              height: 70,
              justifyContent: "center",
              alignItems: "center",
              width: 70,
              borderRadius: 35,
              marginHorizontal: 5,
            }}
          >
            <Ionicons name="apps" size={28} color={COLORS.primary} />
          </View>
          <View
            style={{
              flex: 5,
              marginHorizontal: 5,
            }}
          >
            <View>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                  marginBottom: 10,
                }}
              >
                This is a brief and fast headline about the notification
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "InclusiveSans",
                }}
              >
                APP •{" "}
                <Text
                  style={{
                    color: "gray",
                  }}
                >
                  WEDNESDAY, 8:15PM
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </View>
      <Text
        style={{
          fontFamily: "InclusiveSans",
          fontSize: 16,
          marginHorizontal: 10,
          marginVertical: 15,
        }}
      >
        Older
      </Text>
      <View
        style={{
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "InclusiveSans",
            fontSize: 14,
            marginVertical: 5,
            color: "gray",
          }}
        >
          No older notifications
        </Text>
      </View>
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({});
