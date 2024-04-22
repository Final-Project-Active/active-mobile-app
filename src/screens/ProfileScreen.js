import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import { Feather, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useContext, useEffect, useState } from "react";
import AuthContext from '../contexts/authContext';
import { deleteItemAsync, getItemAsync } from 'expo-secure-store';
import { serverRequest } from "../utils/axios";
import { calculateTimeAgo } from "../utils/helpers";

export default function ProfileScreen({ navigation }) {
    const [activeTab, setActiveTab] = useState('ProfileScreen')
    const [selectedOption, setSelectedOption] = useState("New")
    const [user, setUser] = useState({
        id: "",
        name: "",
        imageUrl: "",
        createdAt: "",
    })


    const { setIsLoggedIn } = useContext(AuthContext);

    const handleSignOut = async () => {
        try {
            await deleteItemAsync('user');
            setIsLoggedIn(false);
            navigation.navigate('WelcomeScreen')
        } catch (error) {
            console.log(error)
        }
    };

    const handleTabPress = (tabName) => {
        navigation.navigate(tabName, { name: tabName })
    }

    const handleOptionSelect = (option) => {
        setSelectedOption(option)
    }

    const getUserData = async () => {
        try {
            const { accessToken } = JSON.parse(await getItemAsync('user'));
            const user = await serverRequest({
                method: "get",
                url: "/user",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            setUser({
                id: user.data._id,
                name: user.data.name,
                imageUrl: user.data.imageUrl,
                createdAt: user.data.createdAt,
            })

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUserData()
    }, [])

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.profileImageContainer}>
                        <View style={styles.profileImage}>
                            <Image
                                source={{ uri: user.imageUrl }}
                                style={{ width: 100, height: 100, borderRadius: 50 }}
                            />
                        </View>
                    </View>
                    <View style={styles.line}>
                        <Text style={styles.profileText}>
                            Joined: {calculateTimeAgo(user.createdAt)}
                        </Text>
                    </View>
                    <Text style={styles.profileName}>
                        {user.name}
                    </Text>
                    <View style={styles.line}></View>
                    <View style={styles.profileContainer}>
                        <Text style={styles.profileText}>
                            Edit Profile
                        </Text>
                        <View style={styles.arrowIconContainer}>
                            <MaterialIcons name="keyboard-arrow-right" size={24} color="white" />
                        </View>
                    </View>
                    <View style={styles.line}></View>
                    <View style={styles.profileContainer}>
                        <Text style={styles.profileText}>
                            Privacy Policy
                        </Text>
                        <View style={styles.arrowIconContainer}>
                            <MaterialIcons name="keyboard-arrow-right" size={24} color="white" />
                        </View>
                    </View>
                    <View style={styles.line}></View>
                    <View style={styles.profileContainer}>
                        <Text style={styles.profileText}>
                            Settings
                        </Text>
                        <View style={styles.arrowIconContainer}>
                            <MaterialIcons name="keyboard-arrow-right" size={24} color="white" />
                        </View>
                    </View>
                    <View style={styles.line}></View>
                    <View style={styles.signOutLine}></View>
                    <View style={styles.profileContainer}>
                        <TouchableOpacity onPress={handleSignOut}>
                            <Text style={styles.signOutText}>Sign Out</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.line}></View>


                </View>
            </SafeAreaView>
            <View style={styles.bottomTabContainer}>
                <TouchableOpacity style={styles.tabItem} onPress={() => handleTabPress("HomeScreen")}>
                    <Feather name="home" size={24} color={activeTab === "HomeScreen" ? "#59A5D8" : "#9DB2CE"} />
                    {activeTab === "HomeScreen" && <Text style={styles.tabText}>Home</Text>}
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabItem} onPress={() => handleTabPress("Analytics")}>
                    <Entypo name="bar-graph" size={24} color={activeTab === "Analytics" ? "#59A5D8" : "#9DB2CE"} />
                    {activeTab === "Analytics" && <Text style={styles.tabText}>Analytics</Text>}
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabItem} onPress={() => handleTabPress("Community")}>
                    <Ionicons name="people-circle-outline" size={30} color={activeTab === "Community" ? "#59A5D8" : "#9DB2CE"} />
                    {activeTab === "Community" && <Text style={styles.tabText}>Community</Text>}
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabItem} onPress={() => handleTabPress("NotificationScreen")}>
                    <Ionicons name="notifications" size={29} color={activeTab === "NotificationScreen" ? "#59A5D8" : "#9DB2CE"} />
                    {activeTab === "NotificationScreen" && <Text style={styles.tabText}>Notification</Text>}
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabItem} onPress={() => handleTabPress("ProfileScreen")}>
                    <Ionicons name="person" size={24} color={activeTab === "ProfileScreen" ? "#59A5D8" : "#9DB2CE"} />
                    {activeTab === "ProfileScreen" && <Text style={styles.tabText}>Profile</Text>}
                </TouchableOpacity>
            </View>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 60
    },
    header: {
        paddingTop: 30,
    },
    profileImageContainer: {
        alignItems: "left",
        justifyContent: "left",
        marginBottom: 20,
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 2,
        borderColor: "#59A5D8",
        position: "relative"
    },
    profileImage: {
        position: "absolute",
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "#C4C4C4",
        top: "50%",
        left: "50%",
        transform: [{ translateX: -50 }, { translateY: -50 }]
    },
    profileName: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
        textAlign: "left",
        marginBottom: 20
    },
    heading: {
        color: "white",
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center"
    },
    bottomTabContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "black",
        padding: 5,
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0
    },
    tabItem: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
    },
    tabText: {
        color: "#59A5D8",
        fontSize: 12,
        marginTop: 5
    },
    line: {
        borderBottomWidth: 1,
        borderBottomColor: "gray",
        marginTop: 10,
        marginHorizontal: 0
    },
    profileContainer: {
        marginTop: 10,
        flexDirection: "row",
        alignItems: "left"
    },
    profileText: {
        fontWeight: "bold",
        color: "white",
        textAlign: "left",
        paddingVertical: 10
    },
    signOutText: {
        fontWeight: "bold",
        color: "#FF2424",
        textAlign: "left",
        paddingVertical: 10
    },
    signOutLine: {
        borderBottomWidth: 1,
        borderBottomColor: "gray",
        marginTop: 50,
        marginHorizontal: 0
    },
    arrowIconContainer: {
        flex: 1,
        alignItems: "flex-end",
        paddingVertical: 10
    }
})