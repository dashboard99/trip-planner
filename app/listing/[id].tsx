import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  Share,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
SafeAreaView;
import { useQuery } from "@tanstack/react-query";
import { getDataById } from "../api/places";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";
import Animated, {
  SlideInDown,
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { defaultStyles } from "@/constants/Styles";
const IMG_HEIGHT = 300;
const { width } = Dimensions.get("window");

const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const location = useQuery({
    queryKey: ["location"],
    queryFn: () => getDataById(id),
  });
  const navigation = useNavigation(); // access the navigation obj

  const shareListing = async () => {
    try {
      await Share.share({
        title: location.data?.title,
        url: location.data?.image!,
      });
    } catch (err) {
      console.log(err);
    }
  };

  // 1. make the entire scoll view as a ref
  // 2. add the event throttle

  const scorllRef = useAnimatedRef<Animated.ScrollView>();

  const scrollOffset = useScrollViewOffset(scorllRef); // pass the scroll ref

  // stleing depend of the scrolloffset
  // this is used for doing the specifc style using reanimated

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,

            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,

            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [2, 1, 1]
          ),
        },
      ],
    };
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOffset.value, [0, IMG_HEIGHT / 1.5], [0, 1]),
    };
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackground: () => (
        <Animated.View style={[styles.topHeader, headerAnimatedStyle]} />
      ),

      headerRight: () => (
        <View style={styles.bar}>
          <TouchableOpacity style={styles.roundButton} onPress={shareListing}>
            <Ionicons name="share-outline" size={22} color={"#000"} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.roundButton}>
            <Ionicons name="heart-outline" size={22} color={"#000"} />
          </TouchableOpacity>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={styles.roundButton}
          onPress={navigation.goBack}
        >
          <Ionicons name="chevron-back" size={24} color={"#000"} />
        </TouchableOpacity>
      ),
    });
  }, []);
  return (
    <>
      {location.isLoading ? (
        <>
          <ActivityIndicator size="large" color="green" />
        </>
      ) : null}
      {location.isError ? (
        <View>
          <Text>Could not get the data</Text>
        </View>
      ) : null}

      {location.isSuccess ? (
        <View style={styles.container}>
          <Animated.ScrollView
            ref={scorllRef}
            contentContainerStyle={{
              paddingBottom: 100,
            }}
            scrollEventThrottle={16}
          >
            <Animated.Image
              source={{ uri: location.data.image }}
              style={[styles.img, imageAnimatedStyle]}
            />

            <View style={styles.infoContainer}>
              <Text style={styles.header}>
                {location.data.title.toUpperCase()}
              </Text>
              <Text style={styles.subheader}>{location.data.description}</Text>
              <View style={styles.divider}></View>
              <Text style={styles.descrip}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Eligendi expedita similique minus corrupti possimus vitae
                nesciunt aut placeat, quisquam itaque alias incidunt assumenda
                esse eaque debitis facere. Tenetur, dolorum ab!
              </Text>
            </View>
          </Animated.ScrollView>

          <Animated.View
            style={defaultStyles.footer}
            entering={SlideInDown.delay(200)}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <TouchableOpacity style={defaultStyles.btn}>
                <Text style={defaultStyles.btnText}>Add To the Journey</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      ) : null}
    </>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  img: {
    width,
    height: IMG_HEIGHT,
  },

  infoContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  header: {
    fontFamily: "mon-b",
    fontSize: 20,
    marginBottom: 8,
  },
  subheader: {
    fontFamily: "mon-sb",
    fontSize: 18,
    marginBottom: 8,
  },
  descrip: {
    fontFamily: "mon",
  },

  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#333",
    marginVertical: 16,
  },

  bar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  roundButton: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    color: "#ccc",
  },
  topHeader: {
    backgroundColor: "#fff",
    height: 100,
    borderBottomColor: "#333",
    borderWidth: StyleSheet.hairlineWidth,
  },
});
