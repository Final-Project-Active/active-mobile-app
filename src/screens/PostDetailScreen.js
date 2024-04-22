import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image } from "react-native";
import imageLogo from "../assets/Image12.png";
import { FontAwesome6 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import Comment from "../components/Comment";

export default function PostDetailScreen({ navigation }) {
  const comments = [
    { id: 1, username: "User1", comment: "Comment 1" },
    { id: 2, username: "User2", comment: "Comment 2" },
    { id: 3, username: "User3", comment: "Comment 3" },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={imageLogo}
          style={styles.logo}
        />
      </View>
      <View style={styles.separator}></View>
      <ScrollView>
        <View style={styles.postHeader}>
          <Image
            source={{ uri: "https://img.freepik.com/free-vector/cute-monkey-holding-banana-baseball-bat-stick-cartoon-vector-icon-illustration-animal-sport_138676-7050.jpg" }}
            style={styles.profilePicture}
          />
          <Text style={styles.username}>Username</Text>
        </View>

        <Image
          source={{ uri: "https://img.freepik.com/free-vector/cute-monkey-holding-banana-baseball-bat-stick-cartoon-vector-icon-illustration-animal-sport_138676-7050.jpg" }}
          style={styles.postImage}
        />

        <View style={styles.postFooter}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.likeButton}>
              <FontAwesome name="heart-o" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.commentButton}>
              <FontAwesome6 name="comment" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <Text style={styles.likeCount}>10 likes</Text>

          <View style={styles.captionContainer}>
            <Text style={styles.username}>Username</Text>
            <Text style={styles.caption}>This is the caption of the post.</Text>
          </View>

          <ScrollView>
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
          </ScrollView>
        </View>
      </ScrollView>

      <View style={styles.addCommentContainer}>
        <TextInput
          style={styles.commentInput}
          placeholder="Add Comment"
        />

        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Comment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  separator: {
    height: 1,
    backgroundColor: "white",
    marginBottom: 20,
    opacity: 0.7,
  },
  postContainer: {
    marginBottom: 20,
  },
  postDetail: {
    fontWeight: "bold",
    fontSize: 16,
  },
  commentsContainer: {
    marginBottom: 20,
  },
  commentUsername: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  commentText: {
    marginBottom: 5,
  },

  commentInput: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
    borderRadius: 10,
  },
  submitButton: {
    backgroundColor: "#59A5D8",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  submitButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  profilePicture: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  username: {
    fontWeight: "bold",
    color: "white",
  },
  postImage: {
    width: "100%",
    height: 200,
    marginBottom: 10,
  },
  postFooter: {
    flexDirection: "column",
    marginTop: 10,
  },
  likeButton: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginRight: 5,
  },
  commentButton: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginRight: 5,
  },
  likeCount: {
    marginRight: 10,
    color: 'white'
  },
  commentCount: {
    marginRight: 10,
    color: 'white'
  },
  viewAllCommentsButton: {
    marginTop: 5,
  },
  viewAllCommentsText: {
    color: "white",
  },
  buttonContainer: {
    flexDirection: "row",
    marginBottom: 5,
  },
  captionContainer: {
    marginBottom: 5,
    flexDirection: "row",
  },
  caption: {
    marginLeft: 5,
    color: "white",
  },
  addCommentContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    marginTop: 10,
  },
});