import { Stack, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text } from "react-native";
import History from "../api/GET/History";
import GraphedData from "../components/Graph";
import modalStyles from "../style/ModalStyle";

function getMonthlyFirstClose(historyData: any) {
    if (
        !historyData ||
        !historyData["Time Series (Daily)"] ||
        typeof historyData["Time Series (Daily)"] !== "object"
    ) return { data: [], xLabels: [] };

    const daily = historyData["Time Series (Daily)"];
    const dates = Object.keys(daily).sort(); // dal più vecchio al più recente
    const months: Record<string, { date: string; close: number }> = {};

    dates.forEach(date => {
        const [year, month] = date.split("-"); // "2025-06-01" -> ["2025","06","01"]
        const key = `${year}-${month}`;
        if (!months[key]) {
            months[key] = { date, close: Number(daily[date]["4. close"]) };
        }
    });

    // Prendi solo gli ultimi 12 mesi
    const last12 = Object.values(months).slice(-12);

    return {
        data: last12.map(item => ({ value: item.close })),
        xLabels: last12.map(item => {
            const d = new Date(item.date);
            return `${d.getMonth() + 1}/${d.getFullYear().toString().slice(-2)}`; // es: 6/25
        }),
    };
}

export default function CompanyDetails({ route }: any) {
    const params = useLocalSearchParams();
    const azienda = params.azienda ? JSON.parse(params.azienda as string) : null;
    const [historyData, setHistoryData] = useState<any>(null);

    // Dati annuali per il secondo grafico
    const monthly = getMonthlyFirstClose(historyData);

    return (
        <ScrollView contentContainerStyle={{ padding: 16 }}>
            <Stack.Screen options={{ title: `${azienda.nome}` }} />
            <Text style={modalStyles.modalTitle}>Dettagli azienda</Text>
            <Text style={{ fontWeight: "bold", fontSize: 20, marginBottom: 4 }}>
                {azienda.nome} ({azienda.ticker})
            </Text>
            <Text style={{ marginBottom: 8 }}>{azienda.description}</Text>
            <Text>Azioni possedute: <Text style={{ fontWeight: "bold" }}>{azienda.azioniPossedute ?? '-'}</Text></Text>
            <Text>Prezzo di acquisto: {azienda.prezzo ? `${azienda.prezzo} $` : '-'}</Text>
            <Text style={{ marginBottom: 16 }}>
                Stato: {azienda.isProfitable ? "Profittevole 📈" : "In perdita 📉"}
            </Text>

            <Text style={modalStyles.modalTitle}>Storico azioni mensile</Text>
            <History
                ticker={azienda.ticker}
                onData={setHistoryData}
            />
            {historyData && <GraphedData historyData={historyData} days={30} />}

            <Text style={modalStyles.modalTitle}>Andamento annuale (primo close del mese)</Text>
            {historyData && (
                <GraphedData
                    historyData={{
                        "Time Series (Daily)": {}, // non usato
                        data: monthly.data,
                        xLabels: monthly.xLabels,
                    }}
                    days={12}
                    customData={monthly.data}
                    customLabels={monthly.xLabels}
                />
            )}
        </ScrollView>
    );
}