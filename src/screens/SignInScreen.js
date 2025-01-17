import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Image9 from '../assets/Image9.png';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { serverRequest } from '../utils/axios';
import { useContext, useState } from 'react';
import AuthContext from '../contexts/authContext';
import { setItemAsync } from 'expo-secure-store';
import validator from 'validator';

const { width } = Dimensions.get('window');
export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { setIsLoggedIn } = useContext(AuthContext);
  const [errorMessages, setErrorMessages] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessages("Please fill in all fields");
      return;
    }

    if (!validator.isEmail(email)) {
      setErrorMessages("Invalid email");
      return;
    }

    if (password.length < 6) {
      setErrorMessages("Password must be at least 6 characters long");
      return;
    }
    try {
      const response = await serverRequest({
        method: 'post',
        url: '/login',
        data: { email, password },
      });

      await setItemAsync(
        'user',
        JSON.stringify({
          accessToken: response.data.accessToken,
        })
      );

      setEmail('');
      setPassword('');
      setIsLoggedIn(true);

      navigation.navigate('MainTabs');
    } catch (error) {
      setErrorMessages("Invalid email or password");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <ImageBackground
            source={Image9}
            style={styles.image}
          >
            <View style={styles.overlay}>
              <TouchableOpacity
                style={{
                  ...styles.navButton,
                  borderBottomWidth: 2,
                  borderBottomColor: '#fff',
                }}
              >
                <Text style={styles.navButtonText}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.navButton}
                onPress={() => navigation.navigate('SignUpScreen')}
              >
                <Text style={styles.navButtonText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
            <Text style={{ marginLeft: 10, marginTop: 150 }}>
              <Text style={styles.heading}>Welcome Back</Text>
              <Text style={[styles.heading, styles.bold]}> User,</Text>
            </Text>
            <Text style={styles.text}>ENTER YOUR INFORMATION BELOW OR</Text>
            <Text style={styles.text}>SIGN UP WITH ANOTHER ACCOUNT.</Text>
          </ImageBackground>
        </View>
        <View style={styles.form}>
          <TextInput
            placeholder='Email'
            placeholderTextColor='white'
            style={styles.input}
            value={email}
            onChangeText={(text) => setEmail(text)}
            autoCapitalize='none'
          />
          <View style={styles.passwordContainer}>
            <TextInput
              secureTextEntry={!showPassword}
              placeholder='Password'
              placeholderTextColor='white'
              style={styles.input}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity
              onPress={togglePasswordVisibility}
              style={styles.passwordToggle}
            >
              <Ionicons
                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                size={24}
                color='white'
              />
            </TouchableOpacity>
          </View>
          <Text style={{ color: 'red', textAlign: 'center' }}>
            {errorMessages}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleLogin}
          >
            <Text style={styles.buttonText}>Login</Text>
            <MaterialIcons
              name='arrow-right'
              size={24}
              color='black'
            />
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
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: '75%',
  },
  image: {
    width: '100%',
    height: '100%',
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
    opacity: 0.8,
  },
  heading: {
    color: '#fff',
    textAlign: 'left',
    fontSize: 32,
    marginLeft: 10,
    marginTop: 10,
    opacity: 0.8,
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
    opacity: 0.8,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '70%',
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    padding: 20,
  },
  input: {
    height: 60,
    backgroundColor: 'black',
    marginBottom: 10,
    padding: 10,
    color: 'white',
    fontSize: 18,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    opacity: 0.8,
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordToggle: {
    position: 'absolute',
    right: 10,
    top: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 150,
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
});
