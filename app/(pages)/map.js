import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Button } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useLocalSearchParams } from "expo-router";

const MapScreen = () => {
  const mapRef = useRef(null);
  const { latitude, longitude } = useLocalSearchParams(); // Get the location from params

  // Default location if no data is passed
  const [location, setLocation] = useState({
    latitude: latitude ? parseFloat(latitude) : 37.78825,
    longitude: longitude ? parseFloat(longitude) : -122.4324,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  useEffect(() => {
    // Pan and zoom to the new location whenever it changes
    if (mapRef.current && latitude && longitude) {
      const newLocation = {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      mapRef.current.animateToRegion(newLocation, 1000);
      setLocation(newLocation); // Update the state to reflect the new location
    }
  }, [latitude, longitude]); // Trigger when latitude or longitude changes

  // Example function to move to a different location
  const updateLocation = (newLatitude, newLongitude) => {
    const newLocation = {
      ...location,
      latitude: newLatitude,
      longitude: newLongitude,
    };
    setLocation(newLocation);
  };

  return (
    <View style={styles.container}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
});

export default MapScreen;
