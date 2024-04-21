import { FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import Image10 from "../assets/Image10.png"
import { LinearGradient } from "expo-linear-gradient"
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useState } from "react";

export default function HomeScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState("Home")

  const getTimeOfDay = () => {
    const currentTime = new Date().getHours()

    if (currentTime >= 5 && currentTime < 12) {
      return "Good morning."
    } else if (currentTime >= 12 && currentTime < 18) {
      return "Good afternoon."
    } else {
      return "Good evening."
    }
  }

  const formattedDate = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    const currentDate = new Date()
    const day = days[currentDate.getDay()]
    const date = currentDate.getDate()
    const month = months[currentDate.getMonth()]
    const year = currentDate.getFullYear()

    return `${day}, ${date} ${month} ${year}`
  }

  const renderCard = () => {
    return (
      <View style={styles.cardContainer}>
        <ImageBackground
          source={Image10}
          style={styles.cardBackground}
        >
          <LinearGradient
            colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.7)"]}
            style={styles.linearGradient}
          >
            <Text style={styles.workoutName}>Hello</Text>
            <Text style={styles.workoutTime}>| morning</Text>
          </LinearGradient>
        </ImageBackground>
      </View>
    )
  }

  const handleTabPress = (tabName) => {
    setActiveTab(tabName)
    navigation.navigate(tabName)
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.heading}>
            Hello{" "}
            <Text style={styles.userName}>
              User,
            </Text>
          </Text>
          <Text style={styles.greeting}>
            {getTimeOfDay()}
          </Text>
          <View style={styles.workoutPlanContainer}>
            <Text style={styles.workoutPlan}>Today's Workout Plan</Text>
            <View style={styles.currentDateContainer}>
              <Text style={styles.currentDate}>{formattedDate()}</Text>
            </View>
          </View>
        </View>
        <FlatList
          data={[1, 2, 3, 4, 5, 6, 7]}
          renderItem={() => renderCard()}
          keyExtractor={(item) => item.toString()}
          contentContainerStyle={styles.flatListContainer}
        />
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
  },
  userName: {
    fontWeight: "bold",
  },
  greeting: {
    color: "white",
    fontWeight: "bold",
    marginTop: 10
  },
  workoutPlanContainer: {
    marginTop: 50,
    flexDirection: "row",
    alignItems: "center"
  },
  workoutPlan: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold"
  },
  currentDateContainer: {
    flex: 1,
    alignItems: "flex-end"
  },
  currentDate: {
    color: "#59A5D8"
  },
  cardContainer: {
    marginTop: 20,
    marginBottom: 20
  },
  cardBackground: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center"
  },
  linearGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    borderRadius: 10
  },
  workoutName: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
    marginTop: 120,
    marginLeft: 20
  },
  workoutTime: {
    color: "#59A5D8",
    fontSize: 15,
    marginTop: 5,
    marginLeft: 20
  },
  flatListContainer: {
    flexGrow: 1,
    paddingBottom: 20
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
  }
})