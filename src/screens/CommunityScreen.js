import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import imageLogo from "../assets/Image12.png";
import { FontAwesome6 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

export default function CommunityScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('CommunityScreen')
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={imageLogo}
          style={styles.logo}
        />
      </View>
      <View style={styles.separator}></View>
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Add Post</Text>
      </TouchableOpacity>

      <View style={styles.postContainer}>
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

          <TouchableOpacity style={styles.viewAllCommentsButton}>
            <Text style={styles.viewAllCommentsText}>View all 20 comments</Text>
          </TouchableOpacity>

          <View style={styles.addCommentContainer}>
            <Image
              source={{ uri: "https://img.freepik.com/free-vector/cute-monkey-holding-banana-baseball-bat-stick-cartoon-vector-icon-illustration-animal-sport_138676-7050.jpg" }}
              style={styles.profilePicture}
            />
            <Text style={styles.addComment}>Add comment...</Text>
          </View>
        </View>
        <Text style={styles.postTime}>10 minutes ago</Text>
      </View>
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
  },
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
});
