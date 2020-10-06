import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/AntDesign';

import Home from '~/screens/Home';
import Detail from '~/screens/Detail';
import Search from '~/screens/Search';

export type StackScreensParams = {
  List: {};
  Details: {
    id: number;
  };
};

const Stack = createStackNavigator<StackScreensParams>();
const Tabs = createBottomTabNavigator();

const ShowNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="List" component={Home} />
    <Stack.Screen name="Details" component={Detail} />
  </Stack.Navigator>
);

export default () => (
  <NavigationContainer>
    <Tabs.Navigator>
      <Tabs.Screen
        name="Home"
        component={ShowNavigator}
        options={{ tabBarIcon: (props) => <Icon {...props} name="home" /> }}
      />

      <Tabs.Screen
        name="Search"
        component={Search}
        options={{ tabBarIcon: (props) => <Icon {...props} name="search1" /> }}
      />
    </Tabs.Navigator>
  </NavigationContainer>
);
