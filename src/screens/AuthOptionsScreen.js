import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Image7 from "../assets/Image7.png";

export default function AuthOptionsScreen() {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
               <ImageBackground source={Image7} style={styles.background}>
                
                </ImageBackground>    
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start"
    },
    background: {
        flex: 1,
        width: "100%",
        resizeMode: "cover",
        alignItems: "center",
        justifyContent: "center"
    }
})
