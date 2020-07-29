import React, { useEffect } from 'react';
import * as Updates from 'expo-updates';
import { checkForUpdateAsync } from 'expo-updates';
import { createAppContainer } from 'react-navigation';

import StackNavigator from './navigation/';

const AppContainer = createAppContainer(StackNavigator);

const App = () => {
    useEffect(() => {
        async function updateApp() {
          const {isAvailable} = checkForUpdateAsync();
    
          if ( isAvailable === true) {
            await Updates.fetchUpdateAsync();
    
            await Updates.reloadAsync();
          }
        }
    
        updateApp();
      }, []);

      return <AppContainer />;
}

export default App;