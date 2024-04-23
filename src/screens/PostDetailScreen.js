import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image } from "react-native";
import imageLogo from "../assets/Image12.png";
import { FontAwesome6 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import Comment from "../components/Comment";
import { serverRequest } from "../utils/axios";
import { useState } from "react";

export default function PostDetailScreen({ navigation, route }) {
  const { post, likeCount, user, token, userLoggedIn, isLiked, handleUnlike, handleLike } = route.params
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState(post.comments)

  const handleAddComment = async () => {
    try {
      await serverRequest({
        method: "put",
        url: "/comment",
        data: {
          postId: post._id,
          comment
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setComment('')
      setComments([...comments, { comment, userId: userLoggedIn.id }])
    } catch (error) {
      console.log(error)
    }
  }
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
            source={{ uri: user.imageUrl }}
            style={styles.profilePicture}
          />
          <Text style={styles.username}>{user.name}</Text>
        </View>

        <Image
          source={{ uri: post.thumbnail }}
          style={styles.postImage}
        />

        <View style={styles.postFooter}>
          <View style={styles.buttonContainer}>
            {isLiked ? (
              <TouchableOpacity style={styles.likeButton} onPress={handleUnlike}>
                <FontAwesome name="heart" size={24} color="red" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.likeButton} onPress={handleLike}>
                <FontAwesome name="heart-o" size={24} color="white" />
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.commentButton}>
              <FontAwesome6 name="comment" size={24} color="white" />
            </TouchableOpacity>
          </View>
          {likeCount > 0 && <Text style={styles.likeCount}>{likeCount} like{likeCount > 1 ? "s" : ""}</Text>}

          <View style={styles.captionContainer}>
            <Text style={styles.username}>{user.username}{" "}
              <Text style={styles.caption}>{post.caption}</Text>
            </Text>

          </View>

          <ScrollView>
            {comments.length > 0 && comments.map((comment, index) => (
              <Comment key={index} comment={comment} token={token} />
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      <View style={styles.addCommentContainer}>
        <TextInput
          style={styles.commentInput}
          placeholder="Add Comment"
          value={comment}
          onChangeText={setComment}
        />

        <TouchableOpacity style={styles.submitButton} onPress={() => handleAddComment()}>
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
    color: "gray",
    fontWeight: "normal",
  },
  addCommentContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    marginTop: 10,
  },
});