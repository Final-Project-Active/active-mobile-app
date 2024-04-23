import { FlatList, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import { LinearGradient } from "expo-linear-gradient"
import { useEffect, useState } from "react";
import { serverRequest } from "../utils/axios";
import { getItemAsync } from "expo-secure-store";
import Image12 from "../assets/Image12.png";

export default function UserWorkoutScreen({ navigation }) {
  const [data, setData] = useState([])
  const [name, setName] = useState("")

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
      setName(user.data.name);

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
        <View style={styles.logoContainer}>
                    <Image source={Image12} style={styles.logo} />
                </View>
          <Text style={styles.heading}>
            My Workout
          </Text>
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
    paddingTop: 10,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 20
  },
  logo: {
    left: -20
  },
  heading: {
    color: "white",
    fontSize: 30,
    textAlign: "center"
  },
  userName: {
    fontWeight: "bold",
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