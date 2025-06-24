import React from "react";
import { TextInput, View } from "react-native";
import mainStyles from "../style/MainStyle";
import addNewCompanyStyles from "../style/NewCompanyStyle";

interface FilterProps {
  value: string;
  onChange: (text: string) => void;
}

export default function Filter({ value, onChange }: FilterProps) {
  return (
    <View style={mainStyles.container}>
      <TextInput
        style={addNewCompanyStyles.input}
        placeholder="Filtra per nome azienda..."
        value={value}
        onChangeText={onChange}
      />
    </View>
  );
}

