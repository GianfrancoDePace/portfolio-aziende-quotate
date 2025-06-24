import React from "react";
import { TextInput, View } from "react-native";
import filterStyles from "../style/FilterStyle";
interface FilterProps {
  value: string;
  onChange: (text: string) => void;
}

export default function Filter({ value, onChange }: FilterProps) {
  return (
    <View style={filterStyles.container}>
      <TextInput
        style={filterStyles.input}
        placeholder="Filtra per nome azienda..."
        value={value}
        onChangeText={onChange}
      />
    </View>
  );
}

