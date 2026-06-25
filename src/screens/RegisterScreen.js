import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import AppButton from '../components/AppButton';
import { registerUser } from '../services/authService';

export default function RegisterScreen({ styles, onRegister, onBack }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function submit() {
    try {
      setError('');
      onRegister(await registerUser(username, password));
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <View style={[styles.screen, { justifyContent: 'center' }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Cadastro</Text>
        <Text style={styles.subtitle}>Crie um usuário local. Os dados ficam armazenados neste aparelho ou navegador.</Text>
      </View>
      <TextInput testID="register-username" style={styles.input} placeholder="Usuário" value={username} onChangeText={setUsername} autoCapitalize="none" />
      <TextInput testID="register-password" style={[styles.input, { marginTop: 10 }]} placeholder="Senha" value={password} onChangeText={setPassword} secureTextEntry />
      {!!error && <Text style={[styles.error, { marginTop: 10 }]}>{error}</Text>}
      <View style={[styles.wrapRow, { marginTop: 14 }]}>
        <AppButton label="Cadastrar" onPress={submit} styles={styles} testID="register-submit" />
        <AppButton label="Voltar" onPress={onBack} variant="secondary" styles={styles} testID="back-login" />
      </View>
    </View>
  );
}
