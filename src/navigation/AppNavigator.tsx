import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "../screens/SplashScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import DiscoverScreen from "../screens/DiscoverScreen";

import UserTypeScreen from "../screens/onboarding/UserTypeScreen";
import ProfileBasicScreen from "../screens/onboarding/ProfileBasicScreen";
import ProfileInterestsScreen from "../screens/onboarding/ProfileInterestsScreen";
import ProfileGoalsScreen from "../screens/onboarding/ProfileGoalsScreen";
import ProfileLifestyleScreen from "../screens/onboarding/ProfileLifestyleScreen";
import ProfileValuesScreen from "../screens/onboarding/ProfileValuesScreen";
import ProfileAIQuestionsScreen from "../screens/onboarding/ProfileAIQuestionsScreen";
import ProfilePhotoScreen from "../screens/onboarding/ProfilePhotoScreen";

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
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
        />

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

        <Stack.Screen
          name="Discover"
          component={DiscoverScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}