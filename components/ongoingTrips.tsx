import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect } from "react";
import { defaultStyles } from "@/constants/Styles";
import { Link } from "expo-router";
import Colors from "@/constants/Colors";
import useBasketStore from "@/store/placeStore";
import { ScrollView } from "react-native-gesture-handler";

const { width } = Dimensions.get("window");

const OngoingTrips = () => {
  const { trip, addRecentTrip, recentTrip } = useBasketStore();
  console.log("🚀 ~ OngoingTrips ~ trip:", trip);
  console.log("🚀 ~ OngoingTrips ~ recentTrip:", recentTrip);

  useEffect(() => {
    console.log(recentTrip);
  }, [recentTrip]);

  return (
    <View style={defaultStyles.container}>
      {/* <ImageBackground
        source={require("assets/images/bg.jpg")}
        resizeMode="cover"
        style={{ flex: 1, opacity: 0.8 }}
      > */}
      {trip?.ongoing ? (
        <View style={{ paddingHorizontal: 20 }}>
          <Text style={styles.title}>Upcoming Trip</Text>

          <View style={styles.bgbox}>
            <Image
              source={{ uri: trip.coverImage }}
              style={styles.img}
              resizeMode="cover"
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{ gap: 4 }}>
                <Text style={{ fontFamily: "mon-sb" }}>
                  {trip.locationName}
                </Text>
                <Text style={{ fontFamily: "mon-sb" }}>{trip.description}</Text>

                <Text>Depart on {trip.departureDate}</Text>
              </View>
              <View style={{ flexDirection: "row", gap: 10 }}>
                <TouchableOpacity
                  style={styles.completedBtn}
                  onPress={() => addRecentTrip(trip)}
                >
                  <Text style={styles.btnText}>Completed</Text>
                </TouchableOpacity>
                <Link href="/(modals)/TripDetail" asChild>
                  <TouchableOpacity style={styles.updateBtn}>
                    <Text style={styles.btnText}>Add Update</Text>
                  </TouchableOpacity>
                </Link>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.addTripBox}>
          {/* <Link href="/" asChild> */}
          <Link href="/(modals)/routeAdd" asChild>
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.startText}>Let's add a new trip!!</Text>
            </TouchableOpacity>
          </Link>
          {/* </Link> */}
        </View>
      )}
      {/* </ImageBackground> */}
      {recentTrip.length > 0 && (
        <View style={styles.recentTripContainer}>
          <Text style={styles.title}> Recent Trip </Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {recentTrip.map((trip, index) => {
              return (
                <View style={styles.recentBox} key={index}>
                  <Image
                    source={{ uri: trip.coverImage }}
                    style={styles.img}
                    resizeMode="cover"
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ gap: 4 }}>
                      <Text style={{ fontFamily: "mon-sb" }}>
                        {trip.locationName}
                      </Text>
                      <Text style={{ fontFamily: "mon-sb" }}>
                        {trip.description}
                      </Text>

                      <Text>Depart on {trip.departureDate}</Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  startText: {
    fontFamily: "mon-sb",
    fontSize: 22,
  },
  bgc: {
    height: 250,
    resizeMode: "cover",
    justifyContent: "center",
  },

  addTripBox: {
    height: 200,
    marginHorizontal: 20,
    borderWidth: 1,
  },
  bgbox: {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    height: 300,
    gap: 10,
    width: 390,
  },
  title: {
    fontFamily: "mon-sb",
    fontSize: 22,
    marginBottom: 10,
  },

  img: {
    width: undefined,
    flex: 5,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  headerSection: {
    flexDirection: "row",
    gap: 12,
    flexShrink: 1,
  },
  updateBtn: {
    padding: 10,
    backgroundColor: "#029fdc",
    borderRadius: 8,
  },
  completedBtn: {
    padding: 10,
    backgroundColor: "#8e75a3",
    borderRadius: 8,
  },
  btnText: {
    color: "#fff",
    fontFamily: "mon-sb",
  },
  recentTripContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  recentBox: {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    height: 250,
    gap: 10,
    width: 185,
    marginRight: 10,
  },
});

export default OngoingTrips;
