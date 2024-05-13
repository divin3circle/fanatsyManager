import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Pressable,
} from "react-native";
import React from "react";
import useThemeStore from "../../utils/store";
import { COLORS } from "../../utils/Colors";
import { news, teams } from "../../utils/Data";
import { Ionicons } from "@expo/vector-icons";
import { Skeleton } from "moti/skeleton";
import "react-native-reanimated";
import { handleProActions } from "../../utils/Subscribe";

type Team = {
  id: number;
  name: string;
  logo: any;
};
type News = {
  name: string;
  title: string;
  logo: any;
  imgUrl: any;
  description: string;
  date: string;
  time: string;
};
type NewsItemType = {
  imageUrl: string;
  title: string;
  gmtTime: string;
  sourceStr: string;
  sourceIconUrl: string;
  page: {
    url: string;
  };
};
const TeamFilter = ({ id, name, logo }: Team) => {
  return (
    <TouchableOpacity>
      <View>
        <Image source={logo} style={{ width: 50, height: 50 }} />
      </View>
    </TouchableOpacity>
  );
};

const NewsItem = ({
  title,
  imgUrl,
  date,
  loading,
}: {
  title: string;
  imgUrl: any;
  date: string;
  loading: boolean;
}) => {
  const [isBookmarked, setIsBookmarked] = React.useState(false);
  const [showContent, setShowContent] = React.useState(false);
  const { theme, toggleTheme } = useThemeStore();
  const bookmarkNews = () => {
    setIsBookmarked(!isBookmarked);
    return alert(`News ${isBookmarked ? "Removed" : "Bookmarked"}`);
  };
  return (
    <SafeAreaView
      style={{
        backgroundColor: theme === "dark" ? "black" : "white",
        flex: 1,
      }}
    >
      <View style={styles.newsItemConatiner}>
        {/* Image */}

        <View style={styles.newsItemImageContainer}>
          <Skeleton show={loading} colorMode="light" radius={0} height={150}>
            <Image
              source={{
                uri: imgUrl,
              }}
              style={{ width: "100%", height: 170 }}
            />
          </Skeleton>
        </View>

        {/* Core */}
        <View style={styles.newsItemCoreConatiner}>
          <View style={{ marginBottom: 5 }}>
            <Skeleton show={loading} colorMode="light" radius={10}>
              <Text style={styles.newsItemTitleText}>{title}</Text>
            </Skeleton>
          </View>
          {/* <Skeleton show={showContent} colorMode="light" radius={10}>
            <Text style={styles.newsItemText}>
              {description.substring(0, 100)}
              <Text style={{ color: "blue", fontSize: 12 }}>...Read More</Text>
            </Text>
          </Skeleton> */}
        </View>
        {/* Info */}
        <Skeleton show={loading} radius={10} colorMode="light">
          <View style={styles.newsItemInfoContainer}>
            {/* Logo */}
            <View style={styles.newsItemInfoLogoConatiner}>
              <Image
                source={require("../../assests/images/icons/prem.png")}
                style={{ width: 30, height: 30, borderRadius: 10 }}
                resizeMode="cover"
              />
              {/* <Text style={styles.newsItemInfoText}></Text> */}
            </View>
            {/* Text */}
            <View>
              <Text style={styles.newsItemInfoText}>
                {date.substring(0, 10)}
              </Text>
            </View>
            {/* Save */}
            <TouchableOpacity onPress={bookmarkNews}>
              <Ionicons
                name={isBookmarked ? "bookmark" : "bookmark-outline"}
                size={20}
                color="black"
              />
            </TouchableOpacity>
          </View>
        </Skeleton>
      </View>
    </SafeAreaView>
  );
};

const Explore = () => {
  const { theme, toggleTheme } = useThemeStore();
  const [fetchedNews, setFetchedNews] = React.useState<NewsItemType[] | null>(
    null
  );
  const [loading, setLoading] = React.useState(false);
  const fetchNews = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://www.fotmob.com/api/worldnews?lang=en-GB&page=1"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setFetchedNews(result);
      setLoading(false);
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };
  React.useEffect(() => {
    fetchNews();
  }, []);
  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="black" />
        <Text
          style={{
            fontSize: 20,
            fontFamily: "InclusiveSans",
          }}
        >
          Loading...
        </Text>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        theme === "dark"
          ? { backgroundColor: COLORS["app-dark"] }
          : { backgroundColor: COLORS["app-light"] },
      ]}
    >
      <StatusBar
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Explore World Football News</Text>
      </View>
      {/* Teams filter */}
      <View style={styles.carouselContainer}>
        <FlatList
          data={teams}
          renderItem={({ item }) => (
            <TeamFilter id={item.id} name={item.name} logo={item.logo} />
          )}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      {/* <View style={styles.newsCategoryContainer}>
        <TouchableOpacity style={styles.categoryContainer}>
          <Text style={styles.newsCategoryText}>Latest</Text>
          <Ionicons name="newspaper-outline" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryContainer}>
          <Text style={styles.newsCategoryText}>Trending</Text>
          <Ionicons name="camera-outline" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryContainer}>
          <Text style={styles.newsCategoryText}>Fantasy</Text>
          <Ionicons name="flame-outline" size={20} color="black" />
        </TouchableOpacity>
      </View> */}
      {/* News */}
      <ScrollView>
        <View style={styles.newsConatiner}>
          {fetchedNews?.map((item) => {
            return (
              <Pressable
                key={item.title}
                onPress={() => handleProActions(false)}
              >
                <NewsItem
                  title={item.title}
                  imgUrl={item.imageUrl}
                  date={item.gmtTime}
                  loading={loading}
                />
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default Explore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginVertical: 10,
  },
  titleText: {
    fontSize: 20,
    fontFamily: "InclusiveSans",
  },
  carouselContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginVertical: 0,
  },
  newsCategoryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#fff7f1",
    padding: 10,
    borderRadius: 20,
    width: 100,
  },
  newsCategoryText: {
    fontSize: 16,
    fontFamily: "InclusiveSans",
  },
  newsConatiner: {
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginVertical: 1,
  },
  newsItemConatiner: {
    marginVertical: 10,
    backgroundColor: "#fff7f1",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  newsItemImageContainer: {
    height: 150,
    width: "100%",
    marginVertical: 10,
  },
  newsItemCoreConatiner: {
    marginVertical: 10,
    padding: 10,
  },
  newsItemInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FEFDED",
    padding: 10,
    borderRadius: 10,
  },
  newsItemTitleText: {
    fontSize: 20,
    fontFamily: "InclusiveSans",
  },
  newsItemText: {
    fontSize: 14,
    fontFamily: "InclusiveSans",
    fontWeight: "200",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  newsItemInfoLogoConatiner: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    marginVertical: 10,
  },
  newsItemInfoText: {
    fontSize: 14,
    fontFamily: "InclusiveSans",
    fontWeight: "200",
  },
  newsItemSaveContainer: {},
});
