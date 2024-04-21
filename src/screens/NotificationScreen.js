import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import { Feather, FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useState } from "react";

export default function NotificationScreen({ navigation }) {
    const [activeTab, setActiveTab] = useState("Home")
    const [selectedOption, setSelectedOption] = useState("New")

    const handleTabPress = (tabName) => {
        setActiveTab(tabName)
        navigation.navigate(tabName)
    }

    const handleOptionSelect = (option) => {
        setSelectedOption(option)
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.heading}>
                        Notifications
                    </Text>
                    <View style={styles.ellipseContainer}>
                        <View style={styles.ovalContainer}>
                            <TouchableOpacity
                                style={[styles.ellipse, selectedOption === "New" && styles.selectedEllipse]}
                                onPress={() => handleOptionSelect("New")}
                            >
                                <Text style={[styles.optionText, selectedOption === "New" && styles.selectedOptionText]}>New</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.ellipse, selectedOption === "Events" && styles.selectedEllipse]}
                                onPress={() => handleOptionSelect("Events")}
                            >
                                <Text style={[styles.optionText, selectedOption === "Events" && styles.selectedOptionText]}>Events</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.ellipse, selectedOption === "All" && styles.selectedEllipse]}
                                onPress={() => handleOptionSelect("All")}
                            >
                                <Text style={[styles.optionText, selectedOption === "All" && styles.selectedOptionText]}>All</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.line}></View>
                    <View style={styles.notificationContainer}>
                        <Text style={styles.notificationHeading}>
                            <FontAwesome name="circle" size={10} color="red" /> Congratulations
                        </Text>
                        <View style={styles.notificationHourContainer}>
                            <Text style={styles.notificationHour}>9:45 AM</Text>
                        </View>
                    </View>
                    <Text style={styles.notificationText}>
                        35% your daily challenge completed
                    </Text>
                    <View style={styles.line}></View>
                    <View style={styles.notificationContainer}>
                        <Text style={styles.notificationHeading}>
                            Attention
                        </Text>
                        <View style={styles.notificationHourContainer}>
                            <Text style={styles.notificationHour}>9:38 AM</Text>
                        </View>
                    </View>
                    <Text style={styles.notificationText}>
                        Your subscription is going to expire
                        very soon. Subscribe now.
                    </Text>
                    <View style={styles.line}></View>
                    <View style={styles.notificationContainer}>
                        <Text style={styles.notificationHeading}>
                            Daily Activity
                        </Text>
                        <View style={styles.notificationHourContainer}>
                            <Text style={styles.notificationHour}>8:25 AM</Text>
                        </View>
                    </View>
                    <Text style={styles.notificationText}>
                        Time for your workout session
                    </Text>

                </View>
            </SafeAreaView>
            <View style={styles.bottomTabContainer}>
                <TouchableOpacity style={styles.tabItem} onPress={() => handleTabPress("HomeScreen")}>
                    <Feather name="home" size={24} color={activeTab === "HomeScreen" ? "#59A5D8" : "#9DB2CE"} />
                    {activeTab === "Home" && <Text style={styles.tabText}>Home</Text>}
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
                    {activeTab === "Notification" && <Text style={styles.tabText}>Notification</Text>}
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabItem} onPress={() => handleTabPress("Profile")}>
                    <Ionicons name="person" size={24} color={activeTab === "Profile" ? "#59A5D8" : "#9DB2CE"} />
                    {activeTab === "Profile" && <Text style={styles.tabText}>Profile</Text>}
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
    heading: {
        color: "white",
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center"
    },
    ellipseContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 50
    },
    ovalContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#2C2C2E",
        borderRadius: 50,
    },
    ellipse: {
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
        padding: 5,
        width: 100
    },
    selectedEllipse: {
        backgroundColor: "#59A5D8"
    },
    optionText: {
        color: "white",
        fontSize: 14,
        fontWeight: "bold"
    },
    selectedOptionText: {
        color: "black"
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
        marginTop: 50,
        marginHorizontal: 0
    },
    notificationContainer: {
        marginTop: 10,
        flexDirection: "row",
        alignItems: "left"
    },
    notificationHeading: {
        fontWeight: "bold",
        color: "white",
        textAlign: "left",
    },
    notificationHourContainer: {
        flex: 1,
        alignItems: "flex-end"
    },
    notificationHour: {
        color: "white"
    },
    notificationText: {
        color: "white",
        textAlign: "left",
        marginTop: 10
    }
})