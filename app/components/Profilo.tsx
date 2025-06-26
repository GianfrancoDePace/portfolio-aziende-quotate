import React from 'react';
import { Text, View } from 'react-native';
import profileStyle from '../style/Profilo';
import { Azienda } from '../types/Azienda';

interface ProfileComponentProps {
    userId: string;
    aziende: Azienda[];
    currentQuotes: Record<string, any>;
}

const ProfileComponent: React.FC<ProfileComponentProps> = ({ userId, aziende, currentQuotes }) => {
    //Calcola il saldo 
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
            <Text style={profileStyle.mainTitle}>Gestisci i tuoi investimenti</Text>
            <Text style={profileStyle.profileTitle}>Portfolio Overview</Text>
            <View style={profileStyle.userInfo}>
                <Text style={profileStyle.userInfoText}>**ID Utente:** {userId}</Text>
                <Text style={profileStyle.userInfoText}>
                    **Valore Portfolio:** <Text style={profileStyle.balanceText}>{portfolioBalance.toFixed(2)} $</Text>
                </Text>
                    </View> 
        </View>
    );
};



export default ProfileComponent;