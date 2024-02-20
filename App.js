import React from "react";
import { SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import Ionicons from "react-native-vector-icons/Ionicons";

import { LoginScreen, SplashScreen, RegisterScreen } from "./screens/auth";
import { MainTabs } from "./screens/MainBottomTab";
import {
  ProjectScreen,
  CreateProjectScreen,
  TaskScreen,
  ChecklistScreen,
  CreateTaskScreen,
} from "./screens/ProjectScreen";
import { NativeBaseProvider } from "native-base";

const Stack = createStackNavigator();

function StackSplash() {
  return (
    // <SafeAreaView flex={1}>
    <NavigationContainer>
      <NativeBaseProvider>
        <Stack.Navigator
          initialRouteName="SplashScreen"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen name="ProjectScreen" component={ProjectScreen} />
          <Stack.Screen name="TaskScreen" component={TaskScreen} />
          <Stack.Screen name="ChecklistScreen" component={ChecklistScreen} />
          <Stack.Screen
            name="CreateProjectScreen"
            component={CreateProjectScreen}
          />
          <Stack.Screen name="CreateTaskScreen" component={CreateTaskScreen} />
        </Stack.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
    // </SafeAreaView>
  );
}

export default StackSplash;
