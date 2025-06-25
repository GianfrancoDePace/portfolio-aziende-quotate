import { StyleSheet } from "react-native";

const profileStyle = StyleSheet.create ({
profileContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        margin: 10,
        boxShadow: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginBottom: 20,
    },
    profileTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#333',
        textAlign: 'center',
    },
    userInfo: {
        marginBottom: 20,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    userInfoText: {
        fontSize: 16,
        marginBottom: 5,
        color: '#555',
    },
    balanceText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#28a745', 
    },
    categorySection: {
        marginTop: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    categoryItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    categoryName: {
        fontSize: 16,
        color: '#555',
        flex: 1,
    },
    categoryCount: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#777',
    },
    noCategoriesText: {
        fontSize: 16,
        color: '#888',
        textAlign: 'center',
        paddingVertical: 20,
    },
});
export default profileStyle;