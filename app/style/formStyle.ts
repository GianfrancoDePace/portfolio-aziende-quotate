import { StyleSheet } from "react-native";

const formStyle = StyleSheet.create({
  container: {
    marginBottom: 24,
    width: "100%",
    maxWidth: 420,
    alignSelf: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 8,
    marginLeft: 2,
    letterSpacing: 0.2,
  },
  required: {
    color: "#ef4444",
    fontWeight: "bold",
  },
  input: {
    // backgroundColor: "#ffb703", // arancione acceso temporaneo
    height: 54,
    borderWidth: 1.5,
    borderColor: "#cbd5e1",
    borderRadius: 16,
    paddingHorizontal: 18,
    fontSize: 17,
    color: "#1e293b",
    backgroundColor: "#f8fafc",
    marginBottom: 14,
    shadowColor: "#2563eb",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 6,
    elevation: 3,
  },
  inputError: {
    borderColor: "#ef4444",
    backgroundColor: "#fef2f2",
  }
});

export default formStyle;