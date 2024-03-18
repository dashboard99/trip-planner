// @ts-nocheck
import { View, Text, ScrollView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import useBasketStore from "@/store/placeStore";
import Timeline from "react-native-timeline-flatlist";

interface Props {
  active: number;
  trip: any;
}

const TripSchedule = ({ trip, active }: Props) => {
  // const { trip } = useBasketStore();
  const [data, setData] = useState(trip?.schedule![active]);
  useEffect(() => {
    const time = new Date();
    const now = time.getHours();

    const temp = trip?.schedule![active].map((item) => {
      if (
        item.time.substring(0, 2) == now ||
        item.time.substring(0, 2) == now - 1
      )
        return { ...item, circleColor: "orange", lineColor: "orange" };

      return { ...item, circleColor: "#ddd", lineColor: "#ddd" };
    });

    setData(temp);
  }, [trip, active]);

  return (
    <View style={styles.container}>
      <Timeline
        data={data}
        style={styles.list}
        options={{ removeClippedSubviews: false }}
        isUsingFlatlist={true}
        timeStyle={{
          fontFamily: "mon-sb",
          fontSize: 15,
          marginRight: 8,
        }}
        timeContainerStyle={{
          minWidth: 52,
          marginRight: -7,
        }}
        circleSize={20}
        detailContainerStyle={{ paddingTop: 0 }}
      />
    </View>
  );
};

export default TripSchedule;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "white",
  },
  list: {
    flex: 1,
    marginTop: 10,
  },
});
