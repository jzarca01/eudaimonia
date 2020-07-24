import React from "react";
import { createStackNavigator } from "react-navigation-stack";

import List from "../screens/List";
import Destination from "../screens/Destination";

export default createStackNavigator(
  {
    List,
    Destination
  },
  {
    headerMode: 'none',
    initialRouteName: "List"
  }
);
