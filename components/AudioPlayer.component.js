import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
} from "react-native";
import { Audio } from "expo-av";

import Octicons from "react-native-vector-icons/Octicons";
import * as theme from "../theme";

const { width, height } = Dimensions.get("window");

const FadeInView = (props) => {
  const heightAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(heightAnim, {
      toValue: 60,
      duration: 500,
      useNativeDriver: true
    }).start();
  }, [heightAnim]);

  return (
    <Animated.View
      style={{
        ...props.style,
        height: heightAnim,
      }}
    >
      {props.children}
    </Animated.View>
  );
};

const soundObject = new Audio.Sound();

const AudioPlayer = ({ item, ...rest }) => {
  const [isLoaded, setLoaded] = useState(false);
  const [shouldPlay, setShouldPlay] = useState(true);
  const [isPlaying, setPlaying] = useState(false);

  soundObject.setOnPlaybackStatusUpdate((status) => {
    if (status.isLoaded !== isLoaded) {
      setLoaded(status.isLoaded);
    }
    if (status.isPlaying && status.isPlaying !== isPlaying) {
      setPlaying(status.isPlaying);
    }
    if (status.shouldPlay && status.shouldPlay !== shouldPlay) {
      setShouldPlay(status.shouldPlay);
    }
  });

  useEffect(() => {
    Audio.setIsEnabledAsync(true);
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_MIX_WITH_OTHERS,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
      playThroughEarpieceAndroid: true,
      staysActiveInBackground: true,
    });
  }, []);

  useEffect(() => {
    if (item && item.url) {
      playSound(item.url);
    } else {
      stopAudio();
    }
  }, [item]);

  const stopAudio = async () => {
    setPlaying(false);
    await soundObject.unloadAsync();
  };

  const playSound = async (url) => {
    try {
      if (isPlaying) {
        stopAudio();
      }
      await soundObject.loadAsync({ uri: url }, { preload: "none" });
      await soundObject.playAsync();
    } catch (err) {
      console.log("error playSound", err);
    }
  };

  return (
    item && (
      <FadeInView style={styles.container}>
        <View style={styles.infos}>
          {!isLoaded && !shouldPlay && <Text>Loading...</Text>}
          {shouldPlay && (
            <View style={styles.controls}>
              {isPlaying && (
                <React.Fragment>
                  <TouchableOpacity style={styles.playButton}>
                    <Octicons
                      name="play"
                      size={theme.sizes.font}
                      color={theme.colors.black}
                    />
                  </TouchableOpacity>
                  <Text>Playing {item.title}...</Text>
                </React.Fragment>
              )}
              {!isPlaying && <Text>Buffering...</Text>}
            </View>
          )}
        </View>
      </FadeInView>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    height: 100,
    width: width,
    borderWidth: 1,
    borderRadius: 5,
  },
  infos: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  controls: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  playButton: {
    flexDirection: "column",
    marginHorizontal: 5,
    //justifyContent: "flex-start"
  },
});

export { AudioPlayer };
