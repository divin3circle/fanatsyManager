import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../utils/Colors";
import CheckBox from "@react-native-community/checkbox";

const Pay = () => {
  return (
    <View style={{}}>
      {/* apple pay */}
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            width: "90%",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#000",
            borderRadius: 10,
            marginHorizontal: 10,
            paddingVertical: 15,
            marginVertical: 5,
          }}
        >
          <Ionicons name="logo-apple" size={24} color="white" />
          <Text
            style={{
              fontFamily: "InclusiveSans",
              fontSize: 20,
              color: "white",
            }}
          >
            Pay
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            width: "90%",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff",
            borderRadius: 10,
            marginHorizontal: 10,
            paddingVertical: 15,
            marginVertical: 5,
          }}
        >
          <Ionicons name="logo-google" size={24} color="black" />
          <Text
            style={{
              fontFamily: "InclusiveSans",
              fontSize: 20,
              color: "black",
            }}
          >
            Google Pay
          </Text>
        </View>
      </View>
      {/* divider */}
      <View
        style={{
          marginHorizontal: 10,
        }}
      >
        <View
          style={{
            backgroundColor: "gray",
            height: 1,
            marginVertical: 20,
            width: "100%",
          }}
        ></View>
      </View>
      {/* card info */}
      <View>
        {/* heading */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginHorizontal: 10,
            marginVertical: 15,
            marginTop: 10,
          }}
        >
          <Text
            style={{
              fontFamily: "InclusiveSans",
              fontSize: 15,
              color: "black",
            }}
          >
            Card Information
          </Text>
          <View
            style={{
              flexDirection: "row",
              gap: 5,
              alignItems: "center",
            }}
          >
            <Ionicons name="qr-code" size={22} color="black" />
            <Text
              style={{
                fontFamily: "InclusiveSans",
                fontSize: 15,
                color: "black",
              }}
            >
              Scan Card
            </Text>
          </View>
        </View>

        {/* card */}
        <View
          style={{
            marginHorizontal: 10,
            borderColor: "black",
            borderWidth: 1,
            borderRadius: 5,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              // backgroundColor: "red",
              height: 50,
            }}
          >
            <TextInput
              placeholder="Name on Card"
              style={{
                fontFamily: "InclusiveSans",
                color: "black",
                fontSize: 15,
                paddingHorizontal: 10,
              }}
            />
            <Ionicons
              name="person-circle-outline"
              size={24}
              color="black"
              style={{
                paddingHorizontal: 10,
              }}
            />
          </View>
          <View
            style={{
              width: "100%",
              height: 1,
              backgroundColor: "gray",
              // marginVertical: 5,
            }}
          ></View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              // backgroundColor: "red",
              height: 50,
            }}
          >
            <TextInput
              placeholder="Card Number"
              style={{
                fontFamily: "InclusiveSans",
                color: "black",
                fontSize: 15,
                paddingHorizontal: 10,
              }}
            />
            <Ionicons
              name="card"
              size={24}
              color="black"
              style={{
                paddingHorizontal: 10,
              }}
            />
          </View>
          <View
            style={{
              width: "100%",
              height: 1,
              backgroundColor: "gray",
              // marginVertical: 5,
            }}
          ></View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              height: 50,
            }}
          >
            <TextInput
              placeholder="MM/YY"
              style={{
                fontFamily: "InclusiveSans",
                color: "black",
                fontSize: 15,
                paddingHorizontal: 10,
                flex: 4,
              }}
            />
            <View
              style={{
                height: "100%",
                width: 1,
                backgroundColor: "gray",
              }}
            ></View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                flex: 3,
              }}
            >
              <TextInput
                placeholder="CVV"
                style={{
                  fontFamily: "InclusiveSans",
                  color: "black",
                  fontSize: 15,
                  paddingHorizontal: 10,
                }}
              />
              <Ionicons
                name="card-outline"
                size={24}
                color="black"
                style={{
                  paddingHorizontal: 10,
                }}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Pressable
            style={{
              padding: 10,
              borderRadius: 10,
              width: "50%",
              alignItems: "center",
              backgroundColor: COLORS["card-dark"],
              marginTop: 10,
            }}
          >
            <Text
              style={{
                fontFamily: "InclusiveSans",
                fontSize: 14,
                color: "#fff",
              }}
            >
              Add Card
            </Text>
          </Pressable>
        </View>
      </View>
      {/* divider */}
      <View
        style={{
          marginHorizontal: 10,
        }}
      >
        <View
          style={{
            backgroundColor: "gray",
            height: 1,
            marginTop: 10,
            width: "100%",
          }}
        ></View>
      </View>
      {/* daraja api */}
      <View
        style={{
          alignItems: "center",
          marginHorizontal: 10,
        }}
      >
        <Image
          source={require("../assests/images/mpesa.png")}
          style={{
            width: "100%",
            height: 75,
          }}
        />
        <Text
          style={{
            fontFamily: "InclusiveSans",
            fontSize: 18,
            color: "black",
          }}
        >
          BUY GOODS TILL NUMBER
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            gap: 4,
            marginVertical: 10,
          }}
        >
          <Text
            style={{
              fontFamily: "InclusiveSans",
              fontSize: 22,
              color: "black",
              borderColor: COLORS.primary,
              borderWidth: 2,
              padding: 10,
            }}
          >
            0
          </Text>
          <Text
            style={{
              fontFamily: "InclusiveSans",
              fontSize: 22,
              color: "black",
              borderColor: COLORS.primary,
              borderWidth: 2,
              padding: 10,
            }}
          >
            2
          </Text>
          <Text
            style={{
              fontFamily: "InclusiveSans",
              fontSize: 22,
              color: "black",
              borderColor: COLORS.primary,
              borderWidth: 2,
              padding: 10,
            }}
          >
            1
          </Text>
          <Text
            style={{
              fontFamily: "InclusiveSans",
              fontSize: 22,
              color: "black",
              borderColor: COLORS.primary,
              borderWidth: 2,
              padding: 10,
            }}
          >
            4
          </Text>
          <Text
            style={{
              fontFamily: "InclusiveSans",
              fontSize: 22,
              color: "black",
              borderColor: COLORS.primary,
              borderWidth: 2,
              padding: 10,
            }}
          >
            6
          </Text>
          <Text
            style={{
              fontFamily: "InclusiveSans",
              fontSize: 22,
              color: "black",
              borderColor: COLORS.primary,
              borderWidth: 2,
              padding: 10,
            }}
          >
            5
          </Text>
        </View>
      </View>

      {/* pay */}
      <View
        style={{
          alignItems: "center",
          marginHorizontal: 10,
          marginTop: 10,
        }}
      >
        <Pressable
          style={{
            backgroundColor: COLORS.primary,
            padding: 10,
            borderRadius: 10,
            width: "100%",
            alignItems: "center",
            paddingHorizontal: 10,
          }}
        >
          <Text
            style={{
              fontFamily: "InclusiveSans",
              fontSize: 22,
              color: "#000",
              marginVertical: 5,
            }}
          >
            Start trial
          </Text>
        </Pressable>
      </View>

      {/* terms & conditions */}
      <View>
        <Text
          style={{
            fontFamily: "InclusiveSans",
            fontSize: 15,
            color: "black",
            textAlign: "center",
            marginHorizontal: 10,
            marginTop: 30,
          }}
        >
          By clicking "Start trial" you agree to our{" "}
          <Text
            style={{
              color: "blue",
            }}
          >
            Terms & Conditions
          </Text>{" "}
          and{" "}
          <Text
            style={{
              color: "blue",
            }}
          >
            Privacy Policy
          </Text>
          .
        </Text>
      </View>
    </View>
  );
};

export default Pay;

const styles = StyleSheet.create({});
