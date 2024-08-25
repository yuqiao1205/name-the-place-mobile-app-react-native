import { useState } from "react";
import { StyleSheet, FlatList, Image, Platform, Pressable } from "react-native";

export default function EmojiList({ onSelect, onCloseModal }) {
  //EmojiList is a child component that receives onSelect and onCloseModal as props from its parent (App.js).
  //It uses these functions to communicate back to the parent when an emoji is selected and to close the modal.
  const [emoji] = useState([
    require("../../assets/images/grinning.png"),
    require("../../assets/images/hugging_face.png"),
    require("../../assets/images/kissing_heart.png"),
    require("../../assets/images/kissing_smiling_eyes.png"),
    require("../../assets/images/sleeping.png"),
    require("../../assets/images/sunglasses.png"),
  ]);

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={Platform.OS === "web"}
      data={emoji}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item, index }) => (
        <Pressable
          onPress={() => {
            onSelect(item); //pass the selected emoji to the onSelect function to communicate back to the parent
            onCloseModal();
          }}
        >
          <Image source={item} key={index} style={styles.image} />
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
});
