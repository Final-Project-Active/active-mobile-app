import { Ionicons } from "@expo/vector-icons"
import { useEffect, useState } from "react"
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import { serverRequest } from "../utils/axios"

export default function LevelSelectionScreen({ navigation, route }) {
  const [selectedLevel, setSelectedLevel] = useState("Beginner")
  const [scrollPosition, setScrollPosition] = useState(0)

  const data = ["Beginner", "Intermediate", "Advance"]

  useEffect(() => {
    const visibleIndexes = Math.floor(scrollPosition / 60)
    setSelectedLevel(data[visibleIndexes + 2])
  }, [scrollPosition])

  const handleLevelSelect = (level) => {
    setSelectedLevel(level)
  }

  console.log({ ...route.params, physicalActivity: selectedLevel })
  const handleSignUp = async () => {
    try {
      const response = await serverRequest({
        method: "post",
        url: "/register",
        data: { ...route.params, physicalActivity: selectedLevel },
      });
      console.log(response)
      navigation.navigate('SignInScreen');
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.heading}>
            YOUR REGULAR PHYSICAL ACTIVITY LEVEL?
          </Text>
          <Text style={styles.text}>
            THIS HELPS US CREATE YOUR PERSONALIZED PLAN.
          </Text>
        </View>
        <View style={styles.pickerContainer}>
          <ScrollView
            contentContainerStyle={styles.scrollViewContent}
            snapToInterval={60}
            snapToAlignment="center"
            decelerationRate="fast"
            onScroll={(event) => {
              const { contentOffset } = event.nativeEvent
              setScrollPosition(contentOffset.y)
            }}
            scrollEventThrottle={16}
          >
            {data.map((item) => {
              const opacity = selectedLevel === item ? 1 : 0.5
              const adjustedOpacity = Math.max(opacity - 0.3, 0)
              return (
                <TouchableOpacity
                  key={item}
                  onPress={() => handleLevelSelect(item)}
                  style={[styles.levelButton, {
                    opacity: adjustedOpacity,
                    borderTopColor: item === selectedLevel ? "#59A5D8" : "transparent",
                    borderTopWidth: item === selectedLevel ? 2 : 0,
                    borderBottomColor: item === selectedLevel ? "#59A5D8" : "transparent",
                    borderBottomWidth: item === selectedLevel ? 2 : 0,
                  }]}
                >
                  <Text style={[styles.levelText]}>{item}</Text>
                </TouchableOpacity>
              )
            })}
          </ScrollView>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={[styles.button, styles.backButton]} onPress={() => navigation.navigate("GoalSelectionScreen")}>
            <Ionicons name="chevron-back-outline" size={24} color="white" />
            <Text style={[styles.buttonText, styles.backButtonText]}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.signUpButton]}
            onPress={handleSignUp}>
            <Text style={[styles.buttonText, styles.signUpButtonText]}>Sign Up</Text>
            <Ionicons name="chevron-forward-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  pickerContainer: {
    height: 250,
    justifyContent: "center",
    alignItems: "center",
    top: 150
  },
  header: {
    alignItems: "center",
    paddingVertical: 20
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    top: 50
  },
  text: {
    fontSize: 10,
    fontWeight: "normal",
    color: "white",
    top: 60,
    textAlign: "center"
  },
  scrollViewContent: {
    alignItems: "center",
  },
  levelButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 5
  },
  levelText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white"
  },
  buttonsContainer: {
    position: "absolute",
    bottom: 50,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center"
  },
  button: {
    width: 120,
    height: 50,
    borderRadius: 48,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginHorizontal: 10
  },
  backButton: {
    backgroundColor: "#3A3A3C"
  },
  signUpButton: {
    backgroundColor: "none",
    borderColor: "white",
    borderWidth: 1
  },
  buttonText: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 15,
    lineHeight: 20,
    textAlign: "center",
  },
  backButtonText: {
    color: "white"
  },
  signUpButtonText: {
    color: "white"
  }
})
