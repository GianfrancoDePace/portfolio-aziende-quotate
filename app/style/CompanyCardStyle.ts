import { StyleSheet } from "react-native";

const companyCardStyles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginHorizontal: 12,
    marginVertical: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  nome: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 6,
  },
  ticker: {
    fontSize: 15,
    color: "#007bff",
    fontWeight: "bold",
  },
  description: {
    color: "#666",
    marginTop: 2,
    marginBottom: 6,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 2,
    marginBottom: 2,
  },
  utili: {
    fontWeight: "500",
    marginRight: 12,
  },
  profitStatus: {
    fontWeight: "bold",
    fontSize: 13,
  },
  cardActions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    gap: 8,
  },
  profitButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    alignSelf: "flex-start",
    marginRight: 10,
  },
  profitButtonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  deleteButton: {
    padding: 8,
  },
  deleteIcon: {
    fontSize: 22,
  },
  detail: {
    color: "#333",
    fontSize: 14,
    marginRight: 12,
  },

  variazionePositiva: {
    color: "#10B981",
    fontWeight: "bold",
    marginLeft: 8,
  },
  variazioneNegativa: {
    color: "#EF4444",
    fontWeight: "bold",
    marginLeft: 8,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 110,
    marginBottom: 2,
  },
});

export default companyCardStyles;