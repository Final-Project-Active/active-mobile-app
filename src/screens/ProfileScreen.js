import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import { MaterialIcons } from '@expo/vector-icons';
import { useContext, useEffect, useState } from "react";
import AuthContext from '../contexts/authContext';
import { deleteItemAsync, getItemAsync } from 'expo-secure-store';
import { serverRequest } from "../utils/axios";
import { calculateTimeAgo } from "../utils/helpers";

export default function ProfileScreen({ navigation }) {
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
                    <View style={styles.profileContainer}>
                        <View style={styles.profileImageContainer}>
                            <View style={styles.profileImage}>
                                <Image
                                    source={{ uri: user.imageUrl }}
                                    style={{ width: 100, height: 100, borderRadius: 50 }}
                                />
                            </View>
                        </View>
                        <View style={{ borderLeftWidth: 1, borderLeftColor: "rgba(255, 255, 255, 0.3)", marginLeft: 90 }}>
                            <Text style={{ ...styles.joinedText, marginTop: 50, opacity: 0.3 }}>
                                Joined:
                            </Text>
                            <Text style={{ ...styles.joinedText, fontSize: 20, opacity: 0.7 }}>
                                {calculateTimeAgo(user.createdAt)}
                            </Text>
                        </View>
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
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
        paddingHorizontal: 20,
        paddingTop: 20
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
    profileContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    line: {
        borderBottomWidth: 1,
        borderBottomColor: "gray",
        marginTop: 10,
        marginHorizontal: 0,
    },
    heading: {
        color: "white",
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center"
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
    joinedText: {
        fontWeight: "bold",
        color: "white",
        textAlign: "left",
        marginLeft: 20,
    },
    profileText: {
        fontWeight: "bold",
        color: "white",
        textAlign: "left",
        paddingVertical: 10,
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
    },
    arrowIconJoined: {
        flex: 1,
        alignItems: "flex-end",
        paddingVertical: 10,
        marginTop: 40,
        opacity: 0.7
    }
})