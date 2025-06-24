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
  
  // Header section with company name and ticker
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 8,
  },      
  nome: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    flex: 1, // Takes available space
  },
  ticker: {
    fontSize: 14,
    color: "#007bff",
    fontWeight: "bold",
    backgroundColor: "#f0f8ff",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginLeft: 8,
  },
  
  // Description
  description: {
    color: "#666",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  
  // Data rows for price, profits, etc.
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
    paddingVertical: 2,
  },
  
  // Info row for specific data pairs
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
    paddingVertical: 2,
  },
  
  // Text styles
  detail: {
    color: "#333",
    fontSize: 14,
    fontWeight: "500",
  },
  utili: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  profitStatus: {
    fontWeight: "bold",
    fontSize: 14,
  },
  
  // Price variation styles
  variazionePositiva: {
    color: "#10B981",
    fontWeight: "bold",
    fontSize: 14,
  },
  variazioneNegativa: {
    color: "#EF4444",
    fontWeight: "bold", 
    fontSize: 14,
  },
  
  // Actions section
  cardActions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  
  // Profit toggle button
  profitButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
    marginRight: 12,
    alignItems: "center",
  },
  profitButtonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  
  // Delete button
  deleteButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#fee2e2",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 40,
    minHeight: 40,
  },
  deleteIcon: {
    fontSize: 20,
    color: "#EF4444",
  },
  
  // Additional utility styles
  leftContent: {
    flex: 1,
    alignItems: "flex-start",
  },
  rightContent: {
    alignItems: "flex-end",
  },
  centerContent: {
    alignItems: "center",
  },
});

export default companyCardStyles;