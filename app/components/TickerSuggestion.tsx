import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Symbol } from "../api/GET/Symbols";

interface TickerSuggestionsProps {
  suggestions: Symbol[];
  onSelect: (symbol: Symbol) => void;
}

export default function TickerSuggestions({ suggestions, onSelect }: TickerSuggestionsProps) {
  if (suggestions.length === 0) return null;
  return (
    <View style={{ backgroundColor: "#f1f5f9", borderRadius: 6, marginTop: 2, padding: 4 }}>
      {suggestions.map(s => (
        <TouchableOpacity
          key={s.symbol}
          onPress={() => onSelect(s)}
          style={{ paddingVertical: 4, paddingHorizontal: 8 }}
        >
          <Text style={{ color: "#2563eb", fontWeight: "bold" }}>
            {s.symbol} <Text style={{ color: "#64748b", fontWeight: "normal" }}>{s.description}</Text>
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}