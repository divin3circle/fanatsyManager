import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import useThemeStore from "../../utils/store";
import { COLORS } from "../../utils/Colors";
import Caurosel from "../components/welcome_components/Carousel";
import { news, teams } from "../../utils/Data";
import { Ionicons } from "@expo/vector-icons";

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
  name,
  title,
  logo,
  imgUrl,
  description,
  date,
  time,
}: News) => {
  const [isBookmarked, setIsBookmarked] = React.useState(false);
  const bookmarkNews = () => {
    setIsBookmarked(!isBookmarked);
    return alert(`News ${isBookmarked ? "Removed" : "Bookmarked"}`);
  };
  return (
    <View style={styles.newsItemConatainer}>
      {/* Image */}
      <View style={styles.newsItemImageContainer}>
        <Image
          source={{ uri: imgUrl }}
          style={{ width: "100%", height: "100%", borderRadius: 10 }}
        />
      </View>
      {/* Core */}
      <View style={styles.newsItemCoreConatainer}>
        <Text style={styles.newsItemTitleText}>{title}</Text>
        <Text style={styles.newsItemText}>
          {description.substring(0, 100)}
          <Text style={{ color: "blue", fontSize: 12 }}>...Read More</Text>
        </Text>
      </View>
      {/* Info */}
      <View style={styles.newsItemInfoContainer}>
        {/* Logo */}
        <View style={styles.newsItemInfoLogoConatiner}>
          <Image
            source={logo}
            style={{ width: 30, height: 30, borderRadius: 10 }}
          />
          <Text style={styles.newsItemInfoText}>{name}</Text>
        </View>
        {/* Text */}
        <View>
          <Text style={styles.newsItemInfoText}>
            {date} : {time}
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
    </View>
  );
};

const Explore = () => {
  const { theme, toggleTheme } = useThemeStore();
  const [fetchedNews, setFetchedNews] = React.useState([]);
  const url =
    "https://football-news-aggregator-live.p.rapidapi.com/news/fourfourtwo/epl";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "d5bc29aec0msh2f3f9cf6402fd71p131be5jsnfbb7388e8690",
      "X-RapidAPI-Host": "football-news-aggregator-live.p.rapidapi.com",
    },
  };
  const fetchNews = async () => {
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setFetchedNews(result);
    } catch (error) {
      console.error(error);
    }
  };
  React.useEffect(() => {
    fetchNews();
  }, []);
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
        <Text style={styles.titleText}>Explore Pre-Match News</Text>
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
      <View style={styles.newsCategoryContainer}>
        <TouchableOpacity style={styles.catergoryContainer}>
          <Text style={styles.newsCategoryText}>Latest</Text>
          <Ionicons name="newspaper-outline" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.catergoryContainer}>
          <Text style={styles.newsCategoryText}>Trending</Text>
          <Ionicons name="camera-outline" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.catergoryContainer}>
          <Text style={styles.newsCategoryText}>Fantasy</Text>
          <Ionicons name="flame-outline" size={20} color="black" />
        </TouchableOpacity>
      </View>
      {/* News */}
      <ScrollView>
        <View style={styles.newsConatainer}>
          {news.map((item) => {
            return (
              <NewsItem
                key={item.id}
                name={item.name}
                title={item.title}
                logo={item.logo}
                imgUrl={item.imgUrl}
                description={item.description}
                date={item.date}
                time={item.time}
              />
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
    fontWeight: "bold",
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
  catergoryContainer: {
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
    fontWeight: "bold",
    fontFamily: "InclusiveSans",
  },
  newsConatainer: {
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginVertical: 1,
  },
  newsItemConatainer: {
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
  },
  newsItemCoreConatainer: {
    marginVertical: 10,
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
    fontWeight: "bold",
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
    width: 90,
  },
  newsItemInfoText: {
    fontSize: 14,
    fontFamily: "InclusiveSans",
    fontWeight: "200",
  },
  newsItemSaveContainer: {},
});
