import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useCallback, useEffect, useState } from 'react';
import { getItemAsync } from "expo-secure-store";
import { serverRequest } from '../utils/axios';
import { useRoute } from '@react-navigation/native';
import YoutubePlayer from "react-native-youtube-iframe";

export default function WorkoutDetail() {
  const route = useRoute()
  const {workoutId} = route.params
  const [workoutDetails, setWorkoutDetails] = useState(null)
  const [playing, setPlaying] = useState(false);
  const [myWorkouts, setMyWorkouts] = useState([]);
  const [complete, setComplete] = useState(false)

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
    }
  }, []);

  useEffect(() => {
    const getWorkoutDetails = async () => {
      try {
        const {accessToken} = JSON.parse(await getItemAsync('user'))

        const response = await serverRequest({
          method: "get",
          url: `/workout/${workoutId}`,
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
        setWorkoutDetails(response.data)
      } catch (error) {
        console.error(error)
      }
    }
    getWorkoutDetails()

    const getUserWorkout = async () => {
      try {
        const {accessToken} = JSON.parse(await getItemAsync('user'))

        const response = await serverRequest({
          method: "get",
          url: "/userworkout",
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })

        const workoutId = response.data.map(item => item.workoutId)
        setMyWorkouts(workoutId)
      } catch (error) {
        console.error(error)
      }
    }
    getUserWorkout()
  }, [workoutId])

  const markAsCompleted = async () => {
    try {
      const {accessToken} = JSON.parse(await getItemAsync('user'))

      const response = await serverRequest({
        method: "put",
        url: `userworkout/${workoutId}`,
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        data: {
          completed: true
        }
      })
      console.log(response.data, "<<<<<< response")

      setWorkoutDetails(prevDetails => ({
        ...prevDetails,
        completed: true
      }))
      console.log("Workout marked as completed successfuly!")
      setComplete(response.data.completed)
    } catch (error) {
      console.error("Error marking workout as completed:", error)
    }
  }

  const banner = () => {
    return (
      <View style={styles.cardContainer}>
        {!myWorkouts.includes(workoutId) ? (
          <ImageBackground
          source={{ uri: `http://img.youtube.com/vi/${workoutDetails?.thumbnail}/hqdefault.jpg` }}
          style={styles.cardBackground}
          >
            <LinearGradient
            colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.7)']}
            style={styles.linearGradient}
          />
          </ImageBackground>
        ) : (
          <View>
          {workoutDetails && <YoutubePlayer
        height={200}
        play={playing}
        videoId={workoutDetails?.videos[0].videoUrl}
        onChangeState={onStateChange}
      />}
    </View>
        )}
       
      </View>
    );
  };

  const chips = () => {
    return (
      <View style={styles.chipsContainer}>
        <View style={styles.chipsItem}>
          <FontAwesome
            name='play-circle'
            size={20}
            color='white'
          />
          <Text style={styles.chipsText}>{workoutDetails?.duration}</Text>
        </View>
        <View style={styles.chipsItem}>
          <MaterialIcons
            name='local-fire-department'
            size={20}
            color='white'
          />
          <Text style={styles.chipsText}>{workoutDetails?.calory}</Text>
        </View>
      </View>
    );
  };

  const cardVideo = () => {
    return (
      <View style={styles.cardVideoContainer}>
        <View style={styles.cardVideoImage}></View>
        <View style={styles.cardVideoDescription}>
          <Text style={{ fontSize: 18, color: 'white', fontWeight: 600 }}>
            Video Title
          </Text>
          <Text style={{ color: '#b2f516' }}>0:30</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView>
        <View>{banner()}</View>
        <View>
          <Text style={styles.title}>{workoutDetails?.name}</Text>
        </View>
        <View>{chips()}</View>
        <View style={styles.chipsContainer}>
        <View style={styles.chipsItem}>
          <Text style={styles.chipsText}>{workoutDetails?.category}</Text>
        </View>
        <View style={styles.chipsItem}>
          <Text style={styles.chipsText}>{workoutDetails?.time}</Text>
        </View>
        </View>
        <View>
          <Text style={styles.description}>
            {workoutDetails?.videos[0].description}
          </Text>
        </View>
        {/* <FlatList
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          renderItem={() => cardVideo()}
          keyExtractor={(item) => item.toString()}
        /> */}
        {myWorkouts.includes(workoutId) ? (
        <View style={styles.buttonContainer}>
          {!complete ? ( <TouchableOpacity
            style={[styles.button, styles.startButton]}
            onPress={markAsCompleted}
          >
            <Text style={[styles.buttonText, styles.startButtonText]}>
              Mark as completed
            </Text>
          </TouchableOpacity>): (
            <Text style={styles.addToUserWorkoutText}>The workout is already marked as completed.</Text>
          )}
        </View>) : (
          <Text style={styles.addToUserWorkoutText}>Please add the workout to your workout list to view the video.</Text>
        )}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  title: {
    color: 'white',
    fontSize: 24,
    marginHorizontal: 8,
    marginBottom: 5,
  },
  detail: {
    color: '#244d8f',
    fontSize: 18,
    marginHorizontal: 8,
    marginBottom: 12,
  },
  description: {
    color: 'white',
    fontSize: 15,
    marginVertical: 20,
    marginHorizontal: 8,
    lineHeight: 26,
  },
  chipsContainer: {
    flexDirection: 'row',
  },
  chipsItem: {
    backgroundColor: '#292a2b',
    margin: 8,
    marginRight: 12,
    minWidth: 100,
    borderRadius: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    textAlign: 'center',
    alignItems: 'center',
    padding: 6,
  },
  chipsText: {
    color: 'white',
    paddingLeft: 5
  },
  cardVideoContainer: {
    backgroundColor: 'white',
    height: 80,
    borderRadius: 10,
    flexDirection: 'row',
    marginHorizontal: 10,
    marginBottom: 6,
  },
  cardVideoImage: {
    backgroundColor: 'grey',
    flex: 2,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  cardVideoDescription: {
    backgroundColor: '#292a2b',
    flex: 5,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: 'center',
    paddingLeft: 14,
  },
  cardContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  cardBackground: {
    width: '100%',
    height: 200,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
  },
  linearGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    borderRadius: 10,
  },
  addToUserWorkoutText: {
    color: "red",
    padding: 20,
    paddingVertical: 20,
    textAlign: "center"
  },
  bottomTabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'black',
    padding: 5,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  tabText: {
    color: '#59A5D8',
    fontSize: 12,
    marginTop: 5,
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    width: '80%',
    height: 50,
    borderRadius: 48,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 10,
  },
  startButton: {
    backgroundColor: '#42b0ff',
  },
  startButtonText: {
    color: 'black',
    fontWeight: 600,
    fontSize: 16,
  },
});
