import React, { useState, useEffect, createRef } from "react";
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
import DelayInput from "react-native-debounce-input";

import mocks from "./mocks";

const { width } = Dimensions.get("window");

const List = ({ navigation }) => {
  const scrollX = new Animated.Value(0);
  const inputRef = createRef();

  const [query, setQuery] = useState("");
  const [filteredDestinations, setFilteredDestinations] = useState(mocks);

  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const lowerCaseQuery = query.toLowerCase();
    const newDestinations = mocks.filter((item) =>
      item.searchableTerms.includes(lowerCaseQuery)
    );

    setFilteredDestinations(newDestinations);
  }, [query]);

  const HeaderComponent = () => (
    <View style={[styles.flex, styles.row, styles.header]}>
      <DelayInput
        value={query}
        placeholder={"Search..."}
        minLength={1}
        inputRef={inputRef}
        onChangeText={setQuery}
        delayTimeout={500}
        style={{ fontSize: theme.sizes.font }}
      />
    </View>
  );

  toggleSound = (item) => {
    if (selectedItem === item) {
      setSelectedItem(null);
    } else {
      setSelectedItem(item);
    }
  };

  renderDestinations = () => {
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
            renderItem={({ item, index }) =>
              this.renderDestination(item, index)
            }
          />
        </View>
      </View>
    );
  };

  renderDestination = (item, index) => {
    const isLastItem = index === filteredDestinations.length - 1;
    return (
      <TouchableOpacity
        style={[
          styles.flex,
          styles.column,
          styles.recommendation,
          styles.shadow,
          isLastItem ? { marginRight: theme.sizes.margin / 2 } : null,
        ]}
        onPress={() => this.toggleSound(item)}
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
        {this.renderDestinations()}
      </ScrollView>
      <AudioPlayer item={selectedItem} />
    </React.Fragment>
  );
};

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

export default List;
