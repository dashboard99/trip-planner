import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Image,
  Linking,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { getData } from "@/app/api/places";
import { PlaceType } from "@/types/type";
import { Link } from "expo-router";
import Animated, { FadeIn, FadeOutLeft } from "react-native-reanimated";
interface Props {
  search: string;
  country: string;
}

const ForYou = ({ search, country }: Props) => {
  const forYouPlaces = useQuery({
    queryKey: ["foryou", search],
    queryFn: () => getData(search),
  });
  const [loading, setLoading] = React.useState(false);
  return (
    <>
      {forYouPlaces.isLoading ? <ActivityIndicator /> : null}
      {forYouPlaces.isError ? <Text>Could'nt load data</Text> : null}
      {forYouPlaces.isSuccess ? (
        <Animated.ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          entering={FadeIn}
          exiting={FadeOutLeft}
        >
          {forYouPlaces.data.map((img: PlaceType, index: React.Key) => (
            <Link href={`/listing/${img.id}`} key={index} asChild>
              <TouchableOpacity>
                <View style={styles.card}>
                  <Image
                    style={styles.img}
                    source={{ uri: img.image }}
                    resizeMode="center"
                    onLoadStart={() => setLoading(true)}
                    onLoadEnd={() => setLoading(false)}
                  />

                  {loading && <ActivityIndicator color="green" size="large" />}

                  <Text style={styles.travelText}>{search}</Text>
                  <View style={styles.subheader}>
                    <Entypo name="location-pin" size={20} color="purple" />
                    <Text style={{ flexShrink: 1 }}>{country}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </Link>
          ))}
        </Animated.ScrollView>
      ) : null}
    </>
  );
};
const styles = StyleSheet.create({
  title: {
    fontFamily: "mon-b",
    fontSize: 20,
    marginVertical: 15,
  },
  card: {
    backgroundColor: "#fff",
    width: 150,
    height: 150,
    marginEnd: 12,

    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.06,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    marginBottom: 10,
    paddingBottom: 4,
  },
  img: {
    flex: 1,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
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
export default ForYou;
