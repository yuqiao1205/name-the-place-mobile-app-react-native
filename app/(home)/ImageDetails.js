import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, Button, Alert, Platform } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import ImageViewer from "../../src/components/ImageViewer"; // Adjust the path as needed
import PlaceholderImage from "../../assets/event.jpg"; // Ensure this path is correct
import { captureRef } from "react-native-view-shot";
import * as MediaLibrary from "expo-media-library";

const ImageDetailsScreen = () => {
  const { selectedImage, imageSize } = useLocalSearchParams();
  const [description, setDescription] = useState("Beautiful Place"); // Default description
  const router = useRouter();
  const viewRef = useRef(null);

  const onSaveDetails = async () => {
    if (Platform.OS !== "web") {
      try {
        // Request permission to access media library
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Permission required",
            "We need permission to save the image."
          );
          return;
        }

        // Capture screenshot of the view
        const uri = await captureRef(viewRef, {
          format: "png",
          height: 350,
          quality: 1.0,
        });

        // Save the captured image to media library
        const asset = await MediaLibrary.createAssetAsync(uri);
        await MediaLibrary.createAlbumAsync("Saved Images", asset, false);

        Alert.alert("Success", "Image detail saved to your gallery!");
        router.back(); // Navigate back to the previous screen
      } catch (error) {
        console.error("Error saving image:", error);
        Alert.alert("Error", "Failed to save the image.");
      }
    } else {
      Alert.alert(
        "Web Platform",
        "This feature is not available on the web platform."
      );
    }
  };

  return (
    <View style={styles.container}>
      <View ref={viewRef}>
        <ImageViewer
          placeholderImageSource={PlaceholderImage}
          selectedImage={selectedImage}
          style={{ width: imageSize, height: imageSize }} // Set the size of the image
        />
        <Text style={styles.label}>Location:</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <Button title="Save" onPress={onSaveDetails} />
    </View>
  );
};

export default ImageDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center", // Center the content horizontally
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
});
