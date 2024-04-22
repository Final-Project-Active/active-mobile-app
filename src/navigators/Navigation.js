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
import NotificationScreen from "../screens/NotificationScreen";
import { useEffect, useState } from 'react';
import { getItemAsync } from "expo-secure-store";
import ProfileScreen from "../screens/ProfileScreen";

const Stack = createNativeStackNavigator()

export default function navigation() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const user = JSON.parse(await getItemAsync('user'));
                if (user) {
                    setIsLoggedIn(true);
                }
            } catch (error) {
                console.log(error)
            }
        })()
    }, [])

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {!isLoggedIn ? (
                    <>
                        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="AuthOptionsScreen" component={AuthOptionsScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="SignInScreen" component={SignInScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="GenderSelectionScreen" component={GenderSelectionScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="AgeSelectionScreen" component={AgeSelectionScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="HeightSelectionScreen" component={HeightSelectionScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="GoalSelectionScreen" component={GoalSelectionScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="LevelSelectionScreen" component={LevelSelectionScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="WeightSelectionScreen" component={WeightSelectionScreen} options={{ headerShown: false }} />
                    </>
                ) : (
                    <>
                        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="NotificationScreen" component={NotificationScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}