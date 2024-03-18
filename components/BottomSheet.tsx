import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { forwardRef, useCallback, useMemo, useState } from "react";
import useBasketStore from "@/store/placeStore";
// @ts-ignore
import DatePicker from "react-native-modern-datepicker";
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";

interface Props {
  active: number;
}
export type Ref = BottomSheetModal;

const BottomSheet = forwardRef<BottomSheetModal, Props>(({ active }, ref) => {
  const { trip, createTrip } = useBasketStore();
  const snapPoint = useMemo(() => ["65%"], []);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const renderBackDrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    []
  );
  console.log(title, description, time);
  const { dismiss } = useBottomSheetModal();
  const submit = (time: string) => {
    console.log(title, description, time);
    if (title.length < 3) {
      alert("please enter a place name");
      return;
    }

    const updatedTrip = { ...trip! };

    updatedTrip?.schedule![active].push({
      time,
      description,
      title,
    });

    createTrip(updatedTrip);

    setTitle("");
    setDescription("");
    setTime("");
    dismiss();
  };

  return (
    <BottomSheetModal
      snapPoints={snapPoint}
      ref={ref}
      overDragResistanceFactor={0}
      backdropComponent={renderBackDrop}
      handleIndicatorStyle={{ display: "none" }}
    >
      <View style={styles.updateContainer}>
        <TextInput
          placeholder="Destination"
          onChangeText={setTitle}
          style={styles.input}
        />
        <TextInput
          placeholder="remark"
          onChangeText={setDescription}
          style={styles.input}
        />
        <DatePicker
          mode="time"
          options={{
            defaultFont: "mon",
            mainColor: "#fcb045",
            borderColor: "rgba(122, 146, 165, 0.1)",
          }}
          onTimeChange={(selectedTime: string) => submit(selectedTime)}
        />
      </View>
    </BottomSheetModal>
  );
});

export default BottomSheet;

const styles = StyleSheet.create({
  updateContainer: {
    justifyContent: "center",
    alignItems: "center",

    gap: 10,
  },
  input: {
    color: "#000",
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: "100%",
    padding: 12,
  },
  btn: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 0,
    marginTop: 20,
    backgroundColor: "#45aefc",
  },
});
