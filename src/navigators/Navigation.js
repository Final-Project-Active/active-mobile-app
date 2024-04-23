import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WelcomeScreen from '../screens/WelcomeScreen';
import AuthOptionsScreen from '../screens/AuthOptionsScreen';
import GenderSelectionScreen from '../screens/GenderSelectionScreen';
import AgeSelectionScreen from '../screens/AgeSelectionScreen';
import HeightSelectionScreen from '../screens/HeightSelectionScreen';
import GoalSelectionScreen from '../screens/GoalSelectionScreen';
import LevelSelectionScreen from '../screens/LevelSelectionScreen';
import WeightSelectionScreen from '../screens/WeightSelectionScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';
import UserWorkoutScreen from "../screens/UserWorkoutScreen";
import AnalyticsScreen from "../screens/AnalyticsScreen";
import ProgressFormScreen from "../screens/ProgressFormScreen";
import CommunityScreen from "../screens/CommunityScreen";
import NotificationScreen from '../screens/NotificationScreen';
import { useContext, useEffect } from 'react';
import { getItemAsync } from 'expo-secure-store';
import ProfileScreen from '../screens/ProfileScreen';
import AuthContext from '../contexts/authContext';
import { Entypo, Feather, Ionicons } from '@expo/vector-icons';
import { Text } from 'react-native';
import AddPostScreen from '../screens/AddPostScreen';
import PostDetailScreen from '../screens/PostDetailScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => (
    <Stack.Navigator>
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
    </Stack.Navigator>
)

const CommunityStack = () => (
    <Stack.Navigator>
        <Stack.Screen name="CommunityScreen" component={CommunityScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AddPostScreen" component={AddPostScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PostDetailScreen" component={PostDetailScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
)

const HomeStack = () => (
    <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="UserWorkoutScreen" component={UserWorkoutScreen} options={{ headerShown: false }} />
        <Stack.Screen name="WorkoutDetail" component={WorkoutDetail} options={{ headerShown: false }} />
    </Stack.Navigator>
)


const MainTabs = () => (
    <Tab.Navigator
        screenOptions={{
            tabBarStyle: {
                backgroundColor: "black",
                width: "100%",
                height: 60,
                alignSelf: "center",
                borderRadius: 0
            },
            tabBarActiveTintColor: "#59A5D8",
            tabBarInactiveTintColor: "#9DB2CE"
        }}
    >
        <Tab.Screen
            name="HomeStack"
            component={HomeStack}
            options={({ route }) => ({
                tabBarIcon: ({ color, size }) => (
                    <Feather name="home" size={size} color={color} />
                ),
                tabBarLabel: ({ focused, color }) => (
                    focused ? <Text style={{ color: "#59A5D8", fontSize: 12 }}>Home</Text> : null
                ),
                tabBarStyle: {
                    backgroundColor: "black",
                    borderTopWidth: 0
                },
                headerShown: false
            }
            )} />
        <Tab.Screen
            name="AnalyticsScreen"
            component={AnalyticsScreen}
            options={({ route }) => ({
                tabBarIcon: ({ color, size }) => (
                    <Entypo name="bar-graph" size={size} color={color} />
                ),
                tabBarLabel: ({ focused, color }) => (
                    focused ? <Text style={{ color: "#59A5D8", fontSize: 12 }}>Analytics</Text> : null
                ),
                tabBarStyle: {
                    backgroundColor: "black",
                    borderTopWidth: 0
                },
                headerShown: false
            }
            )} />
        <Tab.Screen
            name="CommunityStack"
            component={CommunityStack}
            options={({ route }) => ({
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="people-circle-outline" size={size} color={color} />
                ),
                tabBarLabel: ({ focused, color }) => (
                    focused ? <Text style={{ color: "#59A5D8", fontSize: 12 }}>Community</Text> : null
                ),
                tabBarStyle: {
                    backgroundColor: "black",
                    borderTopWidth: 0
                },
                headerShown: false
            }
            )} />
        <Tab.Screen
            name="NotificationScreen"
            component={NotificationScreen}
            options={({ route }) => ({
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="notifications" size={size} color={color} />
                ),
                tabBarLabel: ({ focused, color }) => (
                    focused ? <Text style={{ color: "#59A5D8", fontSize: 12 }}>Notification</Text> : null
                ),
                tabBarStyle: {
                    backgroundColor: "black",
                    borderTopWidth: 0
                },
                headerShown: false
            }
            )} />
        <Tab.Screen
            name="ProfileScreen"
            component={ProfileScreen}
            options={({ route }) => ({
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="person" size={size} color={color} />
                ),
                tabBarLabel: ({ focused, color }) => (
                    focused ? <Text style={{ color: "#59A5D8", fontSize: 12 }}>Profile</Text> : null
                ),
                tabBarStyle: {
                    backgroundColor: "black",
                    borderTopWidth: 0
                },
                headerShown: false
            }
            )} />
    </Tab.Navigator>
)

export default function navigation() {
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

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
                {isLoggedIn ? (
                    <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
                ) : (
                    <>
                        <Stack.Screen name="AuthStack" component={AuthStack} options={{ headerShown: false }} />
                        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }} />
                    </>

                )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}