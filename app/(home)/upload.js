import { Platform } from "react-native";

// const URL = "http://localhost:8000/api/vision"
const URL = "https://vercel-test2-silk.vercel.app/api/vision";
// const URL = "http://192.168.1.119:5050/api/vision";

const uploadImage = async (imageUri) => {
  const formData = new FormData();

  // Get the file name and type from the URI
  const filename = imageUri.split("/").pop();
  const match = /\.(\w+)$/.exec(filename);
  const type = match ? `image/${match[1]}` : `image`;

  // Append the image file to FormData
  const imageData = {
    uri: Platform.OS === "android" ? imageUri : imageUri.replace("file://", ""),
    name: filename,
    type: type,
  };
  console.log(imageData);

  formData.append("photo", imageData);

  try {
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
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
