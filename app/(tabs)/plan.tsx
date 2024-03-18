import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

import { Stack } from "expo-router";
import CustomHeader from "@/components/customHeader";
import OngoingTrips from "@/components/ongoingTrips";

const Plan = () => {
  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          header: () => <CustomHeader />,
        }}
      />
      <OngoingTrips />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Plan;
