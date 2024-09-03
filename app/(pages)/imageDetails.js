import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Platform,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import ImageViewer from "../../src/components/ImageViewer.js"; // Adjust the path as needed
import PlaceholderImage from "../../assets/event.jpg"; // Ensure this path is correct
import { captureRef } from "react-native-view-shot";
import * as MediaLibrary from "expo-media-library";
import { uploadImage } from "../../src/components/upload.js";
import Icon from "react-native-vector-icons/Ionicons";

const ImageDetailsScreen = () => {
  const { selectedImage, imageSize } = useLocalSearchParams();
  const [description, setDescription] = useState("Beautiful Place"); // Default description
  const router = useRouter();
  const viewRef = useRef(null);

  // Fetch the description from the server
  useEffect(() => {
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

    if (selectedImage) {
      getSimpleResponse();
    }
  }, [selectedImage]);

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

  const navigateHome = () => {
    router.replace("/home");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={navigateHome}>
          <Icon name="home-outline" size={30} color="#dea835" />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <View ref={viewRef} style={styles.contentContainer}>
          <View style={styles.imageContainer}>
            <ImageViewer
              placeholderImageSource={PlaceholderImage}
              selectedImage={selectedImage}
            />
          </View>
          <Text style={styles.label}>Location:</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        <TouchableOpacity onPress={onSaveDetails} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ImageDetailsScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#2b2d3b",
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 15,
  },
  container: {
    flexGrow: 1,
    justifyContent: "space-between",
    padding: 20,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    paddingBottom: 20,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#f5f5ed",
  },
  description: {
    fontSize: 16,
    textAlign: "left",
    color: "#f5f5ed",
  },
  saveButton: {
    backgroundColor: "#6c47ff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#dea835",
    fontSize: 16,
    fontWeight: "bold",
  },
});
