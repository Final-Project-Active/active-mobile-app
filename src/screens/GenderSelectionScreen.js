import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function GenderSelectionScreen({ navigation, route }) {
    const [gender, setGender] = useState("male")
    const [maleBackgroundColor, setMaleBackgroundColor] = useState("#59A5D8");
    const [femaleBackgroundColor, setFemaleBackgroundColor] = useState("#2C2C2E");
    const [maleTextColor, setMaleTextColor] = useState("black");
    const [femaleTextColor, setFemaleTextColor] = useState("white");

    const handleGenderSelection = (genderSelected) => {
        setGender(genderSelected);
        if (genderSelected === 'male') {
            setMaleBackgroundColor("#59A5D8");
            setFemaleBackgroundColor("#2C2C2E");
            setMaleTextColor("black");
            setFemaleTextColor("white");
        } else {
            setMaleBackgroundColor("#2C2C2E");
            setFemaleBackgroundColor("#59A5D8");
            setMaleTextColor("white");
            setFemaleTextColor("black");
        }
    };

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
                    <TouchableOpacity
                        onPress={() => handleGenderSelection('male')}
                    >
                        <View style={[styles.ellipse, { backgroundColor: maleBackgroundColor }]}>
                            <Ionicons name="male" size={80} color={maleTextColor} style={styles.icon} />
                            <Text style={[styles.genderText, { color: maleTextColor }]}>Male</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.ellipseContainer}>
                    <TouchableOpacity
                        onPress={() => handleGenderSelection('female')}
                    >
                        <View style={[styles.ellipse, { backgroundColor: femaleBackgroundColor }]}>
                            {/* <Image source={Image1} style={styles.ellipseImage} /> */}
                            <Ionicons name="female" size={80} color={femaleTextColor} style={styles.icon} />
                            <Text style={[styles.genderText, { color: femaleTextColor }]}>Female</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={[styles.button, styles.backButton]}
                        onPress={() => navigation.navigate("SignUpScreen", { ...route.params, gender })}>
                        <Ionicons name="chevron-back-outline" size={24} color="white" />
                        <Text style={[styles.buttonText, styles.backButtonText]}>Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.nextButton]} onPress={() => navigation.navigate("AgeSelectionScreen")}>
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
    genderText: {
        fontSize: 16,
        fontWeight: "bold"
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