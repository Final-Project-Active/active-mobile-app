import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import imageLogo from "../assets/Image12.png";
import { useState } from "react";
import { serverRequest } from "../utils/axios";

export default function AddPostScreen({ navigation, route }) {
  const [caption, setCaption] = useState('');
  const [thumbnail, setThumbnail] = useState('');

  const handleSubmit = async () => {
    try {
      await serverRequest({
        method: 'post',
        url: '/post',
        data: {
          caption,
          thumbnail
        },
        headers: {
          Authorization: `Bearer ${route.params.token}`,
        },
      })

      setCaption('')
      setThumbnail('')
      navigation.navigate("CommunityScreen", { refreshData: true });
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
      <TextInput
        style={styles.captionInput}
        placeholder="Caption"
        multiline
        value={caption}
        onChangeText={setCaption}
      />

      <TextInput
        style={styles.fileInput}
        placeholder="Upload File"
        value={thumbnail}
        onChangeText={setThumbnail}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Post</Text>
      </TouchableOpacity>
    </View>
  )
}

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
  fileInput: {
    backgroundColor: "white",
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
  },
  captionInput: {
    backgroundColor: "white",
    padding: 10,
    height: 100,
    marginBottom: 20,
    borderRadius: 10,
    marginTop: 200,
  },
  submitButton: {
    backgroundColor: "#59A5D8",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  submitButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});