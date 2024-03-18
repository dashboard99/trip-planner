import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import React from "react";
import { PlaceType } from "@/types/type";
import { Link } from "expo-router";
import { getData } from "@/app/api/places";
import { useQuery } from "@tanstack/react-query";
import { LocationType } from "@/types/type";
import { Entypo } from "@expo/vector-icons";
const Popular = () => {
  const popular = useQuery({
    queryKey: ["popular"],
    queryFn: () => getData("travel"),
  });

  const [loading, setLoading] = React.useState(false);

  return (
    <>
      {popular.isLoading ? <ActivityIndicator /> : null}
      {popular.isError ? <Text>could not load the data</Text> : null}
      {popular.isSuccess ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {popular.data.map((img: PlaceType, index: React.Key) => (
            <Link href={`/listing/${img.id}`} asChild key={index}>
              <TouchableOpacity>
                <View style={styles.card}>
                  <Image
                    source={{ uri: img.image }}
                    style={styles.img}
                    resizeMode="center"
                    onLoadStart={() => setLoading(true)}
                    onLoadEnd={() => setLoading(false)}
                  />
                  {loading && <ActivityIndicator color="green" size="large" />}
                  <View style={{ flex: 2, padding: 10 }}>
                    <Text style={styles.travelText}>{"Travel"}</Text>
                    <View style={styles.subheader}>
                      <Entypo name="location-pin" size={20} color="purple" />
                      <Text style={{ flexShrink: 1 }}>{"Travel"}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </Link>
          ))}
        </ScrollView>
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
    width: 280,
    height: 250,
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
    flex: 6,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    width: undefined,
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
export default Popular;
