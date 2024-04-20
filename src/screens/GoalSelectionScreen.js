import { Ionicons } from "@expo/vector-icons"
import { useEffect, useState } from "react"
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"

export default function GoalSelectionScreen({navigation}) {
  const [selectedGoal, setSelectedGoal] = useState("Lose Weight")
  const [scrollPosition, setScrollPosition] = useState(0)

  const data = ["Lose Weight", "Get Fitter", "Gain More Flexible"]

  useEffect(() => {
    const visibleIndexes = Math.floor(scrollPosition / 60)
    setSelectedGoal(data[visibleIndexes + 2])
    console.log("Goal at center:", data[visibleIndexes + 2])
  }, [scrollPosition])

  const handleGoalSelect = (goal) => {
    setSelectedGoal(goal)
    console.log("Clicked goal:", goal)
  }
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.heading}>
            WHAT'S YOUR GOAL?
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
              const opacity = selectedGoal === item ? 1 : 0.5  
              const adjustedOpacity = Math.max(opacity - 0.3, 0)
              return (
                <TouchableOpacity
                  key={item}
                  onPress={() => handleGoalSelect(item)}
                  style={[styles.goalButton, {
                    opacity: adjustedOpacity,
                    borderTopColor: item === selectedGoal ? "#59A5D8" : "transparent",
                    borderTopWidth: item === selectedGoal ? 2 : 0,
                    borderBottomColor: item === selectedGoal ? "#59A5D8" : "transparent",
                    borderBottomWidth: item === selectedGoal ? 2 : 0,
                  }]}
                >
                  <Text style={[styles.goalText]}>{item}</Text>
                </TouchableOpacity>
              )
            })}
          </ScrollView>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={[styles.button, styles.backButton]} onPress={() => navigation.navigate("HeightSelectionScreen")}>
            <Ionicons name="chevron-back-outline" size={24} color="white" />
            <Text style={[styles.buttonText, styles.backButtonText]}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.nextButton]} onPress={() => navigation.navigate("LevelSelectionScreen")}>
            <Text style={[styles.buttonText, styles.nextButtonText]}>Next</Text>
            <Ionicons name="chevron-forward-outline" size={24} color="black" />
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
  goalButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 5
  },
  goalText: {
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
  nextButton: {
    backgroundColor: "#59A5D8",
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
  nextButtonText: {
    color: "black"
  }
})
