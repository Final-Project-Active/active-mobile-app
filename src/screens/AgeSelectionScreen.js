import { Ionicons } from "@expo/vector-icons"
import { useEffect, useState } from "react"
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"

export default function AgeSelectionScreen() {
  const [selectedNumber, setSelectedNumber] = useState(18)
  const [scrollPosition, setScrollPosition] = useState(0)

  const data = Array.from({ length: 33 }, (_, i) => 18 + i)

  const interpolateColorAndSize = (index) => {
    const distance = Math.abs(selectedNumber - index)
    const maxDistance = 5
    const intensity = Math.min(distance, maxDistance) / maxDistance
    const opacity = 1 - intensity
    const fontSize = 20 - 5 * intensity
    return { opacity, fontSize }
  }

  useEffect(() => {
    const visibleIndexes = Math.floor(scrollPosition / 60)
    setSelectedNumber(18 + visibleIndexes + 2)
    console.log("Number at center:", 18 + visibleIndexes + 2)
  }, [scrollPosition])

  const handleNumberSelect = (number) => {
    setSelectedNumber(number)
    console.log("Clicked number:", number)
  }
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.heading}>
            HOW OLD ARE YOU?
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
              const { opacity, fontSize } = interpolateColorAndSize(item)
              const adjustedOpacity = Math.max(opacity - 0.3, 0)
              return (
                <TouchableOpacity
                  key={item}
                  onPress={() => handleNumberSelect(item)}
                  style={[styles.numberButton, {
                    opacity: adjustedOpacity,
                    fontSize: fontSize,
                    borderTopColor: item === selectedNumber ? "#59A5D8" : "transparent",
                    borderTopWidth: item === selectedNumber ? 2 : 0,
                    borderBottomColor: item === selectedNumber ? "#59A5D8" : "transparent",
                    borderBottomWidth: item === selectedNumber ? 2 : 0,
                  }]}
                >
                  <Text style={[styles.numberText, { fontSize: item === selectedNumber ? 24 : 20 }]}>{item}</Text>
                </TouchableOpacity>
              )
            })}
          </ScrollView>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={[styles.button, styles.backButton]} onPress={() => console.log("Button Pressed")}>
            <Ionicons name="chevron-back-outline" size={24} color="white" />
            <Text style={[styles.buttonText, styles.backButtonText]}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.nextButton]} onPress={() => console.log("Button Pressed")}>
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
  numberButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 5
  },
  numberText: {
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
