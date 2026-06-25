import React from 'react';
import { Pressable, Text } from 'react-native';

export default function AppButton({ label, onPress, variant = 'primary', testID, styles }) {
  return (
    <Pressable
      testID={testID}
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [variant === 'primary' ? styles.button : styles.ghostButton, pressed && { opacity: 0.75 }]}
    >
      <Text style={variant === 'primary' ? styles.buttonText : styles.ghostText}>{label}</Text>
    </Pressable>
  );
}
