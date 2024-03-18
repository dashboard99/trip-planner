import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ImageBackground,
  Image,
  Keyboard,
  FlatList,
  Pressable,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { LocationType } from "@/types/type";
import axios from "axios";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";
interface Props {
  onLocationChanged: (term: string, country: string) => void;
}
const API_URL = process.env.EXPO_PUBLIC_API_URL;
const ExploreHeader = ({ onLocationChanged }: Props) => {
  const [input, setInput] = useState<string>();
  const [data, setDate] = useState<LocationType[]>();

  //////// handle the text input change ///////
  // get the data from the listing and also change the text input value
  const onChangeText = async (text: string) => {
    setInput(text); // keep updateing
    if (text.length === 0) return setDate([]);
    if (text.length > 3) {
      // to decease the amount of call to the server, if the len of text is greater 2, if so
      // then we fetch
      let endpoint = `http://localhost:8787/search?query=${text}&limit=${5}`;
      const res = await axios.get(endpoint);

      if (res.data) {
        const data: LocationType[] = res.data;
        if (data.length > 0) setDate(data);
      }
    }
  };

  const getItemText = (item: LocationType) => {
    return (
      <View style={{ flexDirection: "row", alignItems: "center", padding: 15 }}>
        <MaterialIcons
          name={item.type === "city" ? "location-city" : "location-on"}
          color={"black"}
          size={28}
        />
        <View style={{ marginLeft: 10, flexShrink: 1 }}>
          <Text style={{ fontFamily: "mon-sb" }}>{item.address.name}</Text>
          <Text style={{ fontSize: 12 }}>{item.address.country}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView edges={["bottom"]} style={{ backgroundColor: "#fff" }}>
      <View style={{ position: "relative" }}>
        <ImageBackground
          source={require("assets/images/bg.jpg")}
          style={defaultStyles.bgcImg}
        >
          <View style={styles.header}>
            <View>
              <View style={styles.subTitle}>
                <Ionicons name="location" size={24} color={"#fff"} />
                <Text
                  style={{ fontFamily: "mon-sb", color: "#fff", fontSize: 16 }}
                >
                  You're in Japan
                </Text>
              </View>
              <Text style={styles.title}>Discovery</Text>
            </View>

            <Image
              source={require("assets/images/icon.jpeg")}
              style={styles.icon}
            />
          </View>
        </ImageBackground>

        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View
            style={{
              paddingTop: 30,
              position: "relative",
            }}
          >
            <View style={styles.searchSection}>
              <FontAwesome name="search" size={18} color="#333" />
              <TextInput
                placeholder="Find city"
                value={input}
                onChangeText={onChangeText}
              />
            </View>

            <View style={{ position: "relative" }}>
              <FlatList
                data={data}
                renderItem={({ item, index }) => (
                  <Pressable
                    onPress={() => {
                      onLocationChanged(
                        item.address.name,
                        item.address.country
                      );
                      setDate([]);
                      setInput("");
                    }}
                    style={({ pressed }) => [
                      styles.itemBox,
                      pressed && { backgroundColor: "lightskyblue" },
                    ]}
                  >
                    {getItemText(item)}
                  </Pressable>
                )}
                keyExtractor={(item, index) => `${item.osm_id}-${index}`}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{}}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  subTitle: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },

  optionButton: {
    padding: 10,
    borderRadius: 50,
  },

  searchIcon: {
    paddingLeft: 10,
  },
  backgroundImg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  title: {
    color: "white",
    fontFamily: "mon-b",
    fontSize: 32,
  },
  active: {
    backgroundColor: "red",
  },
  searchSection: {
    flexDirection: "row",
    gap: 10,
    height: 40,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 20,
    backgroundColor: "#fff",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: -1,
      height: 8,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    alignItems: "center",
  },
  itemBox: {
    paddingHorizontal: 20,
  },
});
export default ExploreHeader;
