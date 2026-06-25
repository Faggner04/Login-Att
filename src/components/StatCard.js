import React from 'react';
import { Text, View } from 'react-native';

export default function StatCard({ label, value, styles }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statNumber}>{value}</Text>
      <Text style={styles.smallText}>{label}</Text>
    </View>
  );
}
