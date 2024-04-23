import { ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { serverRequest } from "../utils/axios";
import { getItemAsync } from "expo-secure-store";
import { MaterialIcons } from "@expo/vector-icons";

export default function ProgressFormScreen({ navigation }) {
  const [weight, setWeight] = useState('');
  const [duration, setDuration] = useState('');
  const [intensity, setIntensity] = useState('');

  const handleSubmit = async () => {
    try {
      const user = await getItemAsync('user');
      const { accessToken } = JSON.parse(user);
      console.log(accessToken, "<<<<")
  
      await serverRequest({
        method: 'post',
        url: '/analytics',
        data: {
          weight: weight,
          duration: duration,
          intensity: intensity
        },
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      setWeight('');
      setDuration('');
      setIntensity('');
    } catch (error) {
      console.error('Error submitting analytics:', error);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.heading}>
            Weekly Fitness Progress{"\n"}
            <Text>
              Assessment
            </Text>
          </Text>
        </View>
        <ScrollView style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>What is your current weight (in kg)?</Text>
            <TextInput
              placeholder=""
              placeholderTextColor="white"
              style={styles.input}
              keyboardType="numeric"
              value={weight}
              onChangeText={setWeight}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>How long was your fitness duration (in hours)?</Text>
            <TextInput
              placeholder=""
              placeholderTextColor="white"
              style={styles.input}
              keyboardType="numeric"
              value={duration}
              onChangeText={setDuration}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>What your workout intensity (on a scale of 1 - 10)?</Text>
            <TextInput
              placeholder=""
              placeholderTextColor="white"
              style={styles.input}
              keyboardType="numeric"
              value={intensity}
              onChangeText={setIntensity}
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit}
            >
              <Text style={styles.buttonText}>Submit</Text>
              <MaterialIcons
                name='arrow-right'
                size={24}
                color='black'
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
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
    fontSize: 24,
  },
  form: {
    padding: 20,
    paddingLeft: 5,
    top: 50
  },
  inputContainer: {
    marginBottom: 20
  },
  input: {
    height: 60,
    backgroundColor: "black",
    marginBottom: 10,
    padding: 10,
    color: "white",
    fontSize: 18,
    borderBottomColor: "white",
    borderBottomWidth: 1,
    opacity: 0.8,
  },
  label: {
    color: "white",
    fontSize: 16,
    marginBottom: 5
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  button: {
    width: 125,
    height: 60,
    borderRadius: 48,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 10,
    backgroundColor: 'white',
  },
  buttonText: {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 15,
    lineHeight: 20,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
});
