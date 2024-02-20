import React, { Component } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import {
  Dashboard,
  IndividualTaskScreen,
  ListTeamScreen,
  ProfileScreen,
} from "../main";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const DashboardScreen = "Dashboard";
const IndividualTask = "IndividualTask";
const ListTeam = "ListTeam";
const Profile = "Profile";

class MainTabs extends Component {
  render() {
    return (
      <Tab.Navigator
        initialRouteName={Dashboard}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let screen = route.name;

            if (screen == DashboardScreen) {
              iconName = focused ? "home" : "home-outline";
            } else if (screen == IndividualTask) {
              iconName = focused ? "document-text" : "document-text-outline";
            } else if (screen == ListTeam) {
              iconName = focused ? "people" : "people-outline";
            } else if (screen == Profile) {
              iconName = focused ? "person-circle" : "person-circle-outline";
            }

            return (
              <Ionicons name={iconName} size={24} color={color}></Ionicons>
            );
          },
          tabBarStyle: {
            height: 100,
            width: "100%",
            backgroundColor: "#343A40",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            position: "absolute",
          },
          tabBarActiveTintColor: "#FFFFFF",
          tabBarInactiveTintColor: "#CCCCCC",
          tabBarShowLabel: false,
        })}
      >
        <Tab.Screen
          name="Dashboard"
          component={Dashboard}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name={IndividualTask}
          component={IndividualTaskScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name={ListTeam}
          component={ListTeamScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    );
  }
}

export default MainTabs;
