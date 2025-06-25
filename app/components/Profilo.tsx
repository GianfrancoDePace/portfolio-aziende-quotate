// components/ProfileComponent.tsx
import React from 'react';
import { FlatList, Text, View } from 'react-native';
import profileStyle from '../style/Profile';
import { Azienda } from '../types/Azienda';

interface ProfileComponentProps {
    userId: string;
    aziende: Azienda[];
    currentQuotes: Record<string, any>;
}

const ProfileComponent: React.FC<ProfileComponentProps> = ({ userId, aziende, currentQuotes }) => {

    const getCompanyCategories = () => {
        const categories: { [key: string]: number } = {};

        aziende.forEach(azienda => {
            const category = azienda.sector || 'Uncategorized'; // Use 'category' field or default
            categories[category] = (categories[category] || 0) + 1;
        });

        return Object.keys(categories).map(category => ({
            name: category,
            count: categories[category],
        }));
    };

    const companyCategories = getCompanyCategories();

    // Function to calculate total portfolio balance
    const calculatePortfolioBalance = () => {
        let totalBalance = 0;
        aziende.forEach(azienda => {
            const currentPrice = currentQuotes[azienda.ticker]?.c || azienda.prezzo || 0; // Use API price, then stored price, else 0
            const ownedShares = azienda.azioniPossedute || 0;
            totalBalance += currentPrice * ownedShares;
        });
        return totalBalance;
    };

    const portfolioBalance = calculatePortfolioBalance();

    return (
        <View style={profileStyle.profileContainer}>
            <Text style={profileStyle.profileTitle}>Profilo Utente</Text>
            <View style={profileStyle.userInfo}>
                <Text style={profileStyle.userInfoText}>**ID Utente:** {userId}</Text>
                <Text style={profileStyle.userInfoText}>
                    **Saldo Portfolio:** <Text style={profileStyle.balanceText}>{portfolioBalance.toFixed(2)} $</Text>
                </Text>
            </View>

            <View style={profileStyle.categorySection}>
                <Text style={profileStyle.sectionTitle}>Aziende per Categoria</Text>
                {companyCategories.length > 0 ? (
                    <FlatList
                        data={companyCategories}
                        keyExtractor={(item) => item.name}
                        renderItem={({ item }) => (
                            <View style={profileStyle.categoryItem}>
                                <Text style={profileStyle.categoryName}>{item.name}</Text>
                                <Text style={profileStyle.categoryCount}>({item.count} aziende)</Text>
                            </View>
                        )}
                        ListEmptyComponent={<Text style={profileStyle.noCategoriesText}>Nessuna categoria trovata.</Text>}
                    />
                ) : (
                    <Text style={profileStyle.noCategoriesText}>Aggiungi aziende per vedere le loro categorie!</Text>
                )}
            </View>
        </View>
    );
};



export default ProfileComponent;