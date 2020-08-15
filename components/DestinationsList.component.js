import React from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import * as theme from "../theme";

export const DestinationsList = ({ onPress, styles, destinations, selectedItem }) => {
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
        onPress={() => onPress(item)}
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
          data={destinations}
          keyExtractor={(item, index) => `destination-${item.id}`}
          renderItem={({ item, index }) => renderDestination(item, index)}
        />
      </View>
    </View>
  );
};
