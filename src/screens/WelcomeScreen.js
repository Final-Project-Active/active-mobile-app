import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Logo from "../assets/Logo.png";
import Image1 from "../assets/Image1.png";
import Image2 from "../assets/Image2.png";
import Image3 from "../assets/Image3.png";

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
                    <View style={styles.ellipseContainer}>
                        <View style={styles.ellipse}>
                            <Image source={Image2} style={styles.ellipseImage} />
                        </View>
                    </View>
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
        marginTop: 20,
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
})

