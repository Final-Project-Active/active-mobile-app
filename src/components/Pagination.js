import { StyleSheet, View } from "react-native";

export default function Pagination({data, currentIndex}) {
    return (
        <View style={styles.container}>
            {data.map((item, index) => (
                <View 
                key={item.key}
                style={[styles.dot, index === currentIndex ? styles.activeDot : null]}
                />
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        marginHorizontal: 5
    },
    activeDot: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)'
    }
})