import { Dimensions, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Image9 from "../assets/Image9.png";
import { Ionicons } from "@expo/vector-icons"
import { useState } from "react";
import validator from "validator";

const { width } = Dimensions.get("window");
export default function SignUpScreen({ navigation }) {
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false)
  const [errorMessages, setErrorMessages] = useState("");
  const handleChange = (name, value) => {
    setUser({ ...user, [name]: value });
  }

  const handleNext = () => {
    /*setUser({
      name: "",
      username: "",
      email: "",
      password: "",
    });*/

    if (!user.name || !user.username || !user.email || !user.password) {
      setErrorMessages("Please fill in all fields");
      return;
    }

    if (!validator.isEmail(user.email)) {
      setErrorMessages("Invalid email");
      return;
    }

    if (user.username.length < 6) {
      setErrorMessages("Username must be at least 6 characters long");
      return;
    }

    if (user.username.length > 20) {
      setErrorMessages("Username must be at most 20 characters long");
      return;
    }

    if (user.name.length < 3) {
      setErrorMessages("Name must be at least 3 characters long");
      return;
    }

    if (user.name.length > 20) {
      setErrorMessages("Name must be at most 20 characters long");
      return;
    }

    if (user.password.length < 6) {
      setErrorMessages("Password must be at least 6 characters long");
      return;
    }

    navigation.navigate("GenderSelectionScreen", user);
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <ImageBackground source={Image9} style={styles.image}>
            <View style={styles.overlay}>
              <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('SignInScreen')}>
                <Text style={styles.navButtonText}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{
                ...styles.navButton,
                borderBottomWidth: 2,
                borderBottomColor: '#fff',
              }}>
                <Text style={styles.navButtonText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
            <Text style={{ marginLeft: 10, marginTop: 150 }}>
              <Text style={styles.heading}>Hello</Text>
              <Text style={[styles.heading, styles.bold]}> User,</Text>
            </Text>
            <Text style={styles.text}>ENTER YOUR INFORMATION BELOW OR</Text>
            <Text style={styles.text}>LOGIN WITH ANOTHER ACCOUNT.</Text>
          </ImageBackground>
        </View>
        <View style={styles.form}>
          <TextInput
            placeholder="Name"
            placeholderTextColor="white"
            style={styles.input}
            value={user.name}
            onChangeText={(text) => handleChange("name", text)}
          />
          <TextInput
            placeholder="Username"
            placeholderTextColor="white"
            style={styles.input}
            value={user.username}
            onChangeText={(text) => handleChange("username", text)}
          />
          <TextInput
            placeholder="Email"
            placeholderTextColor="white"
            style={styles.input}
            value={user.email}
            onChangeText={(text) => handleChange("email", text)}
          />
          <View style={styles.passwordContainer}>
            <TextInput
              secureTextEntry={!showPassword}
              placeholder="Password"
              placeholderTextColor="white"
              style={styles.input}
              value={user.password}
              onChangeText={(text) => handleChange("password", text)}
            />
            <TouchableOpacity onPress={togglePasswordVisibility} style={styles.passwordToggle}>
              <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={24} color="white" />
            </TouchableOpacity>
          </View>
          <Text style={{ color: "red", textAlign: "center", marginTop: 10 }}>{errorMessages}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.nextButton]}
            onPress={handleNext}
          >
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
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: width,
    height: "75%",
  },
  image: {
    width: "100%",
    height: "100%",
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    padding: 10,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  navButton: {
    backgroundColor: 'transparent',
    borderRadius: 5,
    margin: 5,
    padding: 10,
  },
  navButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    opacity: 0.8
  },
  heading: {
    color: '#fff',
    textAlign: 'left',
    fontSize: 32,
    marginLeft: 10,
    marginTop: 10,
    opacity: 0.8
  },
  bold: {
    fontWeight: 'bold',
  },
  text: {
    color: '#fff',
    textAlign: 'left',
    fontSize: 14,
    marginLeft: 10,
    marginTop: 10,
    opacity: 0.8
  },
  background: {
    flex: 1,
    width: "100%",
    height: "70%",
    resizeMode: "cover",
    alignItems: "center",
    justifyContent: "center"
  },
  form: {
    padding: 20,
  },
  passwordContainer: {
    position: "relative"
  },
  passwordToggle: {
    position: "absolute",
    right: 10,
    top: 20
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
    opacity: 0.8
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
    padding: 10,
    marginHorizontal: 10,
  },
  button: {
    width: 125,
    height: 60,
    borderRadius: 48,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
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
})