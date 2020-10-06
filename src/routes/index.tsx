import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/AntDesign';

import Home from '~/screens/Home';

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

const ShowNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="List" component={Home} />
    <Stack.Screen name="Details" component={Home} />
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
    </Tabs.Navigator>
  </NavigationContainer>
);
