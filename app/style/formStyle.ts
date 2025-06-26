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
    height: 54,
    borderWidth: 1.5,
    borderColor: "#cbd5e1",
    borderRadius: 16,
    paddingHorizontal: 18,
    fontSize: 17,
    color: "#1e293b",
    backgroundColor: "#f8fafc",
    marginBottom: 14,
    boxShadow:"0px 2px 6px rgba(0,0,0,0.1)",
    elevation: 3,
    marginLeft: 2,
    marginRight: 2,
  },
  inputError: {
    borderColor: "#ef4444",
    backgroundColor: "#fef2f2",
  },
});

export default formStyle;
