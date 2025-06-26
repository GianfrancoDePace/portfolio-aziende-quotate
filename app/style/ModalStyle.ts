import { StyleSheet } from "react-native";

const modalStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    padding: 32,
    borderRadius: 16,
    minWidth: 320,
    maxWidth: 400,
    width: "90%",
    alignItems: "center",
    boxShadow: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 25,
    maxHeight: "80%",
  },
  modalTitle: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 12,
    textAlign: "center",
  },
  modalSection: {
    marginBottom: 10,
    alignItems: "center",
    width: "100%"
  },
  closeButton: {
    marginTop: 16,
    backgroundColor: "red",
    padding: 12,
    borderRadius: 8,
    alignSelf: "center",
    minWidth: 100,
    alignItems: "center",
  },
});

export default modalStyles;