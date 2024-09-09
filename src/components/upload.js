import { Platform } from "react-native";

// Adjust the URL based on your environment
const URL = "https://vercel-test2-silk.vercel.app/api/vision";

// local server
// const URL = "http://localhost:8000/api/vision";

// URL = "http://192.168.1.119:5050/api/vision";

const uploadImage = async (imageUri) => {
  const formData = new FormData();

  // Get the file name and type from the URI
  const filename = imageUri.split("/").pop();
  const match = /\.(\w+)$/.exec(filename);
  const type = match ? `image/${match[1]}` : `image`;

  // For web, we need to handle files differently
  let imageData;

  if (Platform.OS === "web") {
    const response = await fetch(imageUri);
    const blob = await response.blob();
    imageData = new File([blob], filename, { type: blob.type });
  } else {
    // Mobile platform handling (iOS/Android)
    imageData = {
      uri:
        Platform.OS === "android" ? imageUri : imageUri.replace("file://", ""),
      name: filename,
      type: type,
    };
  }

  formData.append("photo", imageData);

  try {
    const response = await fetch(URL, {
      method: "POST",
      // Let the fetch API handle the Content-Type for formData
      body: formData,
    });

    const result = await response.json();
    console.log("Upload successful:", result);
    return result;
  } catch (error) {
    console.error("Error uploading image:", error);
    return { success: false, error: "Failed to upload image" };
  }
};

module.exports = { uploadImage };
