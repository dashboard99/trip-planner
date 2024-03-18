import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Link, Stack } from "expo-router";
import ExploreHeader from "@/components/exploreHeader";
import { Entypo } from "@expo/vector-icons";

import { Place } from "@/types/type";
import ForYou from "@/components/ForYou";
import Popular from "@/components/popular";
const Explore = () => {
  const [search, setSearch] = useState("Tokyo");
  const [country, setCountry] = useState("Japan");
  const onDataChanged = (text: string, country: string) => {
    setSearch(text);
    setCountry(country);
  };

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onLocationChanged={onDataChanged} />,
        }}
      />

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          backgroundColor: "#fff",
          zIndex: -999,
          position: "relative",
        }}
      >
        <Text style={styles.title}>For You</Text>
        <ForYou search={search} country={country} />
        <Text style={styles.title}>Popular Places</Text>
        <Popular />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: "mon-b",
    fontSize: 20,
    marginVertical: 15,
  },

  travelText: {
    marginVertical: 5,
    paddingHorizontal: 6,
    fontSize: 14,
    fontFamily: "mon-b",
  },
  subheader: {
    flexDirection: "row",
    fontFamily: "mon-sb",
    gap: 2,
    alignItems: "center",
  },
});

export default Explore;
