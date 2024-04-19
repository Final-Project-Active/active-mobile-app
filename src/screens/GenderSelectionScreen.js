import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function GenderSelectionScreen() {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <Text style={styles.heading}>
                    TELL US ABOUT YOURSELF!
                </Text>
                <Text style={styles.text}>
                    TO GIVE YOU A BETTER EXPERIENCE, WE NEED{"\n"}TO KNOW YOUR GENDER.
                </Text>
                <View style={styles.ellipseContainer}>
                <TouchableOpacity onPress={() => console.log("Button Pressed")}>
                        <View style={[styles.ellipse, styles.ellipseMale]}>
                            {/* <Image source={Image1} style={styles.ellipseImage} /> */}
                            <Ionicons name="male" size={80} color="black" style={styles.icon} />
                            <Text style={[styles.genderText, styles.maleText]}>Male</Text>
                        </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.ellipseContainer}>
                    <TouchableOpacity onPress={() => console.log("Button Pressed")}>
                        <View style={[styles.ellipse, styles.ellipseFemale]}>
                            {/* <Image source={Image1} style={styles.ellipseImage} /> */}
                            <Ionicons name="female" size={80} color="white" style={styles.icon}/>
                            <Text style={[styles.genderText, styles.femaleText]}>Female</Text>
                        </View>
                        </TouchableOpacity>
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
        justifyContent: "start",
        alignItems: "center"
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
    ellipseContainer: {
        marginTop: 150,
        marginBottom: -120,
        alignItems: "center",
    },
    ellipse: {
        width: 180,
        height: 180,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center"
    },
    ellipseMale: {
        backgroundColor: "#59A5D8"
    },
    ellipseFemale: {
        backgroundColor: "#2C2C2E"
    },
    genderText: {
        fontSize: 16,
        fontWeight: "bold"
    },
    maleText: {
        color: "black"
    },
    femaleText: {
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