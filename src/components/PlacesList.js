import React from "react";
import { View, Text, Button, Linking, StyleSheet } from "react-native";

const PlacesList = ({ places }) => {
  return (
    <View>
      {places.map((place, index) => (
        <View key={index} style={styles.placeRow}>
          {/* Display the name of the place */}
          <Text style={styles.placeName}>{place.name}</Text>

          {/* Button to open the Wikipedia link */}
          <Button
            title="Open Wikipedia"
            onPress={() => Linking.openURL(place.wikipediaLink)}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  placeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  placeName: {
    fontSize: 18,
  },
});
export default PlacesList;
