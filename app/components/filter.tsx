import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

interface FilterProps {
  value: string;
  onChange: (text: string) => void;
}

export default function Filter({ value, onChange }: FilterProps) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Filtra per nome azienda..."
        value={value}
        onChangeText={onChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#f9f9f9",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
});