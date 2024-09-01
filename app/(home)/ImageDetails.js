import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  Platform,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import ImageViewer from "../../src/components/ImageViewer"; // Adjust the path as needed
import PlaceholderImage from "../../assets/event.jpg"; // Ensure this path is correct
import { captureRef } from "react-native-view-shot";
import * as MediaLibrary from "expo-media-library";
import { uploadImage } from "./upload";

const ImageDetailsScreen = () => {
  const { selectedImage, imageSize } = useLocalSearchParams();
  const [description, setDescription] = useState("Beautiful Place"); // Default description
  const router = useRouter();
  const viewRef = useRef(null);

  // Call http://localhost:8000/api/simple and get the string response which we will use to set the description
  const getSimpleResponse = async () => {
    try {
      const response = await uploadImage(selectedImage);
      console.log("response:", response);
      if (response.success) {
        setDescription(response.answer);
      }
    } catch (error) {
      console.error("Error fetching response:", error);
    }
  };

  // Call the function to get the simple response
  console.log("selectedImage:", selectedImage);
  getSimpleResponse();

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
      <View style={styles.imageContainer}>
        <ImageViewer
          placeholderImageSource={PlaceholderImage}
          selectedImage={selectedImage}
          //   style={{ width: 100, height: 150 }} // Set the size of the image
        />
      </View>
      <ScrollView style={styles.scrollContainer}>
        <View ref={viewRef} style={styles.contentContainer}>
          <Text style={styles.label}>Location:</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </ScrollView>
      {/* <Button title="Save" onPress={onSaveDetails} style={styles.saveButton} /> */}
      <TouchableOpacity onPress={onSaveDetails} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ImageDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2b2d3b",
    paddingTop: 20,
  },
  imageContainer: {
    flex: 1,
    paddingTop: 10,
    alignItems: "center",
  },
  scrollContainer: {
    flex: 1,
    marginTop: 100, // Adjust based on the size of your image
  },
  contentContainer: {
    padding: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#f5f5ed",
  },
  description: {
    fontSize: 16,
    marginBottom: 70,
    textAlign: "left",
    color: "#f5f5ed",
  },
  //   saveButton: {
  //     marginTop: 20,
  //     marginHorizontal: 20,
  //     backgroundColor: "#007BFF", // Background color of the button
  //     borderRadius: 5, // Rounded corners
  //     padding: 10, // Padding inside the button
  //     alignItems: "center", // Center align text
  //   },
  saveButton: {
    marginTop: 10,
    marginHorizontal: 20,
    color: "#f0cf29",
    alignItems: "center",
  },
  saveButtonText: {
    color: "#dea835", // Text color of the button
    fontSize: 16,
    fontWeight: "bold",
  },
});
