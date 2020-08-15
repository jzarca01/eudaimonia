import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Video } from 'expo-av';

export default (props) => {
  const { story } = props;
  const { url, type } = story || {};

  return (
    <View style={styles.container}>
      {type === 'image' ? (
        <Image
          source={{ uri: url }}
          onLoadEnd={props.onImageLoaded}
          style={styles.content}
          resizeMode="cover"
        />
      )
        : (
          <Video
            source={{ uri: url }}
            shouldPlay
            onLoad={item => props.onVideoLoaded(item)}
            style={styles.content}
          />
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: { width: '100%',
    height: '100%',
    flex: 1,
  },
  imageContent: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  loading: {
    backgroundColor: 'black',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

});