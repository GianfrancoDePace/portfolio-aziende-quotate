import { StyleSheet } from "react-native";

const addNewCompanyStyles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 40,
    width: "100%",
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    paddingTop: 32,
    paddingHorizontal: 8,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
    width: "100%",
  },
  headerIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#F0F9FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  iconText: {
    fontSize: 28,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 22,
  },
  textArea: {
    minHeight: 80,
    paddingTop: 16,
    textAlignVertical: "top",
  },
  buttonContainer: {
    width: "100%",
    paddingHorizontal: 0,
    paddingTop: 32,
    gap: 12,
    alignItems: "center",
  },
  primaryButton: {
    backgroundColor: "#3B82F6",
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "#3B82F6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
    width: "90%",
    maxWidth: 340,
    alignSelf: "center",
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
  secondaryButton: {
    backgroundColor: "transparent",
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#E5E7EB",
    width: "90%",
    maxWidth: 340,
    alignSelf: "center",
  },
  secondaryButtonText: {
    color: "#6B7280",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default addNewCompanyStyles;