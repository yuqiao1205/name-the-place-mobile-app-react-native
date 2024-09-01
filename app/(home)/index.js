import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Platform, Image } from "react-native";
import Button from "../../src/components/Button";
import ImageViewer from "../../src/components/ImageViewer";
import * as ImagePicker from "expo-image-picker";
import React, { useState, useRef } from "react";
import CircleButton from "../../src/components/CircleButton";
import IconButton from "../../src/components/IconButton";
import EmojiPicker from "../../src/components/EmojiPicker";
import EmojiList from "../../src/components/EmojiList";
import EmojiSticker from "../../src/components/EmojiSticker";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as MediaLibrary from "expo-media-library"; // provides a usePermissions() hook that requests permissions to access the user's media library.
import { captureRef } from "react-native-view-shot"; // captureRef() function to take a screenshot of the current view.
import domtoimage from "dom-to-image";
import { useRouter } from "expo-router";
import * as ImageManipulator from "expo-image-manipulator";

const PlaceholderImage = require("../../assets/event.jpg");

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null); // for the selected image
  const [showAppOptions, setShowAppOptions] = useState(false); // for the app options
  const [isModalVisible, setIsModalVisible] = useState(false); // for the EmojiPicker
  const [pickedEmoji, setPickedEmoji] = useState(null); // for the picked emoji

  const imageRef = useRef();

  // Once permission is given, the value of the status changes to granted.
  const [status, requestPermission] = MediaLibrary.usePermissions();
  if (status === null) {
    requestPermission();
  }

  // const pickImageAsync = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     allowsEditing: true,
  //     quality: 1,
  //   });

  //   if (!result.canceled) {
  //     console.log("result:", result); // Add this line to check the result

  //     const resizedImage = await ImageManipulator.manipulateAsync(
  //       result.assets[0].uri,
  //       [
  //         {
  //           resize: {
  //             width: 512,
  //             height: 512,
  //           },
  //         },
  //       ],
  //       {
  //         compress: 1,
  //         format: ImageManipulator.SaveFormat.JPEG,
  //       }
  //     );

  //     // setSelectedImage(result.assets[0].uri);
  //     setSelectedImage(resizedImage.uri);

  //     setShowAppOptions(false);
  //   } else {
  //     alert("You did not select any image.");
  //   }
  // };

  const pickImageAsync = async () => {
    if (Platform.OS === "web") {
      // Web-specific code
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = "image/*";
      fileInput.onchange = async (event) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = async (e) => {
            const imageUri = e.target.result;

            // Web-specific resize using canvas
            const canvas = document.createElement("canvas");
            const img = new window.Image(); // Use window.Image instead of Image
            img.src = imageUri;
            img.onload = () => {
              const ctx = canvas.getContext("2d");
              canvas.width = 512;
              canvas.height = 512;
              ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
              canvas.toBlob(async (blob) => {
                const resizedUri = URL.createObjectURL(blob);
                setSelectedImage(resizedUri);
                setShowAppOptions(false);
              }, "image/jpeg");
            };
          };
          reader.readAsDataURL(file);
        } else {
          alert("You did not select any image.");
        }
      };
      fileInput.click();
    } else {
      // Mobile-specific code
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        console.log("result:", result);

        const resizedImage = await ImageManipulator.manipulateAsync(
          result.assets[0].uri,
          [
            {
              resize: {
                width: 512,
                height: 512,
              },
            },
          ],
          {
            compress: 1,
            format: ImageManipulator.SaveFormat.JPEG,
          }
        );

        setSelectedImage(resizedImage.uri);
        setShowAppOptions(false);
      } else {
        alert("You did not select any image.");
      }
    }
  };

  const onReset = () => {
    setPickedEmoji(null); // Clear the picked emoji
    setShowAppOptions(false);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const onSaveImageAsync = async () => {
    // setIsModalVisible(false);
    if (Platform.OS !== "web") {
      try {
        const localUri = await captureRef(imageRef, {
          height: 440,
          quality: 1,
        });
        await MediaLibrary.saveToLibraryAsync(localUri);
        if (localUri) {
          alert("Saved!");
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        const dataUrl = await domtoimage.toJpeg(imageRef.current, {
          quality: 0.95,
          width: 300,
          height: 350,
        });

        let link = document.createElement("a");
        link.download = "sticker-smash.jpeg";
        link.href = dataUrl;
        link.click();
      } catch (e) {
        console.log(e);
      }
    }
  };

  const router = useRouter();

  const onGoToDetails = () => {
    router.push({
      pathname: "/(home)/ImageDetails",
      params: {
        selectedImage: selectedImage,
        imageSize: 300, // Pass the image size to the details screen
      },
    });
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
        <View ref={imageRef} collapsable={false}>
          <ImageViewer
            placeholderImageSource={PlaceholderImage}
            selectedImage={selectedImage}
          />

          {pickedEmoji && (
            <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />
          )}
        </View>
      </View>

      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton
              icon="refresh"
              label="Reset"
              onPress={onReset}
              color="#1732e3"
            />
            <CircleButton onPress={onAddSticker} />
            <IconButton
              icon="save-alt"
              label="Save"
              onPress={onSaveImageAsync}
            />
          </View>
          <Button
            label="NameThePlace"
            onPress={onGoToDetails} // Navigate to ImageDetailsScreen
          />
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button
            theme="primary"
            label="Choose a photo"
            onPress={pickImageAsync}
          />
          <Button
            label="Use this photo"
            onPress={() => setShowAppOptions(true)}
          />
        </View>
      )}

      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
      <StatusBar style="auto" />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2b2d3b",
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
    paddingTop: 60,
  },
  image: {
    width: 300,
    height: 350,
    borderRadius: 18,
  },
  optionsContainer: {
    position: "absolute",
    bottom: 5,
    width: "100%",
    alignItems: "center",
  },
  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "82%",
    marginBottom: 20,
  },
});
