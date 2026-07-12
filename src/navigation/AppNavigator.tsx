import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "../screens/SplashScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";

import AboutScreen from "../screens/AboutScreen";
import PrivacyScreen from "../screens/PrivacyScreen";
import TermsScreen from "../screens/TermsScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import ContactSupportScreen from "../screens/ContactSupportScreen";

import UserTypeScreen from "../screens/onboarding/UserTypeScreen";
import ProfileBasicScreen from "../screens/onboarding/ProfileBasicScreen";
import ProfileInterestsScreen from "../screens/onboarding/ProfileInterestsScreen";
import ProfileGoalsScreen from "../screens/onboarding/ProfileGoalsScreen";
import ProfileLifestyleScreen from "../screens/onboarding/ProfileLifestyleScreen";
import ProfileValuesScreen from "../screens/onboarding/ProfileValuesScreen";
import ProfileAIQuestionsScreen from "../screens/onboarding/ProfileAIQuestionsScreen";
import ProfilePhotoScreen from "../screens/onboarding/ProfilePhotoScreen";

import ChatScreen from "../screens/ChatScreen";

import BottomNavigator from "./BottomNavigator";

import { COLORS } from "../theme/colors";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      >
        {/* Splash */}
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
        />

        {/* Authentication */}
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
        />

        <Stack.Screen
          name="Login"
          component={LoginScreen}
        />

        <Stack.Screen
          name="Signup"
          component={SignupScreen}
        />

        {/* Onboarding */}
        <Stack.Screen
          name="UserType"
          component={UserTypeScreen}
        />

        <Stack.Screen
          name="ProfileBasic"
          component={ProfileBasicScreen}
        />

        <Stack.Screen
          name="ProfileInterests"
          component={ProfileInterestsScreen}
        />

        <Stack.Screen
          name="ProfileGoals"
          component={ProfileGoalsScreen}
        />

        <Stack.Screen
          name="ProfileLifestyle"
          component={ProfileLifestyleScreen}
        />

        <Stack.Screen
          name="ProfileValues"
          component={ProfileValuesScreen}
        />

        <Stack.Screen
          name="ProfileAIQuestions"
          component={ProfileAIQuestionsScreen}
        />

        <Stack.Screen
          name="ProfilePhoto"
          component={ProfilePhotoScreen}
        />

        {/* Main App */}
        <Stack.Screen
          name="Main"
          component={BottomNavigator}
        />

        {/* Chat */}
        <Stack.Screen
          name="Chat"
          component={ChatScreen}
        />

        {/* About */}
        <Stack.Screen
          name="About"
          component={AboutScreen}
          options={{
            headerShown: true,
            title: "About SecondChance AI",
            headerTintColor: COLORS.primary,
            headerShadowVisible: false,
            headerTitleStyle: {
              fontWeight: "700",
            },
          }}
        />

        {/* Privacy */}
        <Stack.Screen
          name="Privacy"
          component={PrivacyScreen}
          options={{
            headerShown: true,
            title: "Privacy Policy",
            headerTintColor: COLORS.primary,
            headerShadowVisible: false,
            headerTitleStyle: {
              fontWeight: "700",
            },
          }}
        />
        <Stack.Screen
  name="Terms"
  component={TermsScreen}
  options={{
    headerShown: true,
    title: "Terms & Conditions",
    headerTintColor: COLORS.primary,
    headerShadowVisible: false,
    headerTitleStyle: {
      fontWeight: "700",
    },
  }}
/>
<Stack.Screen
  name="EditProfile"
  component={EditProfileScreen}
  options={{
    headerShown: true,
    title: "Edit Profile",
    headerTintColor: COLORS.primary,
    headerShadowVisible: false,
    headerTitleStyle: {
      fontWeight: "700",
    },
  }}
/>
<Stack.Screen
  name="ContactSupport"
  component={ContactSupportScreen}
  options={{
    headerShown: true,
    title: "Contact & Support",
    headerTintColor: COLORS.primary,
    headerShadowVisible: false,
    headerTitleStyle: {
      fontWeight: "700",
    },
  }}
/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
