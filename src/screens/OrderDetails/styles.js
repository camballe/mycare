import { StyleSheet } from "react-native";

export default StyleSheet.create({
  page: {
    flex: 1,
  },
  iconContainer: {
    position: "absolute",
    top: 40,
    left: 10,
    backgroundColor: "#0474ed",
    borderRadius: 30,
    padding: 5,
  },
  image: {
    width: "100%",
    aspectRatio: 5 / 3,
  },
  title: {
    fontSize: 35,
    fontWeight: "600",
    marginVertical: 10,
  },
  productsTitle: {
    marginTop: 20,
    fontSize: 18,
    letterSpacing: 0.7,
  },
  subtitle: {
    color: "#525252",
    fontSize: 15,
  },
  container: {
    margin: 10,
  },
});
