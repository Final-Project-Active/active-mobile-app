import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "../screens/WelcomeScreen";
import AuthOptionsScreen from "../screens/AuthOptionsScreen";

const Stack = createNativeStackNavigator()

export default function navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="AuthOptions" component={AuthOptionsScreen} options={{ headerShown: false }}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}