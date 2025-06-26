import React from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";
import formStyle from "../style/formStyle";
interface FormInputProps extends TextInputProps {
  label: string;
  required?: boolean;
  error?: boolean;
}

export default function FormInput({ label, required, error, ...props }: FormInputProps) {
  return (
    <View style={formStyle.container}>
      <Text style={formStyle.label}>
        {label} {required && <Text style={formStyle.required}>*</Text>}
      </Text>
      <TextInput
        style={[
          formStyle.input,
          error && formStyle.inputError,
          props.style,
        ]}
        placeholderTextColor="#9CA3AF"
        {...props}
      />
    </View>
  );
}
