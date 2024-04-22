import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import imageLogo from "../assets/Image12.png";
import PostCard from "../components/PostCard";
import { getItemAsync } from "expo-secure-store";
import { serverRequest } from "../utils/axios";
import { useEffect, useState } from "react";

export default function CommunityScreen({ navigation }) {
  const [posts, setPosts] = useState([])
  const [token, setToken] = useState("")

  const getPosts = async () => {
    try {
      const { accessToken } = JSON.parse(await getItemAsync('user'));
      const response = await serverRequest({
        method: "get",
        url: "/post?page=1&limit=10",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      setToken(accessToken)
      setPosts(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getPosts()
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={imageLogo}
          style={styles.logo}
        />
      </View>
      <View style={styles.separator}></View>
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("AddPostScreen")}>
        <Text style={styles.addButtonText}>Add Post</Text>
      </TouchableOpacity>
      <ScrollView>
        {posts && posts.map((post) => (
          <PostCard key={post._id} navigation={navigation} post={post} token={token} />
        ))}
      </ScrollView>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 200,
    height: 100,
    resizeMode: "contain"
  },
  separator: {
    height: 1,
    backgroundColor: "white",
    marginBottom: 20,
    opacity: 0.7,
  },
  addButton: {
    backgroundColor: "#59A5D8",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  }
});
