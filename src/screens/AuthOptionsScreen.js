import { Dimensions, FlatList, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Image7 from "../assets/Image7.png";
import Image8 from "../assets/Image8.png";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import Pagination from "../components/Pagination";

const { width } = Dimensions.get("window");

const data = [
    {
        key: "1",
        image: Image7,
        heading: "Training",
        text: "Personalized workout plans\ndesigned to help you achieve\nyour fitness goals - whether\nlosing weight or building\nmuscles."
    },
    {
        key: "2",
        image: Image8,
        heading: "Tracker",
        text: "Personalized workout tracker\ndesigned to help you achieve\nyour fitness goals."
    }
]

export default function AuthOptionsScreen() {
    const [currentIndex, setCurrentIndex] = useState(0)

    const renderItem = ({ item, index }) => (
        <View style={styles.slide}>
            <ImageBackground source={item.image} style={styles.background}>
                <LinearGradient 
                colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.79)']}
                style={styles.gradient}
                />
                <Text style={styles.heading}>{item.heading}</Text>
                <Text style={styles.text}>{item.text}</Text>
                </ImageBackground>  
        </View>
    )

    const handlePaginationChange = (event) => {
        const contentOffset = event.nativeEvent.contentOffset.x
        const index = Math.floor(contentOffset / width)
        setCurrentIndex(index)
    }
    
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
               <FlatList 
               data={data}
               horizontal
               pagingEnabled
               showHorizontalScrollIndicator={false}
               renderItem={renderItem}
               keyExtractor={(item) => item.key}
               style={styles.flatList}
               onScroll={handlePaginationChange}
               scrollEventThrottle={16}
               />
               <View style={styles.paginationContainer}>
                    <Pagination data={data} currentIndex={currentIndex} />
               </View>
               <View style={styles.buttonsContainer}>
               <TouchableOpacity style={[styles.button, styles.loginButton]} onPress={() => console.log("Button Pressed")}>
                        <Text style={[styles.buttonText, styles.loginButtonText]}>Login</Text>
                        <Ionicons name="chevron-forward-outline" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.registerButton]} onPress={() => console.log("Button Pressed")}>
                        <Text style={[styles.buttonText, styles.registerButtonText]}>Sign Up</Text>
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
    },
    flatList: {
        flex: 1,
        width: width
    },
    slide: {
        width: width
    },
    background: {
        flex: 1,
        width: "100%",
        resizeMode: "cover",
        alignItems: "center",
        justifyContent: "center"
    },
    gradient: {
        width: "100%",
        height: "100%",
        position: "absolute"
    },
    heading: {
        color: "white",
        fontWeight: "bold",
        fontSize: 30,
        marginLeft: -150,
        marginTop: 300,
        letterSpacing: 5
    },
    text: {
        color: "white",
        fontWeight: "normal",
        fontSize: 12,
        marginBottom: 30,
        marginLeft: -70,
        marginTop: 10,
        letterSpacing: 2
    },
    paginationContainer: {
        position: "absolute",
        bottom: 150,
        width: "100%",
        alignItems: "center"
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
    loginButton: {
        backgroundColor: "white"
    },
    registerButton: {
        backgroundColor: "none",
        borderColor: "white",
        borderWidth: 1
    },
    buttonText: {
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: 15,
        lineHeight: 20,
        textAlign: "center"
    },
    loginButtonText: {
        color: "black"
    },
    registerButtonText: {
        color: "white"
    }
})
