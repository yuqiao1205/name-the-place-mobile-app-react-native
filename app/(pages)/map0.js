import React from "react";
import { SafeAreaView, View, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import MapView from "react-native-maps";
import { useLocalSearchParams, useRouter } from "expo-router";

const DEFAULT_REGION = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

export default function Map(locationData) {
  const mapRef = React.useRef(null);
  const router = useRouter();

  // Use `useLocalSearchParams` to get the new location data (if passed)
  const { latitude, longitude, latitudeDelta, longitudeDelta } =
    useLocalSearchParams();

  const navigateHome = () => {
    router.replace("/home");
  };

  const focusMap = () => {
    const SF = {
      latitude: 44.5013,
      longitude: -88.0622,
      latitudeDelta: 0.01, // Smaller delta zooms in
      longitudeDelta: 0.01,
    };

    // Use setRegion for Apple Maps instead of animateCamera
    if (mapRef.current) {
      mapRef.current.animateToRegion(SF, 3000); // 2000ms duration
    }
  };

  const newRegion = {
    latitude: latitude ? parseFloat(latitude) : DEFAULT_REGION.latitude,
    longitude: longitude ? parseFloat(longitude) : DEFAULT_REGION.longitude,
    latitudeDelta: latitudeDelta
      ? parseFloat(latitudeDelta)
      : DEFAULT_REGION.latitudeDelta,
    longitudeDelta: longitudeDelta
      ? parseFloat(longitudeDelta)
      : DEFAULT_REGION.longitudeDelta,
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={{ flex: 1 }}>
        <MapView
          style={StyleSheet.absoluteFill}
          ref={mapRef}
          initialRegion={newRegion} // Dynamically use new location data
        />

        <TouchableOpacity style={styles.backHomeIcon} onPress={navigateHome}>
          <Icon name="home-outline" size={30} color="white" />
        </TouchableOpacity>

        {/* Button to trigger the zoom animation */}
        <TouchableOpacity style={styles.zoomIcon} onPress={focusMap}>
          <Icon name="search-outline" size={30} color="white" />
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
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    borderRadius: 20,
  },
  zoomIcon: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    borderRadius: 20,
  },
});
