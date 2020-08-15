import React, { useState, useEffect } from "react";
import * as Updates from "expo-updates";
import { checkForUpdateAsync } from "expo-updates";
import { createAppContainer } from "react-navigation";

import StackNavigator from "./navigation/";

const AppContainer = createAppContainer(StackNavigator);

const App = () => {
  const [isChecked, setChecked] = useState(false);
  useEffect(() => {
    async function updateApp() {
      const { isAvailable } = await checkForUpdateAsync();

      if (isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
      setChecked(true);
    }

    updateApp();
  }, []);

  return isChecked && <AppContainer />;
};

export default App;
