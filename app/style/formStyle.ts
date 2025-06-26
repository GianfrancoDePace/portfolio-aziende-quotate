import { StyleSheet } from "react-native";

const formStyle = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: "100%",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 6,
  },
  required: {
    color: "#EF4444",
    fontWeight: "bold",
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    paddingHorizontal: 14,
    marginHorizontal:4,
    fontSize: 16,
    color: "#1F2937",
    backgroundColor: "#FAFAFA",
  },
  inputError: {
    borderColor: "#EF4444",
    backgroundColor: "#FEF2F2",
  }
});
export default formStyle; 