// import { StyleSheet, Text, View } from "react-native";
// import React from "react";
// import { Redirect } from "expo-router";

// const index = () => {
//   return <Redirect href="/login" />;
// };

// export default index;

// const styles = StyleSheet.create({});
import { ActivityIndicator, View } from "react-native";

const StartPage = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

export default StartPage;
