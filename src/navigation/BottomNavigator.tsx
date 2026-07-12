import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

import DiscoverScreen from "../screens/DiscoverScreen";
import MatchesScreen from "../screens/MatchesScreen";
import AICoachScreen from "../screens/AICoachScreen";
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
        tabBarInactiveTintColor: "#9CA3AF",

        tabBarStyle: {
          height: 72,
          paddingTop: 8,
          paddingBottom: 8,
          backgroundColor: COLORS.white,
          borderTopWidth: 0,
          elevation: 12,

          shadowColor: "#000",
          shadowOpacity: 0.08,
          shadowRadius: 10,
          shadowOffset: {
            width: 0,
            height: -2,
          },
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

            case "AI Coach":
              icon = "sparkles";
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
        name="AI Coach"
        component={AICoachScreen}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
}