import React from "react";
import { View, Text, Button, Linking, StyleSheet } from "react-native";

const PlacesList = ({ places }) => {
  return (
    <View>
      {places.map((place, index) => (
        <View key={index} style={styles.placeContainer}>
          {/* Display the name of the place */}
          <Text style={styles.placeName}>{place.name}</Text>

          {/* Button to open the Wikipedia link */}
          <Button
            style={styles.wikipediaLink}
            title="Open Wikipedia"
            onPress={() => Linking.openURL(place.wikipediaLink)}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  placeContainer: {
    marginVertical: 10,
    alignItems: "flex-start", // Align items to the left
  },
  placeName: {
    fontSize: 18,
    marginBottom: 5, // Adds space between the place name and button
  },
  wikipediaLink: {
    fontSize: 16,
    color: "purple",
    marginTop: 4, // Add a little space between the location and link
  },
});

export default PlacesList;
