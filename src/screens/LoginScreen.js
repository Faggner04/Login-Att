import React, { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import AppButton from '../components/AppButton';
import { loginUser } from '../services/authService';

export default function LoginScreen({ styles, onLogin, onRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function submit() {
    try {
      setError('');
      onLogin(await loginUser(username, password));
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <View style={[styles.screen, { justifyContent: 'center' }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Agenda de Tarefas</Text>
        <Text style={styles.subtitle}>Entre para ver seu calendário, compromissos e tarefas salvas.</Text>
      </View>
      <TextInput testID="login-username" style={styles.input} placeholder="Usuário" value={username} onChangeText={setUsername} autoCapitalize="none" />
      <TextInput testID="login-password" style={[styles.input, { marginTop: 10 }]} placeholder="Senha" value={password} onChangeText={setPassword} secureTextEntry />
      {!!error && <Text style={[styles.error, { marginTop: 10 }]}>{error}</Text>}
      <View style={{ marginTop: 14 }}>
        <AppButton label="Entrar" onPress={submit} styles={styles} testID="login-submit" />
      </View>
      <Pressable testID="go-register" onPress={onRegister} style={{ marginTop: 16 }}>
        <Text style={styles.ghostText}>Criar novo usuário</Text>
      </Pressable>
    </View>
  );
}
