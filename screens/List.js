import React, { useState, useEffect } from "react";
import {
  Animated,
  Text,
  StyleSheet,
  View,
  ScrollView,
  FlatList,
  Image,
  ImageBackground,
  Dimensions,
  Platform,
  TouchableOpacity,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Octicons from "react-native-vector-icons/Octicons";

import * as theme from "../theme";
import { AudioPlayer } from "../components/AudioPlayer.component";
import { SearchBar } from "../components/SearchBar.component";

const { width, height } = Dimensions.get("window");
const mocks = [
  {
    id: 1,
    location: "Paris, France",
    title: "Paris Paradise",
    description: "Energizing ambience from the City of Light.",
    preview:
      "https://scontent-cdg2-1.xx.fbcdn.net/v/t1.0-9/18698360_1158297100947660_3228357811651368452_n.jpg?_nc_cat=104&_nc_sid=8bfeb9&_nc_ohc=kLMn_ORaJEcAX-BgKbg&_nc_ht=scontent-cdg2-1.xx&oh=63c2747342b33bf94c274443c91eabef&oe=5F40F8EF",
    url: "https://coffitivity.com/assets/sounds/full/mp3/paris-paradise.mp3",
    searchableTerms: "paris france",
  },
  {
    id: 2,
    location: "Rio de Janeiro, Brazil",
    title: "Brazil Bistro",
    description: "The musical chatter of a brazilian coffeehouse.",
    preview:
      "https://img.theculturetrip.com/1440x960/smart/wp-content/uploads/2018/03/webp-net-resizeimage-23-1.jpg",
    url: "https://coffitivity.com/assets/sounds/full/mp3/brazil-bistro.mp3",
    searchableTerms: "rio de janeiro brazil coffee coffeehouse house",
  },
  {
    id: 3,
    location: "Waco, Texas",
    title: "Texas Teahouse",
    description: "Hefty sounds from a big state.",
    preview:
      "https://media-cdn.tripadvisor.com/media/photo-s/12/ca/7f/d0/jake-s-texas-tea-house.jpg",
    url: "https://coffitivity.com/assets/sounds/full/mp3/texas-teahouse.mp3",
    searchableTerms: "waco texas usa tea teahouse house",
  },
];
const styles = StyleSheet.create({
  flex: {
    flex: 0,
  },
  column: {
    flexDirection: "column",
  },
  row: {
    flexDirection: "row",
  },
  header: {
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.sizes.padding,
    paddingTop: theme.sizes.padding * 1.33,
    justifyContent: "space-between",
    alignItems: "center",
  },
  destinations: {
    flex: 1,
    justifyContent: "space-between",
    paddingBottom: 30,
  },
  destination: {
    width: width - theme.sizes.padding * 2,
    height: width * 0.6,
    marginHorizontal: theme.sizes.margin,
    paddingHorizontal: theme.sizes.padding,
    paddingVertical: theme.sizes.padding * 0.66,
    borderRadius: theme.sizes.radius,
  },
  destinationInfo: {
    position: "absolute",
    borderRadius: theme.sizes.radius,
    paddingHorizontal: theme.sizes.padding,
    paddingVertical: theme.sizes.padding / 2,
    bottom: 20,
    left: (width - theme.sizes.padding * 4) / (Platform.OS === "ios" ? 3.2 : 3),
    backgroundColor: theme.colors.white,
    width: width - theme.sizes.padding * 4,
  },
  recommendedHeader: {
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingHorizontal: theme.sizes.padding,
  },
  recommendation: {
    width: (width - theme.sizes.padding * 2) / 2,
    marginHorizontal: 8,
    backgroundColor: theme.colors.white,
    overflow: "hidden",
    borderRadius: theme.sizes.radius,
    marginVertical: theme.sizes.margin * 0.5,
  },
  recommendationHeader: {
    overflow: "hidden",
    borderTopRightRadius: theme.sizes.radius,
    borderTopLeftRadius: theme.sizes.radius,
  },
  recommendationOptions: {
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.sizes.padding / 2,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  recommendationTemp: {
    fontSize: theme.sizes.font * 1.25,
    color: theme.colors.white,
  },
  recommendationImage: {
    width: (width - theme.sizes.padding * 2) / 2,
    height: (width - theme.sizes.padding * 2) / 2,
  },
  avatar: {
    width: theme.sizes.padding,
    height: theme.sizes.padding,
    borderRadius: theme.sizes.padding / 2,
  },
  rating: {
    fontSize: theme.sizes.font * 2,
    color: theme.colors.white,
    fontWeight: "bold",
  },
  shadow: {
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
  },
  dots: {
    width: 10,
    height: 10,
    borderWidth: 2.5,
    borderRadius: 5,
    marginHorizontal: 6,
    backgroundColor: theme.colors.gray,
    borderColor: "transparent",
  },
  activeDot: {
    width: 12.5,
    height: 12.5,
    borderRadius: 6.25,
    borderColor: theme.colors.active,
  },
});

const List = ({ destinations, navigation }) => {
  const scrollX = new Animated.Value(0);

  const [query, setQuery] = useState("");
  const [filteredDestinations, setFilteredDestinations] = useState(
    destinations
  );

  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const lowerCaseQuery = query.toLowerCase();
    const newDestinations = destinations.filter((item) =>
      item.searchableTerms.includes(lowerCaseQuery)
    );

    setFilteredDestinations(newDestinations);
  }, [query]);

  const HeaderComponent = () => (
    <View style={[styles.flex, styles.row, styles.header]}>
        <SearchBar
          style={{ fontSize: theme.sizes.font }}
          placeholder={"Search..."}
          onChangeText={(text) => setQuery(text)}
          value={query}
        />
    </View>
  );

  const toggleSound = (item) => {
    if (selectedItem === item) {
      setSelectedItem(null);
    } else {
      setSelectedItem(item);
    }
  };

  const renderDots = () => {
    const dotPosition = Animated.divide(scrollX, width);
    return (
      <View
        style={[
          styles.flex,
          styles.row,
          { justifyContent: "center", alignItems: "center", marginTop: 10 },
        ]}
      >
        {destinations.map((item, index) => {
          const borderWidth = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0, 2.5, 0],
            extrapolate: "clamp",
          });
          return (
            <Animated.View
              key={`step-${item.id}`}
              style={[
                styles.dots,
                styles.activeDot,
                { borderWidth: borderWidth },
              ]}
            />
          );
        })}
      </View>
    );
  };

  const renderRecommendations = () => {
    return (
      <React.Fragment>
        <View style={[styles.flex, styles.row, styles.header, {paddingTop: 0, paddingBottom: theme.sizes.padding * 0.67 }]}>
          <Text style={{ fontSize: theme.sizes.font * 2 }}>Recommended </Text>
        </View>
        <View style={[styles.column, styles.destinations]}>
          <FlatList
            horizontal
            pagingEnabled
            scrollEnabled
            showsHorizontalScrollIndicator={false}
            decelerationRate={0}
            scrollEventThrottle={16}
            snapToAlignment="center"
            style={{ overflow: "visible", height: 280 }}
            data={destinations}
            keyExtractor={(item, index) => `${item.id}`}
            onScroll={Animated.event([
              { nativeEvent: { contentOffset: { x: scrollX } } },
            ], {useNativeDriver: false})}
            renderItem={({ item }) => renderRecommendation(item)}
          />
          {renderDots()}
        </View>
      </React.Fragment>
    );
  };

  const renderRecommendation = (item) => {
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={() => toggleSound(item)}>
        <ImageBackground
          style={[styles.flex, styles.destination, styles.shadow]}
          imageStyle={[
            { borderRadius: theme.sizes.radius },
            selectedItem === item ? { opacity: 0.2 } : { opacity: 1 },
          ]}
          source={{ uri: item.preview }}
        >
          <View style={[styles.row, { justifyContent: "space-between" }]}>
            <View style={[styles.column, { flex: 1 }]}>
              <Text style={{ color: theme.colors.white }}>
                <Octicons
                  name="location"
                  size={theme.sizes.font * 0.8}
                  color={theme.colors.white}
                />
                <Text> {item.location}</Text>
              </Text>
            </View>
          </View>
        </ImageBackground>
        <View style={[styles.column, styles.destinationInfo, styles.shadow]}>
          <Text
            style={{
              fontSize: theme.sizes.font * 1.25,
              fontWeight: "500",
              paddingBottom: 8,
            }}
          >
            {item.title}
          </Text>
          <View
            style={[
              styles.row,
              { justifyContent: "space-between", alignItems: "flex-end" },
            ]}
          >
            <Text style={{ color: theme.colors.caption }}>
              {item.description.split("").slice(0, 50)}...
            </Text>
            <FontAwesome
              name="chevron-right"
              size={theme.sizes.font * 0.75}
              color={theme.colors.caption}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderDestinations = () => {
    return (
      <View style={[styles.flex, styles.column, styles.recommended]}>
        <View style={[styles.row, styles.recommendedHeader]}>
          <Text style={{ fontSize: theme.sizes.font * 1.4 }}>
            Our ambient sounds{" "}
          </Text>
        </View>
        <View style={[styles.column, styles.recommendedList]}>
          <FlatList
            numColumns={2}
            columnWrapperStyle={{
              marginTop: 10,
              marginHorizontal: theme.sizes.margin * 0.5,
            }}
            pagingEnabled
            scrollEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            snapToAlignment="center"
            style={[styles.shadow, { overflow: "visible" }]}
            data={filteredDestinations}
            keyExtractor={(item, index) => `${item.id}`}
            renderItem={({ item, index }) => renderDestination(item, index)}
          />
        </View>
      </View>
    );
  };

  const renderDestination = (item, index) => {
    const isLastItem = index === destinations.length - 1;
    return (
      <TouchableOpacity
        style={[
          styles.flex,
          styles.column,
          styles.recommendation,
          styles.shadow,
          isLastItem ? { marginRight: theme.sizes.margin / 2 } : null,
        ]}
        onPress={() => toggleSound(item)}
      >
        <View style={[styles.flex, styles.recommendationHeader]}>
          <Image
            style={[
              styles.recommendationImage,
              selectedItem === item ? { opacity: 0.2 } : { opacity: 1 },
            ]}
            source={{ uri: item.preview }}
          />
        </View>
        <View
          style={[
            styles.flex,
            styles.column,
            styles.shadow,
            {
              justifyContent: "space-evenly",
              padding: theme.sizes.padding / 2,
            },
          ]}
        >
          <Text
            style={{
              fontSize: theme.sizes.font * 1.25,
              fontWeight: "500",
              paddingBottom: theme.sizes.padding / 4.5,
            }}
          >
            {item.title}
          </Text>
          <Text style={{ color: theme.colors.caption }}>
            {item.description}
          </Text>
          <View
            style={[
              styles.row,
              {
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: theme.sizes.margin,
              },
            ]}
          ></View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <React.Fragment>
      <HeaderComponent />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: theme.sizes.padding }}
      >
        {query === "" && renderRecommendations()}
        {renderDestinations()}
      </ScrollView>
      <AudioPlayer item={selectedItem} />
    </React.Fragment>
  );
};

List.defaultProps = {
  destinations: mocks,
};

export default List;
