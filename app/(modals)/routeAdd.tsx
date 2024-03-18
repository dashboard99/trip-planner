import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  ListRenderItem,
  Pressable,
  ImageBackground,
} from "react-native";
// @ts-ignore
import DatePicker from "react-native-modern-datepicker";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { BlurView } from "expo-blur";
import Animated, { FadeIn, SlideInDown } from "react-native-reanimated";
import { defaultStyles } from "@/constants/Styles";
import { LocationType } from "@/types/type";
import axios from "axios";
import { useRouter } from "expo-router";
import useBasketStore from "@/store/placeStore";
const API_URL = process.env.EXPO_PUBLIC_API_URL;
const RouteAdd = () => {
  const router = useRouter();
  const [description, setDescription] = useState("");
  const [hasTitle, setHasTitle] = useState(false);
  const [input, setInput] = useState("");
  const [data, setData] = useState<LocationType[]>([]);
  const today = new Date().toISOString().substring(0, 10);

  const [selectedDate, setSelectedDate] = useState("");

  const { createTrip } = useBasketStore();

  const getImage = async (country: string) => {
    const resp = await axios.get(`${API_URL}/img?query=${country}&limit=1`);

    const data = resp.data;
    return data[0].image;
  };
  const getItemText = (item: LocationType) => (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 8,
        paddingVertical: 12,
      }}
    >
      <MaterialIcons
        name={item.type === "city" ? "location-city" : "location-on"}
        color={"black"}
        size={20}
      />
      <View style={{ marginLeft: 10, flexShrink: 1 }}>
        <Text style={{ fontFamily: "mon-sb" }}>{item.address.name}</Text>
        <Text style={{ fontSize: 12 }}>{item.address.country}</Text>
      </View>
    </View>
  );

  const onChangeText = async (text: string) => {
    setInput(text);
    if (text.length === 0) setData([]);
    if (input.length > 3) {
      let endpoint = `http://localhost:8787/search?query=${text}&limit=${5}`;
      const res = await axios.get(endpoint);

      if (res.data) {
        const data: LocationType[] = res.data;
        if (data.length > 0) {
          setData(data);
        }
      }
    }
  };

  const submit = async () => {
    const img = await getImage(input);
    const route = {
      locationName: input,
      description,
      departureDate: selectedDate,
      coverImage: img,
      ongoing: true,
      schedule: [[]],
    };

    setInput("");
    setDescription("");
    setSelectedDate(today);
    createTrip(route);
    router.back();
  };

  const onClearAll = () => {
    setInput("");
    setDescription("");
    setSelectedDate(today);
  };

  return (
    <BlurView intensity={50} style={styles.container} tint="light">
      {/* <ImageBackground
       source={require("assets/images/bg.jpg")}
      style={styles.container}
    > */}
      <View style={styles.card}>
        <Animated.Text entering={FadeIn} style={styles.title}>
          Where is next?
        </Animated.Text>

        <View style={styles.searchSection}>
          <Ionicons name="ios-search" size={20} color="#000" />
          <TextInput
            placeholder="What country you are going ?"
            onChangeText={onChangeText}
            value={input}
          />
        </View>

        <View style={styles.searchSection}>
          <AntDesign name="edit" size={20} color="#000" />
          <TextInput
            placeholder="Write some description"
            onChangeText={(value) => setDescription(value)}
            numberOfLines={4}
            multiline={true}
            value={description}
          />
        </View>

        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <FlatList
            data={data}
            renderItem={({ item, index }) => (
              <Pressable
                onPress={() => {
                  setData([]);
                  setInput(item.address.name);
                  setHasTitle(true);
                }}
                style={({ pressed }) => [
                  pressed && { backgroundColor: "lightskyblue" },
                ]}
              >
                {getItemText(item)}
              </Pressable>
            )}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => `${index}-${item.osm_id}`}
          ></FlatList>
        </TouchableWithoutFeedback>

        <View style={{ marginTop: 30 }}>
          <Text style={styles.whenTitle}>When are you going to depart?</Text>
          <DatePicker
            current={today}
            selected={today}
            options={{
              defaultFont: "mon",
              headerFont: "mon-sb",
              borderColor: "transparent",
            }}
            mode={"calendar"}
            minimumDate={today}
            onSelectedChange={(date: string) => setSelectedDate(date)}
          />
        </View>
      </View>
      <Animated.View
        style={defaultStyles.footer}
        entering={SlideInDown.delay(200)}
      >
        {/* Footer */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={() => onClearAll()}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: "mon-sb",
                textDecorationLine: "underline",
              }}
            >
              Clear All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => submit()}
            style={[
              defaultStyles.btn,
              {
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
              },
            ]}
          >
            <MaterialIcons name="create" size={22} color="#fff" />
            <Text style={defaultStyles.btnText}>Create</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
      {/* </ImageBackground> */}
    </BlurView>
  );
};

export default RouteAdd;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: "cover",
    paddingTop: 100,
  },
  title: {
    fontFamily: "mon-b",
    fontSize: 20,
  },

  form: {
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  card: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 50,
    borderRadius: 12,
    backgroundColor: "#fff",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.3,
    marginVertical: 30,
    marginHorizontal: 20,
  },
  searchSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 20,

    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 8,
  },
  cardBody: {},
  whenTitle: {
    fontSize: 16,
    fontFamily: "mon-sb",
  },
});
