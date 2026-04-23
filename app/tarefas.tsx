import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, FlatList,
  StyleSheet, Alert, ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

const API_URL = 'http://10.125.214.183:3000';

type Tarefa = {
  id: number;
  usuarioId: number;
  titulo: string;
  descricao: string;
  concluida: boolean;
};

export default function TarefasScreen() {
  const { usuarioId } = useLocalSearchParams<{ usuarioId: string }>();
  const router = useRouter();

  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [novoTitulo, setNovoTitulo] = useState('');
  const [novaDescricao, setNovaDescricao] = useState('');
  const [carregando, setCarregando] = useState(true);

  const buscarTarefas = async () => {
    try {
      const resposta = await fetch(`${API_URL}/tarefas?usuarioId=${usuarioId}`);
      const dados: Tarefa[] = await resposta.json();
      setTarefas(dados);
    } catch {
      Alert.alert('Erro', 'Não foi possível carregar as tarefas.');
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    buscarTarefas();
  }, []);

  const criarTarefa = async () => {
    if (!novoTitulo.trim()) {
      Alert.alert('Atenção', 'Digite um título para a tarefa!');
      return;
    }
    try {
      const resposta = await fetch(`${API_URL}/tarefas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usuarioId: Number(usuarioId),
          titulo: novoTitulo,
          descricao: novaDescricao,
          concluida: false,
        }),
      });
      const novaTarefa: Tarefa = await resposta.json();
      setTarefas(prev => [...prev, novaTarefa]);
      setNovoTitulo('');
      setNovaDescricao('');
    } catch {
      Alert.alert('Erro', 'Não foi possível criar a tarefa.');
    }
  };

  const alternarConclusao = async (tarefa: Tarefa) => {
    try {
      const resposta = await fetch(`${API_URL}/tarefas/${tarefa.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ concluida: !tarefa.concluida }),
      });
      const atualizada: Tarefa = await resposta.json();
      setTarefas(prev => prev.map(t => (t.id === atualizada.id ? atualizada : t)));
    } catch {
      Alert.alert('Erro', 'Não foi possível atualizar a tarefa.');
    }
  };

  const deletarTarefa = async (id: number) => {
    try {
      await fetch(`${API_URL}/tarefas/${id}`, {
        method: 'DELETE',
      });
      setTarefas(prev => prev.filter(t => t.id !== id));
    } catch {
      Alert.alert('Erro', 'Não foi possível deletar a tarefa.');
    }
  };

  const renderTarefa = ({ item }: { item: Tarefa }) => (
    <View style={[styles.tarefaCard, item.concluida && styles.tarefaConcluida]}>
      <TouchableOpacity onPress={() => alternarConclusao(item)} style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
        <Text style={styles.tarefaCheck}>{item.concluida ? '✅' : '⬜'}</Text>
        <View style={{ flex: 1 }}>
          <Text style={[styles.tarefaTitulo, item.concluida && styles.textoRiscado]}>
            {item.titulo}
          </Text>
          {item.descricao ? (
            <Text style={styles.tarefaDescricao}>{item.descricao}</Text>
          ) : null}
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deletarTarefa(item.id)} style={styles.botaoDeletar}>
        <Text style={styles.botaoDeletarTexto}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.voltar}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.titulo}>📋 Minhas Tarefas</Text>
      </View>

      <View style={styles.formulario}>
        <TextInput
          style={styles.input}
          placeholder="Título da tarefa *"
          placeholderTextColor="#aaa"
          value={novoTitulo}
          onChangeText={setNovoTitulo}
        />
        <TextInput
          style={styles.input}
          placeholder="Descrição (opcional)"
          placeholderTextColor="#aaa"
          value={novaDescricao}
          onChangeText={setNovaDescricao}
        />
        <TouchableOpacity style={styles.botaoAdicionar} onPress={criarTarefa}>
          <Text style={styles.botaoAdicionarTexto}>+ Adicionar Tarefa</Text>
        </TouchableOpacity>
      </View>

      {carregando ? (
        <ActivityIndicator color="#4a90d9" size="large" style={{ marginTop: 32 }} />
      ) : tarefas.length === 0 ? (
        <Text style={styles.vazio}>Nenhuma tarefa ainda. Crie a primeira! 👆</Text>
      ) : (
        <FlatList
          data={tarefas}
          keyExtractor={item => String(item.id)}
          renderItem={renderTarefa}
          contentContainerStyle={{ paddingBottom: 32 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f0f0', padding: 20, paddingTop: 52 },
  header: { marginBottom: 20 },
  voltar: { color: '#4a90d9', marginBottom: 8, fontSize: 13 },
  titulo: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  formulario: { marginBottom: 20 },
  input: { backgroundColor: '#fff', color: '#333', borderRadius: 4, paddingHorizontal: 12, paddingVertical: 10, fontSize: 14, borderWidth: 1, borderColor: '#bbb', marginBottom: 8 },
  botaoAdicionar: { backgroundColor: '#4a90d9', borderRadius: 4, paddingVertical: 12, alignItems: 'center' },
  botaoAdicionarTexto: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  tarefaCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 4, padding: 12, marginBottom: 8, borderWidth: 1, borderColor: '#ddd' },
  tarefaConcluida: { opacity: 0.5 },
  tarefaCheck: { fontSize: 18, marginRight: 10 },
  tarefaTitulo: { color: '#333', fontSize: 15, fontWeight: '600' },
  textoRiscado: { textDecorationLine: 'line-through', color: '#aaa' },
  tarefaDescricao: { color: '#888', fontSize: 12, marginTop: 2 },
  vazio: { color: '#aaa', textAlign: 'center', marginTop: 48, fontSize: 14 },
  botaoDeletar: { padding: 8, marginLeft: 8 },
  botaoDeletarTexto: { fontSize: 16 },
});