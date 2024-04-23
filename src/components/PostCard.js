import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { FontAwesome6 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { calculateTimeAgo } from "../utils/helpers";
import { useEffect, useState } from "react";
import { serverRequest } from "../utils/axios";

export default function PostCard({ navigation, post, token, userLoggedIn }) {
  const [user, setUser] = useState({
    name: "",
    username: "",
    imageUrl: ""
  })
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(post.likes.length)

  const getUserData = async () => {
    try {
      const user = await serverRequest({
        method: "get",
        url: `/user/${post.userId}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setUser({
        name: user.data.name,
        username: user.data.username,
        imageUrl: user.data.imageUrl
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleLike = async () => {
    try {
      await serverRequest({
        method: "patch",
        url: "/like",
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: {
          postId: post._id
        }
      })

      setIsLiked(!isLiked)
      setLikeCount(likeCount + (isLiked ? -1 : 1))
    } catch (error) {
      console.log(error)
    }
  }

  const handleUnlike = async () => {
    try {
      await serverRequest({
        method: "patch",
        url: "/unlike",
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: {
          postId: post._id
        }
      })

      setIsLiked(!isLiked)
      setLikeCount(likeCount - 1)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUserData()
    if (post.likes.length > 0) {
      setIsLiked(post.likes.includes(userLoggedIn.id))
    }
  }, [])

  return (
    <View style={styles.postContainer}>
      <View style={styles.postHeader}>
        {user.imageUrl !== "" && (
          <Image
            source={{ uri: user.imageUrl }}
            style={styles.profilePicture}
          />
        )}
        <Text style={styles.username}>{user.name}</Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("PostDetailScreen", {
          post, userLoggedIn, likeCount, user, token, isLiked, handleUnlike, handleLike
        })}
      >
        <Image
          source={{ uri: post.thumbnail }}
          style={styles.postImage}
        />
      </TouchableOpacity>
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

          <TouchableOpacity
            style={styles.commentButton}
            onPress={() => navigation.navigate("PostDetailScreen", {
              post, userLoggedIn, likeCount, user, token, isLiked, handleUnlike, handleLike
            })}
          >
            <FontAwesome6 name="comment" size={24} color="white" />
          </TouchableOpacity>
        </View>
        {likeCount > 0 && <Text style={styles.likeCount}>{likeCount} like{likeCount > 1 ? "s" : ""}</Text>}

        <View style={styles.captionContainer}>
          <Text style={styles.username}>
            {user.username} <Text style={styles.caption}>{post.caption}</Text>
          </Text>
        </View>

        {post.comments.length > 0 &&
          <TouchableOpacity
            style={styles.viewAllCommentsButton}
            onPress={() => navigation.navigate("PostDetailScreen", {
              post, userLoggedIn, likeCount, user, token, isLiked, handleUnlike, handleLike
            })}
          >
            <Text style={styles.viewAllCommentsText}>View all {post.comments.length} comment{post.comments.length > 1 ? "s" : ""}</Text>
          </TouchableOpacity>
        }

        <View style={styles.addCommentContainer}>
          <Image
            source={{ uri: userLoggedIn.imageUrl }}
            style={styles.profilePicture}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate("PostDetailScreen", {
              post, userLoggedIn, likeCount, user, token, isLiked, handleUnlike, handleLike
            })}
          >
            <Text style={styles.addComment}>Add comment...</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.postTime}>{calculateTimeAgo(post.createdAt)}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  postContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    padding: 10,
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
    fontWeight: "normal",
  },
  addCommentContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    marginTop: 10,
  },
  addComment: {
    color: "white",
    marginLeft: 5,
    opacity: 0.5,
  },
  postTime: {
    color: "white",
    opacity: 0.5,
    marginTop: 5,
  },
})