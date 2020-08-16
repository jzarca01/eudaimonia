import React, { useState, useEffect } from "react";
import { ScrollView, View } from "react-native";

import styles from "../styles/List.styles";
import * as theme from "../theme";
import { Header } from "../components/Header.component";
import { AudioPlayer } from "../components/AudioPlayer.component";
import { DestinationsList } from "../components/DestinationsList.component";
import { Stories } from "../components/Stories.component";

import { ListLoader } from "../components/ListLoader.component";
import { createStories } from '../utils/createStories.util';

const List = ({ navigation }) => {
  const [query, setQuery] = useState("");
  const [filteredDestinations, setFilteredDestinations] = useState(mocks);
  const [stories, setStories ] = useState(null);
  const [isLoaded, setLoaded] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    getStories().then(res => res.json()).then(st => {
      if(st.length) {
        const structuredStories = createStories(st);
        console.log('st', structuredStories);
        setStories(structuredStories);
      }
      setLoaded(true);
    })
  }, []);

  const getStories = () => {
    return fetch('https://sheetdb.io/api/v1/xajdeqvm1a654');
  } 

  useEffect(() => {
    const lowerCaseQuery = query.toLowerCase();
    const newDestinations = mocks.filter((item) =>
      item.searchableTerms.includes(lowerCaseQuery)
    );

    setFilteredDestinations(newDestinations);
  }, [query]);

  toggleSound = (item) => {
    if (selectedItem === item) {
      setSelectedItem(null);
    } else {
      setSelectedItem(item);
    }
  };

  return (
    <>
      <ListLoader visible={!isLoaded}/>
      {isLoaded && (
        <React.Fragment>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: theme.sizes.padding }}
          >
            {stories && <Stories stories={stories} styles={styles} />}
            <Header styles={styles} query={query} setQuery={setQuery} />
            <DestinationsList
              styles={styles}
              onPress={toggleSound}
              destinations={filteredDestinations}
              selectedItem={selectedItem}
            />
          </ScrollView>
          <AudioPlayer item={selectedItem} />
        </React.Fragment>
      )}
    </>
  );
};

export default List;
