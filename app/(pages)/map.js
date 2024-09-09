import React, { useEffect, useRef, useState, useContext } from "react";
import {
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useLocalSearchParams, useRouter } from "expo-router";
import Icon from "react-native-vector-icons/Ionicons";
import { AppContext } from "../context.js";

const MapScreen = () => {
  const mapRef = useRef(null);
  // const { latitude, longitude } = useLocalSearchParams(); // Get the location from params
  const { sharedState, setSharedState } = useContext(AppContext);
  // state is {"places": [{"name": "Paris", "wikipediaLink": "https://...", "lat": 37.7749, "lon": -122.4194}, ...], "_meta": {"total": 1}}

  // Default location if no data is passed
  const [location, setLocation] = useState({
    latitude: sharedState ? sharedState.places[0].lat : 37.7749,
    longitude: sharedState ? sharedState.places[0].lon : -122.4194,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  console.log("state is", sharedState ? sharedState.places[0] : "no data");

  // useEffect(() => {
  //   // Pan and zoom to the new location whenever it changes
  //   if (mapRef.current && latitude && longitude) {
  //     const newLocation = {
  //       latitude: parseFloat(latitude),
  //       longitude: parseFloat(longitude),
  //       latitudeDelta: 0.01,
  //       longitudeDelta: 0.01,
  //     };
  //     mapRef.current.animateToRegion(newLocation, 1000);
  //     setLocation(newLocation); // Update the state to reflect the new location
  //   }
  // }, [latitude, longitude]); // Trigger when latitude or longitude changes

  // // Example function to move to a different location
  // const updateLocation = (newLatitude, newLongitude) => {
  //   const newLocation = {
  //     ...location,
  //     latitude: newLatitude,
  //     longitude: newLongitude,
  //   };
  //   setLocation(newLocation);
  // };

  const router = useRouter();
  const navigateHome = () => {
    router.replace("/home");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={{ flex: 1 }}>
        <TouchableOpacity style={styles.backHomeIcon} onPress={navigateHome}>
          <Icon name="home-outline" size={30} color="blue" />
        </TouchableOpacity>
        <MapView ref={mapRef} style={styles.map} region={location}>
          <Marker
            coordinate={location}
            title="Dynamic Location"
            description="This marker's location changes at runtime."
          />
        </MapView>
        <View style={styles.buttonContainer}>
          <Button
            title="Move to Another Location"
            onPress={() => updateLocation(37.7749, -122.4194)} // San Francisco example
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  backHomeIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    padding: 10,
    borderRadius: 20,
    zIndex: 1,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
});

export default MapScreen;
