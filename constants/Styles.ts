import { StyleSheet } from "react-native";

export const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  bgcImg: {
    resizeMode: "cover",
    justifyContent: "center",
    height: 300,
    position: "relative",
  },
  footer: {
    position: "absolute",
    height: 100,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    padding: 20,
    borderTopColor: "#333",
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  btn: {
    backgroundColor: "#11a6da",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  btnText: {
    fontFamily: "mon-b",
    fontSize: 16,
    color: "#fff",
  },
});
