import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Alert, KeyboardAvoidingView, Platform, ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';

const API_URL = 'http://10.125.214.183:3000';

export default function LoginScreen() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
  if (!usuario || !senha) {
    Alert.alert('Atenção', 'Preencha todos os campos!');
    return;
  }

  setCarregando(true);
  try {
    const url = `${API_URL}/usuarios?nome=${usuario}&senha=${senha}`;
    console.log('🔍 Buscando:', url); // ← vai aparecer no terminal do Expo

    const resposta = await fetch(url);
    console.log('📡 Status:', resposta.status);

    const dados = await resposta.json();
    console.log('📦 Dados recebidos:', JSON.stringify(dados));

    if (dados.length > 0) {
      router.push({
        pathname: '/home',
        params: { nome: dados[0].nome, usuarioId: dados[0].id },
      });
    } else {
      Alert.alert('Erro', 'Usuário ou senha incorretos!');
    }
  } catch (erro) {
    console.log('❌ Erro:', erro); // ← mostra o erro real
    Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
  } finally {
    setCarregando(false);
  }
};

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.card}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>🔐</Text>
        </View>
        <Text style={styles.titulo}>Bem-vindo!</Text>
        <Text style={styles.subtitulo}>Faça login para continuar</Text>

        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Usuário</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu usuário"
            placeholderTextColor="#aaa"
            value={usuario}
            onChangeText={setUsuario}
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Senha</Text>
          <View style={styles.senhaContainer}>
            <TextInput
              style={styles.inputSenha}
              placeholder="Digite sua senha"
              placeholderTextColor="#aaa"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry={!senhaVisivel}
            />
            <TouchableOpacity
              onPress={() => setSenhaVisivel(!senhaVisivel)}
              style={styles.olhoBtn}
            >
              <Text style={styles.olhoIcon}>{senhaVisivel ? '🙈' : '👁️'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={styles.botao}
          onPress={handleLogin}
          disabled={carregando}
        >
          {carregando
            ? <ActivityIndicator color="#fff" />
            : <Text style={styles.botaoTexto}>Entrar</Text>
          }
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center', padding: 24 },
  card: { width: '100%', backgroundColor: '#fff', borderRadius: 8, padding: 24, borderWidth: 1, borderColor: '#ccc' },
  iconContainer: { alignItems: 'center', marginBottom: 10 },
  icon: { fontSize: 32 },
  titulo: { fontSize: 20, fontWeight: 'bold', color: '#333', textAlign: 'center' },
  subtitulo: { color: '#888', textAlign: 'center', marginBottom: 20, fontSize: 13 },
  inputWrapper: { marginBottom: 14 },
  label: { color: '#555', marginBottom: 4, fontSize: 13 },
  input: { backgroundColor: '#fff', color: '#333', borderRadius: 4, paddingHorizontal: 12, paddingVertical: 10, fontSize: 14, borderWidth: 1, borderColor: '#bbb' },
  senhaContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 4, borderWidth: 1, borderColor: '#bbb' },
  inputSenha: { flex: 1, color: '#333', paddingHorizontal: 12, paddingVertical: 10, fontSize: 14 },
  olhoBtn: { padding: 8 },
  olhoIcon: { fontSize: 16 },
  botao: { backgroundColor: '#4a90d9', borderRadius: 4, paddingVertical: 12, alignItems: 'center', marginTop: 10 },
  botaoTexto: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
});