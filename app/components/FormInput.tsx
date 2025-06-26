import React from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";

interface FormInputProps extends TextInputProps {
  label: string;
  required?: boolean;
  error?: boolean;
}

export default function FormInput({ label, required, error, ...props }: FormInputProps) {
  return (
    <View style={{ marginBottom: 12 }}>
      <Text>
        {label} {required && <Text style={{ color: "red" }}>*</Text>}
      </Text>
      <TextInput
        style={[
          { borderWidth: 1, borderColor: error ? "red" : "#ccc", borderRadius: 5, padding: 8 },
          props.style,
        ]}
        {...props}
      />
    </View>
  );
}