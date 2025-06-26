import { StyleSheet } from "react-native";

const profileStyle = StyleSheet.create({
  profileContainer: {
    marginHorizontal: 20,
    marginVertical: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  profileTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    color: "white",
    textAlign: "center",
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  userInfo: {
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  userInfoText: {
    fontSize: 16,
    marginBottom: 5,
    color: "#white",
  },
  balanceText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#28a745",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#white",
    textAlign: "center",
  },
});

export default profileStyle;
