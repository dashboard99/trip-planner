import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const CustomHeader = () => {
  return (
    <SafeAreaView style={{ backgroundColor: "#fff", paddingTop: 50 }}>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>My Trips</Text>
          <Image
            source={require("@/assets/images/icon.jpeg")}
            style={styles.img}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: 50,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: "mon-sb",
    fontSize: 24,
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});

export default CustomHeader;
