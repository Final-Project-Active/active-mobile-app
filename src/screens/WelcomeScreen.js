import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Logo from "../assets/Logo.png";
import Image1 from "../assets/Image1.png";
import Image2 from "../assets/Image2.png";
import Image3 from "../assets/Image3.png";
import Image4 from "../assets/Image4.png";
import Image5 from "../assets/Image5.png";
import Image6 from "../assets/Image6.png";
import { Ionicons } from "@expo/vector-icons";

export default function WelcomeScreen() {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                    <View style={styles.logoContainer}>
                        <Image source={Logo} style={styles.logo} />
                    </View>
                    <View style={styles.ellipseContainer}>
                        <View style={styles.ellipse}>
                            <Image source={Image1} style={styles.ellipseImage} />
                        </View>
                    </View>
                    <View style={[styles.halfEllipseContainer, styles.halfEllipseContainerLeft, styles.halfEllipseContainerTop]}>
                        <View style={styles.halfEllipse}>
                        <Image source={Image5} style={styles.halfEllipseImage} />
                    </View>
                    </View>
                    <View style={[styles.halfEllipseContainer, styles.halfEllipseContainerLeft, styles.halfEllipseContainerBottom]}>
                        <View style={styles.halfEllipse}>
                        <Image source={Image6} style={styles.halfEllipseImage} />
                    </View>
                    </View>
                    <View style={[styles.halfEllipseContainer, styles.halfEllipseContainerRight, styles.halfEllipseContainerTop]}>
                        <View style={styles.halfEllipse}>
                        <Image source={Image3} style={styles.halfEllipseImage} />
                    </View>
                    </View>
                    <View style={[styles.halfEllipseContainer, styles.halfEllipseContainerRight, styles.halfEllipseContainerBottom]}>
                        <View style={styles.halfEllipse}>
                        <Image source={Image4} style={styles.halfEllipseImage} />
                    </View>
                    </View>
                    <View style={styles.ellipseContainer}>
                        <View style={styles.ellipse}>
                            <Image source={Image2} style={styles.ellipseImage} />
                        </View>
                    </View>
                    <Text style={styles.boldText}>Let's Move</Text>
                    <Text style={styles.text}>Fitness and wellness app for you {"\n"} anytime, anywhere.</Text>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Get Started</Text>
                        <Ionicons name="chevron-forward-outline" size={24} color="white" />
                    </TouchableOpacity>
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
    logoContainer: {
        marginBotton: 20
    },
    logo: {
        width: 200,
        height: 200,
        resizeMode: "contain"
    },
    ellipseContainer: {
        marginTop: -50,
        marginBottom: 60,
        alignItems: "center"
    },
    ellipse: {
        width: 150,
        height: 150,
        borderRadius: 75,
        overflow: "hidden"
    },
    ellipseImage: {
        width: "100%",
        height: "100%",
        resizeMode: "cover"
    },
    halfEllipseContainer: {
        position: "absolute",
        top: 200,
        width: 150,
        height: 100,
        overflow: "hidden",
    },
    halfEllipseContainerLeft: {
        left: -37.5,
        transform: [{rotate: "-90deg"}],
    },
    halfEllipseContainerRight: {
        left: "auto",
        right: -37.5,
        transform: [{rotate: "90deg"}],
    },
    halfEllipseContainerTop: {
        top: 200,
    },
    halfEllipseContainerBottom: {
        top: 360
    },
    halfEllipse: {
        width: "100%",
        height: "100%",
        borderBottomLeftRadius: 75,
        borderBottomRightRadius: 75,
        overflow: "hidden",
    },
    halfEllipseImage: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    boldText: {
        marginTop: 10,
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center"
    },
    text: {
        marginTop: 5,
        fontSize: 16,
        textAlign: "center"
    },
    button: {
        position: "absolute",
        width: 185,
        height: 50,
        left: 100,
        top: 640,
        backgroundColor: "black",
        borderRadius: 48,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: "13px 20px 13px 28px",
        gap: 10
    },
    buttonText: {
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: 17,
        lineHeight: 20,
        textAlign: "center",
        color: "white"
    }
})

