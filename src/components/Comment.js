import { Image, StyleSheet, Text, View } from "react-native";
import { serverRequest } from "../utils/axios";
import { useEffect, useState } from "react";

export default function Comment({ comment, token }) {
  const [user, setUser] = useState({
    name: "",
    username: "",
    imageUrl: ""
  })

  const getUser = async () => {
    try {
      const user = await serverRequest({
        method: "get",
        url: `/user/${comment.userId}`,
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

  useEffect(() => {
    getUser()
  }, [])

  return (
    <View style={styles.commentContainer}>
      <Image
        source={{ uri: user.imageUrl }}
        style={styles.profilePicture}
      />
      <View style={styles.commentTextContainer}>
        <Text style={styles.username}>{user.name}</Text>
        <Text style={styles.addComment}>{comment.comment}</Text>
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
