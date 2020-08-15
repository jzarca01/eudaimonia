import React, { useState, useEffect } from "react";
import * as Updates from "expo-updates";
import { AppLoading } from "expo";
import { checkForUpdateAsync } from "expo-updates";
import { createAppContainer } from "react-navigation";

import StackNavigator from "./navigation/";

const AppContainer = createAppContainer(StackNavigator);

const App = () => {
  const [isChecked, setChecked] = useState(false);

  async function updateApp() {
    const { isAvailable } = await checkForUpdateAsync();

    if (isAvailable) {
      await Updates.fetchUpdateAsync();
      await Updates.reloadAsync();
    }
  }

  if (!isChecked) {
    return (
      <AppLoading
        startAsync={updateApp}
        onFinish={() => setChecked(true)}
        onError={console.warn}
      />
    );
  }

  return <AppContainer />;
};

export default App;
