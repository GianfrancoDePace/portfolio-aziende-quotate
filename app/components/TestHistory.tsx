import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import History from "../api/GET/History";
import Azienda from "../types/Azienda";

export default function TestHistory({ aziende }: { aziende: Azienda[] }) { // TODO rinominare la funzione
  const [data, setData] = useState<Record<string, any>>({});

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {aziende.map(azienda => ( 
        <History
          key={azienda.ticker}
          ticker={azienda.ticker}
          onData={d => setData(prev => ({ ...prev, [azienda.ticker]: d }))} 
        />
      ))}
      <ScrollView>
        {aziende.map(azienda => (
          <View key={azienda.ticker} style={{ marginBottom: 24 }}>
            <Text style={{ fontWeight: "bold" }}>
              {azienda.nome} ({azienda.ticker})
            </Text>
            <Text selectable>
              {data[azienda.ticker]
                ? JSON.stringify(data[azienda.ticker], null, 2)
                : "Caricamento..."}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}