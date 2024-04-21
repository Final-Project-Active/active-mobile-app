import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "../screens/WelcomeScreen";
import AuthOptionsScreen from "../screens/AuthOptionsScreen";
import GenderSelectionScreen from "../screens/GenderSelectionScreen";
import AgeSelectionScreen from "../screens/AgeSelectionScreen";
import HeightSelectionScreen from "../screens/HeightSelectionScreen";
import GoalSelectionScreen from "../screens/GoalSelectionScreen";
import LevelSelectionScreen from "../screens/LevelSelectionScreen";
import WeightSelectionScreen from "../screens/WeightSelectionScreen";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import HomeScreen from "../screens/HomeScreen";

const Stack = createNativeStackNavigator()

export default function navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="AuthOptions" component={AuthOptionsScreen} options={{ headerShown: false }} />
                <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
                <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
                <Stack.Screen name="GenderSelectionScreen" component={GenderSelectionScreen} options={{ headerShown: false }} />
                <Stack.Screen name="AgeSelectionScreen" component={AgeSelectionScreen} options={{ headerShown: false }} />
                <Stack.Screen name="HeightSelectionScreen" component={HeightSelectionScreen} options={{ headerShown: false }} />
                <Stack.Screen name="GoalSelectionScreen" component={GoalSelectionScreen} options={{ headerShown: false }} />
                <Stack.Screen name="LevelSelectionScreen" component={LevelSelectionScreen} options={{ headerShown: false }} />
                <Stack.Screen name="WeightSelectionScreen" component={WeightSelectionScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}