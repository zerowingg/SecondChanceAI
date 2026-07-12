import { GLOBAL } from "../theme/styles";
import React from "react";
import {
  TextInput,
  StyleSheet,
  TextInputProps,
} from "react-native";

import { COLORS } from "../theme/colors";

interface Props extends TextInputProps {
  placeholder: string;
}

export default function Input({
  placeholder,
  ...props
}: Props) {
  return (
    <TextInput
      style={[
        styles.input,
        props.multiline && styles.multiline,
      ]}
      placeholder={placeholder}
      placeholderTextColor={COLORS.subtitle}
      autoCapitalize="none"
      autoCorrect={false}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 58,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: "#ECECEC",
    color: COLORS.text,
    fontSize: 16,
    marginBottom: 18,
  },

  multiline: {
    height: 120,
    textAlignVertical: "top",
    paddingTop: 16,
  },
});