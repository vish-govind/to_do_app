import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Task_list from "./Screens/Task_List";

const Stack = createStackNavigator();

export default function App () : JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Task_List">
      <Stack.Screen name="Task_List" component={Task_list} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>

  )
}