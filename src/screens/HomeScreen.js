import { FlatList, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import { LinearGradient } from "expo-linear-gradient"
import { useEffect, useState } from "react";
import { serverRequest } from "../utils/axios";
import { getItemAsync } from "expo-secure-store";
import { AsyncStorage } from 'react-native';
import Image12 from "../assets/Image12.png";

export default function HomeScreen({ navigation }) {
  const [data, setData] = useState([])
  const [name, setName] = useState("")
  const [myWorkouts, setMyWorkouts] = useState([])

  const getTimeOfDay = () => {
    const currentTime = new Date().getHours();

    if (currentTime >= 5 && currentTime < 12) {
      return 'Good morning.';
    } else if (currentTime >= 12 && currentTime < 18) {
      return 'Good afternoon.';
    } else {
      return 'Good evening.';
    }
  };

  const formattedDate = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    const currentDate = new Date();
    const day = days[currentDate.getDay()];
    const date = currentDate.getDate();
    const month = months[currentDate.getMonth()];
    const year = currentDate.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
  };

  const addToMyWorkout = async (workoutId) => {
    try {
      const { accessToken } = JSON.parse(await getItemAsync('user'))

      await serverRequest({
        method: "post",
        url: `/userWorkout/${workoutId}`,
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      setMyWorkouts(prev => [...prev, { _id: workoutId }])
    } catch (error) {
      console.log(error)
    }
  }
  const renderCard = (thumbnail, name, time, category, workoutId) => {
    const image = { uri: `http://img.youtube.com/vi/${thumbnail}/hqdefault.jpg` };
    const isAdded = myWorkouts.some(workout => workout._id === workoutId)
    return (
      <TouchableOpacity onPress={() => navigation.navigate('WorkoutDetail', { workoutId })}>
        <View style={styles.cardContainer}>
          {isAdded ? (
            <View style={styles.addedButtonContainer}>
              <Text style={styles.addedButtonText}>Added</Text>
            </View>
          ) : (
            <TouchableOpacity style={styles.plusButtonContainer} onPress={() => addToMyWorkout(workoutId)}>
              <Text style={styles.plusButtonText}>+</Text>
            </TouchableOpacity>
          )}
          <ImageBackground
            source={image}
            style={styles.cardBackground}
          >
            <LinearGradient
              colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.7)"]}
              style={styles.linearGradient}
            >
              <Text style={styles.workoutName}>{name}</Text>
              <View style={styles.badgeContainer}>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{time}</Text>
                </View>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{category}</Text>
                </View>
              </View>
            </LinearGradient>
          </ImageBackground>
        </View>
      </TouchableOpacity>
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
        url: `/workout?category=${user.data.physicalActivity.toLowerCase()}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setData(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getUserWorkouts = async () => {
    try {
      const { accessToken } = JSON.parse(await getItemAsync('user'));
      const response = await serverRequest({
        method: "get",
        url: "/userWorkout",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const idWorkouts = []
      for (let i = 0; i < response.data.length; i++) {
        idWorkouts.push({ _id: response.data[i].workoutId })
      }

      setMyWorkouts(prev => [...prev, ...idWorkouts])
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getDataWorkouts()
    getUserWorkouts()
  }, [])

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image source={Image12} style={styles.logo} />
            <TouchableOpacity onPress={() => navigation.navigate("UserWorkoutScreen")}>
              <Text style={styles.myWorkoutText}>My Workout</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.heading}>

            Hello{" "}
            <Text style={styles.userName}>
              {name},
            </Text>
          </Text>
          <Text style={styles.greeting}>{getTimeOfDay()}</Text>
          <View style={styles.workoutPlanContainer}>
            <Text style={styles.workoutPlan}>Today's Workout Plan</Text>
            <View style={styles.currentDateContainer}>
              <Text style={styles.currentDate}>{formattedDate()}</Text>
            </View>
          </View>
        </View>
        <FlatList
          data={data}
          renderItem={({ item }) => renderCard(item.thumbnail, item.name, item.time, item.category, item._id)}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.flatListContainer}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
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
  myWorkoutText: {
    color: "#59A5D8",
    fontWeight: "bold",
    paddingBottom: 10,
    textAlign: "right"
  },
  heading: {
    color: 'white',
    fontSize: 30,
  },
  userName: {
    fontWeight: 'bold',
  },
  greeting: {
    color: 'white',
    fontWeight: 'bold',
    marginTop: 10,
  },
  workoutPlanContainer: {
    marginTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  workoutPlan: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  currentDateContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  currentDate: {
    color: '#59A5D8',
  },
  cardContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  plusButtonContainer: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#59A5D8",
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1
  },
  plusButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  addedButtonContainer: {
    backgroundColor: "black",
    position: "absolute",
    top: 10,
    right: 10,
    width: 60,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    borderRadius: 50
  },
  addedButtonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
  cardBackground: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  linearGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    borderRadius: 10,
  },
  workoutName: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    marginTop: 120,
    marginLeft: 20,
  },
  workoutTime: {
    color: '#59A5D8',
    fontSize: 15,
    marginTop: 0,
    marginLeft: 20
  },
  workoutCategory: {
    color: "#59A5D8",
    fontSize: 15,
    marginTop: -5,
    marginLeft: 20
  },
  flatListContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  badgeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    maxWidth: 150,
    paddingLeft: 20
  },
  badge: {
    backgroundColor: "#333333",
    borderRadius: 8,
    marginRight: 5,
    padding: 5
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 12
  }
})