// import { View, Text, Button, TextInput, StyleSheet } from "react-native";
// import { useState } from "react";
// import { useUser } from "@clerk/clerk-expo";

// const Profile = () => {
//   const { user } = useUser();
//   const [firstName, setFirstName] = useState(user?.firstName || "");
//   const [lastName, setLastName] = useState(user?.lastName || "");

//   const onSaveUser = async () => {
//     try {
//       if (!user) {
//         console.error("No user found");
//         return;
//       }

//       // Update the user attributes
//       const result = await user.update({
//         firstName: firstName,
//         lastName: lastName,
//       });

//       console.log("User updated successfully:", result);
//       Alert.alert("Success", "Your profile has been updated.");
//     } catch (e) {
//       console.log("Error updating user:", JSON.stringify(e));
//       Alert.alert("Error", "Failed to update your profile.");
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={{ textAlign: "center" }}>
//         Hello {user?.firstName} {user?.lastName}
//       </Text>

//       <TextInput
//         placeholder="First Name"
//         value={firstName}
//         onChangeText={setFirstName}
//         style={styles.inputField}
//       />
//       <TextInput
//         placeholder="Last Name"
//         value={lastName}
//         onChangeText={setLastName}
//         style={styles.inputField}
//       />
//       <Button onPress={onSaveUser} title="Update account" color={"#6c47ff"} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     padding: 40,
//   },
//   inputField: {
//     marginVertical: 4,
//     height: 50,
//     borderWidth: 1,
//     borderColor: "#6c47ff",
//     borderRadius: 4,
//     padding: 10,
//     backgroundColor: "#fff",
//   },
// });

// export default Profile;

import { View, Text } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";

const Welcome = () => {
  const { user } = useUser();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Welcome, {user?.emailAddresses[0].emailAddress} 🎉</Text>
    </View>
  );
};

export default Welcome;
