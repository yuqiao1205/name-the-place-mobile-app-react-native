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
  const [isHovered, setIsHovered] = useState(false);

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
          <Icon name="home-outline" size={30} color="white" />
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
        <TouchableOpacity
          onPress={onSaveDetails}
          style={[
            styles.saveButton,
            { backgroundColor: isHovered ? "#8a2be2" : "#979999" }, // Change background color on hover
          ]}
          activeOpacity={0.7} // Change opacity when pressed
          onPressIn={() => setIsHovered(true)} // Start hover effect
          onPressOut={() => setIsHovered(false)} // End hover effect
        >
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
    backgroundColor: "#d93489",
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 15,
    // header color pink
  },
  container: {
    flexGrow: 1,
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#f5f5f2", // screen background color light gray
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
    color: "black",
  },
  description: {
    fontSize: 16,
    textAlign: "left",
    color: "black", // text color black
  },
  saveButton: {
    backgroundColor: "gray", // purple color
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
