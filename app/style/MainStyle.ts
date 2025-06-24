import { StyleSheet } from "react-native";

const mainStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  flatList: {
    flex: 1,
    width: "100%",
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  addButton: {
    backgroundColor: "#007bff",
    padding: 14,
    borderRadius: 8,
    margin: 12,
    alignItems: "center",
    elevation: 2,
  },
  addButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  userIdBox: {
    padding: 10,
    backgroundColor: "#e3e9f7",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 0,
    borderRadius: 8,
    marginHorizontal: 12,
  },
  userIdText: {
    fontWeight: "bold",
    color: "#2d3a5a",
    fontSize: 15,
  },
    bold: {
    fontWeight: "bold",
  },
});

export default mainStyles;