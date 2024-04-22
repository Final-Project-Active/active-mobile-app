import { FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import { LinearGradient } from "expo-linear-gradient"
import { useEffect, useState } from "react";
import { serverRequest } from "../utils/axios";
import { getItemAsync } from "expo-secure-store";

export default function HomeScreen({ navigation }) {
  const [data, setData] = useState([])

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

  const renderCard = (thumbnail, name, time) => {
    const image = { uri: `http://img.youtube.com/vi/${thumbnail}/hqdefault.jpg` };
    return (
      <View style={styles.cardContainer}>
        <ImageBackground
          source={image}
          style={styles.cardBackground}
        >
          <LinearGradient
            colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.7)"]}
            style={styles.linearGradient}
          >
            <Text style={styles.workoutName}>{name}</Text>
            <Text style={styles.workoutTime}>| {time}</Text>
          </LinearGradient>
        </ImageBackground>
      </View>
    )
  }
  const getDataWorkouts = async () => {
    try {
      const { accessToken } = JSON.parse(await getItemAsync('user'));
      const user = await serverRequest({
        method: "get",
        url: "/user",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const response = await serverRequest({
        method: "get",
        url: `/workout?category=${user.data.physicalActivity}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setData(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getDataWorkouts()
  }, [])

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
          data={data}
          renderItem={({ item }) => renderCard(item.thumbnail, item.name, item.time)}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.flatListContainer}
        />
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
  }
})