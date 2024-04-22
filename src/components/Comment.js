import { Image, StyleSheet, Text, View } from "react-native";

export default function Comment() {
  return (
    <View style={styles.commentContainer}>
      <Image
        source={{ uri: "https://img.freepik.com/free-vector/cute-monkey-holding-banana-baseball-bat-stick-cartoon-vector-icon-illustration-animal-sport_138676-7050.jpg" }}
        style={styles.profilePicture}
      />
      <View style={styles.commentTextContainer}>
        <Text style={styles.username}>Username</Text>
        <Text style={styles.addComment}>Add comment...</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  commentContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
  },
  profilePicture: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  commentTextContainer: {
    marginLeft: 5,
  },
  username: {
    fontWeight: "bold",
    color: "white",
  },
  addComment: {
    color: "white",
    opacity: 0.5,
  },
})
