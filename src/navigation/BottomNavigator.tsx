import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

import DiscoverScreen from "../screens/DiscoverScreen";
import MatchesScreen from "../screens/MatchesScreen";
import ProfileScreen from "../screens/ProfileScreen";

import { COLORS } from "../theme/colors";

const Tab = createBottomTabNavigator();

export default function BottomNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Discover"
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: "#999",

        tabBarStyle: {
          height: 65,
          paddingTop: 8,
          paddingBottom: 8,
        },

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },

        tabBarIcon: ({ color, size }) => {
          let icon: keyof typeof Ionicons.glyphMap = "ellipse";

          switch (route.name) {
            case "Discover":
              icon = "heart";
              break;

            case "Matches":
              icon = "people";
              break;

            case "Profile":
              icon = "person-circle";
              break;
          }

          return (
            <Ionicons
              name={icon}
              size={size}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen
        name="Discover"
        component={DiscoverScreen}
      />

      <Tab.Screen
        name="Matches"
        component={MatchesScreen}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
}