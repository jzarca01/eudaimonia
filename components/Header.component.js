import React, { createRef } from "react";
import { View } from "react-native";
import DelayInput from "react-native-debounce-input";
import * as theme from "../theme";


export const Header = ({ query, setQuery, styles }) => {
  const inputRef = createRef();
  return (
    <View style={[styles.flex, styles.row, styles.header, styles.paddingTop ]}>
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
};
