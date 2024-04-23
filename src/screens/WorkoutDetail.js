import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Image10 from '../assets/Image10.png';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

export default function WorkoutDetail() {
  const banner = () => {
    return (
      <View style={styles.cardContainer}>
        <ImageBackground
          source={Image10}
          style={styles.cardBackground}
        >
          <LinearGradient
            colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.7)']}
            style={styles.linearGradient}
          />
        </ImageBackground>
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
          <Text style={styles.chipsText}>60 min</Text>
        </View>
        <View style={styles.chipsItem}>
          <MaterialIcons
            name='local-fire-department'
            size={20}
            color='white'
          />
          <Text style={styles.chipsText}>350 Cal</Text>
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
        <View>{banner()}</View>
        <View>
          <Text style={styles.title}>Day O1 - Warm Up</Text>
        </View>
        <View>{chips()}</View>
        <View style={styles.chipsContainer}>
        <View style={styles.chipsItem}>
          <Text style={styles.chipsText}>beginner</Text>
        </View>
        <View style={styles.chipsItem}>
          <Text style={styles.chipsText}>morning</Text>
        </View>
        </View>
        <View>
          <Text style={styles.description}>
            Want your body to be healthy. Join our program with directions
            according to body’s goals.
          </Text>
        </View>
        {/* <FlatList
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          renderItem={() => cardVideo()}
          keyExtractor={(item) => item.toString()}
        /> */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.startButton]}
            onPress={() => {}}
          >
            <Text style={[styles.buttonText, styles.startButtonText]}>
              Mark as completed
            </Text>
          </TouchableOpacity>
        </View>
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
    top: 150
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
