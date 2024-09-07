import React from "react";
import { SafeAreaView, View, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; // Make sure this matches your icon library
import MapView from "react-native-maps"; // Assuming you're using react-native-maps
import { useRouter } from "expo-router"; // Assuming you're using expo-router
// import { PROVIDER_GOOGLE } from "react-native-maps";

export default function App() {
  const router = useRouter();
  const navigateHome = () => {
    router.replace("/home");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={{ flex: 1 }}>
        <MapView style={StyleSheet.absoluteFill} />
        <TouchableOpacity style={styles.backHomeIcon} onPress={navigateHome}>
          <Icon name="home-outline" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  backHomeIcon: {
    position: "absolute", // To position it on top of the map
    top: 10, // Distance from the top
    right: 10, // Distance from the right
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Optional: background color with opacity
    padding: 10, // Optional: add padding for touchable area
    borderRadius: 20, // Optional: rounded corners
  },
});
