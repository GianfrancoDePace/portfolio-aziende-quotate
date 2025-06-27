import { Stack, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import History from "../api/GET/Storico";
import modalStyles from "../style/ModalStyle";

// Importa i nuovi componenti grafico
import DailyCloseChart from "../components/Charts/DailyCloseChart";
import DailyPercentageChangeChart from "../components/Charts/DailyPercentageChangeChart";
import MonthlyCloseChart from "../components/Charts/MonthlyCloseChart";

export default function CompanyDetails() {
  const params = useLocalSearchParams();
  const azienda = params.azienda ? JSON.parse(params.azienda as string) : null;
  const quotes = params.quotes ? JSON.parse(params.quotes as string) : {};
  const [historyData, setHistoryData] = useState<any>(null); // historyData sarà passato ai componenti figlio

  const isLoading = !historyData;

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Stack.Screen options={{ title: `${azienda.nome}` }} />
      <Text style={modalStyles.modalTitle}>Dettagli azienda</Text>
      <Text style={{ fontWeight: "bold", fontSize: 20, marginBottom: 4 }}>
        {azienda.nome} ({azienda.ticker})
      </Text>
      <Text>
        Azioni possedute:{" "}
        <Text style={{ fontWeight: "bold" }}>{azienda.azioniPossedute ?? "-"}</Text>
      </Text>
      <Text>
        Prezzo attuale:{" "}
        {quotes && quotes[azienda.ticker]?.c
          ? `${quotes[azienda.ticker].c.toFixed(2)} $`
          : "-"}
      </Text>
      <Text style={{ marginBottom: 16 }}>
        Stato: {azienda.isProfitable ? "Profittevole 📈" : "In perdita 📉"}
      </Text>

      {/* Il componente History per recuperare i dati */}
      <History ticker={azienda.ticker} onData={setHistoryData} />

      {isLoading ? (
        <View style={{ marginVertical: 24, alignItems: "center" }}>
          <ActivityIndicator size="large" color="blue" />
          <Text style={{ marginTop: 8 }}>Caricamento grafici...</Text>
        </View>
      ) : (
        <>
          {/* Renderizza i componenti grafici specifici, passando solo historyData */}
          <DailyCloseChart historyData={historyData} days={30} />
          <MonthlyCloseChart historyData={historyData} months={12} />
          <DailyPercentageChangeChart historyData={historyData} days={30} />
        </>
      )}
    </ScrollView>
  );
}