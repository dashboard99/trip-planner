import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useRef, useState } from "react";

import useBasketStore from "@/store/placeStore";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import TripSchedule from "@/components/TripSchedule";
// @ts-ignore
import DatePicker from "react-native-modern-datepicker";
import BottomSheet from "@/components/BottomSheet";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

const { width } = Dimensions.get("window");
const TripDetail = () => {
  const [active, setActive] = useState(0);
  const [toggle, setToggle] = useState(false);
  const [destination, setDestination] = useState("");
  const [remark, setRemark] = useState("");
  const [time, setTime] = useState("");
  const { trip, createTrip } = useBasketStore();
  const BottomSheetRef = useRef<BottomSheetModal>(null);
  const openModal = () => {
    BottomSheetRef.current?.present();
  };
  const addDay = () => {
    const updatedTrip = { ...trip! };
    updatedTrip.schedule!.push([]);
    createTrip(updatedTrip);
  };
  return (
    <View style={styles.container}>
      <View style={styles.dayBar}>
        {trip?.schedule?.map((item, index) => {
          const temp = trip.departureDate;
          const real = temp.split("/").join("-");

          const current = new Date(real);

          current.setDate(current.getDate() + index);
          const last = current.toISOString().substring(0, 10);
          console.log(last);
          return (
            <TouchableWithoutFeedback
              style={active === index ? styles.activeDay : null}
              key={index}
              onPress={() => setActive(index)}
            >
              <View
                style={
                  active === index
                    ? styles.activeDay
                    : { alignItems: "center", marginBottom: 9 }
                }
              >
                <Text style={styles.text}>Day {index + 1}</Text>

                <Text style={styles.subText}>{last}</Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
        <TouchableOpacity>
          <AntDesign
            name="pluscircle"
            size={26}
            color="blue"
            onPress={addDay}
          />
        </TouchableOpacity>
      </View>

      <TripSchedule trip={trip} active={active} />

      <TouchableOpacity style={styles.updateBottom} onPress={openModal}>
        <AntDesign name="pluscircle" size={50} color="#455efc" />
      </TouchableOpacity>

      <BottomSheet active={active} ref={BottomSheetRef} />
    </View>
  );
};

export default TripDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#fff",
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  dayBar: {
    flexDirection: "row",
    gap: 30,
    alignItems: "center",
    marginBottom: 30,
  },
  text: {
    fontFamily: "mon-sb",
    fontSize: 20,
    marginBottom: 6,
  },
  subText: {
    fontFamily: "mon",
    fontSize: 16,
  },
  activeDay: {
    borderBottomColor: "#000",
    borderBottomWidth: 2,
    alignItems: "center",
    paddingBottom: 8,
  },
  updateBottom: {
    position: "absolute",
    right: 40,
    bottom: 50,
  },
});
