import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import companyCardStyles from "../style/CompanyCardStyle";
import mainStyles from "../style/MainStyle";
import { Azienda } from "../types/Azienda";

interface CompanyCardProps {
    azienda: Azienda;
    prezzoApi?: number;
    variazioneApi?: number;
    onPress: () => void;
    onToggleProfitability: () => void;
    onDelete: () => void;
    onBuyShares: (ticker: string, quantity: number) => void;
    onSellShares: (ticker: string, quantity: number) => void;
}

const CompanyCard: React.FC<CompanyCardProps> = ({
    azienda,
    prezzoApi,
    variazioneApi,
    onPress,
    onToggleProfitability,
    onDelete,
    onBuyShares,
    onSellShares,
}) => (
    <TouchableOpacity onPress={onPress} style={companyCardStyles.card}>
        <View style={{ flex: 1 }}>
            <View style={companyCardStyles.cardHeader}>
                <Text style={companyCardStyles.nome}>{azienda.nome}</Text>
                <Text style={companyCardStyles.ticker}>({azienda.ticker})</Text>
            </View>
            <Text style={companyCardStyles.description}>{azienda.settore}</Text>
            <View style={companyCardStyles.cardRow}>
                <Text style={companyCardStyles.detail}>
                    Azioni: <Text style={mainStyles.bold}>{azienda.azioniPossedute ?? '-'}</Text>
                </Text>
                <View style={{ flexDirection: "column", alignItems: "flex-end", minWidth: 90 }}>
                    <Text style={companyCardStyles.detail}>
                        Prezzo:{" "}
                        <Text style={mainStyles.bold}>
                            {prezzoApi?.toFixed(2) !== undefined
                                ? `${prezzoApi.toFixed(2)} `
                                : azienda.prezzo?.toFixed(2) !== undefined
                                    ? azienda.prezzo?.toFixed(2)
                                    : "-"} $
                        </Text>
                    </Text>
                    {typeof variazioneApi === "number" && (
                        <Text style={companyCardStyles.detail}>
                            Variazione:{" "}
                            <Text style={variazioneApi >= 0 ? companyCardStyles.variazionePositiva : companyCardStyles.variazioneNegativa}>
                                {variazioneApi >= 0 ? `+${variazioneApi.toFixed(2)}` : `${variazioneApi.toFixed(2)}`}%
                            </Text>
                        </Text>
                    )}
                </View>
            </View>
            <View style={companyCardStyles.cardRow}>
                <Text style={[companyCardStyles.profitStatus, { color: azienda.isProfitable ? "#4CAF50" : "#f44336" }]}>
                    {azienda.isProfitable ? "📈" : "📉"}
                </Text>
            </View>
            <View style={companyCardStyles.cardActions}>
                <TouchableOpacity
                    style={[
                        companyCardStyles.profitButton,
                        { backgroundColor: azienda.isProfitable ? '#4CAF50' : '#f44336', alignItems: "center", justifyContent: "center", minWidth: 120 }
                    ]}
                    onPress={onToggleProfitability}
                    activeOpacity={0.8}
                >
                    <Text style={companyCardStyles.profitButtonText} numberOfLines={1} ellipsizeMode="tail">
                        {azienda.isProfitable ? "Segna in perdita" : "Segna profittevole"}
                    </Text>
                </TouchableOpacity>

                {/* Buy and Sell Buttons */}
                <TouchableOpacity
                    style={[companyCardStyles.buyButton, { alignItems: "center", justifyContent: "center", minWidth: 60, marginLeft: 8 }]}
                    onPress={() => onBuyShares(azienda.ticker, 1)} 
                    activeOpacity={0.8}
                >
                    <Text style={companyCardStyles.buyButtonText}>Compralo</Text>
                </TouchableOpacity>
                {azienda.azioniPossedute && azienda.azioniPossedute > 0 && (
                    <TouchableOpacity
                        style={[companyCardStyles.sellButton, { alignItems: "center", justifyContent: "center", minWidth: 60, marginLeft: 8 }]}
                        onPress={() => onSellShares(azienda.ticker, 1)}
                        activeOpacity={0.8}
                    >
                        <Text style={companyCardStyles.sellButtonText}>Vendi</Text>
                    </TouchableOpacity>
                )}
                <TouchableOpacity
                    style={[companyCardStyles.deleteButton, { alignItems: "center", justifyContent: "center", minWidth: 48, marginLeft: 8 }]}
                    onPress={onDelete}
                    activeOpacity={0.8}
                >
                    <Text style={companyCardStyles.deleteIcon}>🗑️</Text>
                </TouchableOpacity>
            </View>
        </View>
    </TouchableOpacity>
);

export default CompanyCard;