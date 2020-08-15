import React, { useState, useEffect } from "react";
import { ScrollView, View } from "react-native";

import styles from "../styles/List.styles";
import * as theme from "../theme";
import { Header } from "../components/Header.component";
import { AudioPlayer } from "../components/AudioPlayer.component";
import { DestinationsList } from "../components/DestinationsList.component";
import { Stories } from "../components/Stories.component";

import mocks from "./mocks";
import { ListLoader } from "../components/ListLoader.component";

const stories = [
  {
    username: "Amit",
    title: "Pune Dairies",
    profile: "https://avatars0.githubusercontent.com/u/16208872?s=460&v=4",
    stories: [
      {
        id: 1,
        url:
          "https://images.unsplash.com/photo-1532579853048-ec5f8f15f88d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        type: "image",
        duration: 2,
        isReadMore: true,
      },
    ],
  },
  {
    username: "Trinadh",
    profile: "https://avatars2.githubusercontent.com/u/45196619?s=460&v=4",
    title: "My Gallery",
    stories: [
      {
        id: 1,
        url:
          "https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_480_1_5MG.mp4",
        type: "video",
        isReadMore: true,
      },
      {
        id: 2,
        url:
          "https://images.unsplash.com/photo-1476292026003-1df8db2694b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        type: "image",
        duration: 2,
        isSeen: false,
        isReadMore: true,
        isPaused: true,
      },
      {
        id: 3,
        url:
          "https://images.unsplash.com/photo-1498982261566-1c28c9cf4c02?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        type: "image",
        duration: 2,
        isSeen: false,
        isReadMore: true,
        isPaused: true,
      },
    ],
  },
  {
    username: "Steve Jobs",
    profile:
      "https://s3.amazonaws.com/media.eremedia.com/uploads/2012/05/15181015/stevejobs.jpg",
    title: " Beach Moves",
    stories: [
      {
        id: 1,
        url:
          "https://images.unsplash.com/photo-1515578706925-0dc1a7bfc8cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
        type: "image",
        duration: 2,
        isReadMore: true,
      },
      {
        id: 3,
        url:
          "https://images.unsplash.com/photo-1496287437689-3c24997cca99?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        type: "image",
        duration: 2,
        isSeen: false,
        isReadMore: true,
        isPaused: true,
      },
      {
        id: 4,
        url:
          "https://images.unsplash.com/photo-1514870262631-55de0332faf6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        type: "image",
        duration: 2,
        isSeen: false,
        isReadMore: true,
        isPaused: true,
      },
    ],
  },
  {
    username: "Rahul",
    profile:
      "https://images.unsplash.com/profile-1531581190171-0cf831d86212?dpr=2&auto=format&fit=crop&w=150&h=150&q=60&crop=faces&bg=fff",
    title: "Beauties @Beach",
    stories: [
      {
        id: 4,
        url:
          "https://images.unsplash.com/photo-1512101176959-c557f3516787?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        type: "image",
        duration: 2,
        isReadMore: true,
      },
      {
        id: 5,
        url:
          "https://images.unsplash.com/photo-1478397453044-17bb5f994100?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        type: "image",
        duration: 2,
        isSeen: false,
        isReadMore: true,
        isPaused: true,
      },
      {
        id: 4,
        url:
          "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=581&q=80",
        type: "image",
        duration: 2,
        isSeen: false,
        isReadMore: true,
        isPaused: true,
      },
    ],
  },
];

const List = ({ navigation }) => {
  const [query, setQuery] = useState("");
  const [filteredDestinations, setFilteredDestinations] = useState(mocks);
  const [stories, setStories ] = useState(null);
  const [isLoaded, setLoaded] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    getStories().then(res => res.json()).then(st => {
      const structuredStories = st.map(s => ({...s, stories: JSON.parse(s.stories)}))

      setStories(structuredStories);
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
            <Stories stories={stories} styles={styles} />
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
