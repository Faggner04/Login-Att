import React from 'react';
import { Text, View } from 'react-native';
import AppButton from '../components/AppButton';

export default function SettingsScreen({ styles, user, settings, onThemeChange, onBack, onLogout }) {
  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.title}>Configurações</Text>
        <Text style={styles.subtitle}>Usuário conectado: {user?.username}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.taskTitle}>Tema</Text>
        <View style={styles.wrapRow}>
          <AppButton label={settings.theme === 'light' ? 'Claro ativo' : 'Modo claro'} onPress={() => onThemeChange('light')} variant={settings.theme === 'light' ? 'primary' : 'secondary'} styles={styles} testID="theme-light" />
          <AppButton label={settings.theme === 'dark' ? 'Escuro ativo' : 'Modo escuro'} onPress={() => onThemeChange('dark')} variant={settings.theme === 'dark' ? 'primary' : 'secondary'} styles={styles} testID="theme-dark" />
        </View>
      </View>
      <View style={styles.wrapRow}>
        <AppButton label="Voltar" onPress={onBack} variant="secondary" styles={styles} testID="settings-back" />
        <AppButton label="Sair" onPress={onLogout} variant="secondary" styles={styles} testID="settings-logout" />
      </View>
    </View>
  );
}
