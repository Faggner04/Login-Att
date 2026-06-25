# ⚡ QUICK REFERENCE - Comandos Rápidos

## 🚀 INÍCIO RÁPIDO (Copie e Cole)

### Terminal 1: Expo Server
```bash
npm start
```

### Terminal 2: JSON Server
```bash
npx json-server --watch data/data/bancoDeDados.json --port 3000
```

### Terminal 3: Testes

**Todos os testes:**
```bash
npx playwright test tests/login-tarefas.spec.ts
```

**Apenas Login Inválido:**
```bash
npx playwright test tests/login-tarefas.spec.ts -g "Falha ao entrar"
```

**Apenas Adicionar Tarefa:**
```bash
npx playwright test tests/login-tarefas.spec.ts -g "Adicionar nova tarefa"
```

**Apenas Editar Tarefa:**
```bash
npx playwright test tests/login-tarefas.spec.ts -g "Editar tarefa"
```

**Apenas Marcar Concluída:**
```bash
npx playwright test tests/login-tarefas.spec.ts -g "Marcar tarefa"
```

---

## 🔧 OPÇÕES ÚTEIS

| Comando | Descrição |
|---------|-----------|
| `npx playwright test --debug` | Abre modo debug interativo |
| `npx playwright test --headed` | Mostra o navegador executando |
| `npx playwright test --watch` | Reexecuta ao salvar arquivo |
| `npx playwright show-report` | Abre relatório HTML |
| `npx playwright test -x` | Para no primeiro erro |
| `npx playwright test --workers=1` | Executa sequencialmente |

---

## 📊 TESTES DISPONÍVEIS

### Suite 1: Login
```bash
# Todos os testes de login
npx playwright test -g "Testes de Login"

# Testes individuais
npx playwright test -g "Login bem-sucedido"
npx playwright test -g "Falha ao entrar"
npx playwright test -g "Campos vazios"
npx playwright test -g "Toggle senha"
```

### Suite 2: Tarefas
```bash
# Todos os testes de tarefas
npx playwright test -g "Testes de Gerenciamento de Tarefas"

# Testes individuais
npx playwright test -g "Adicionar nova tarefa"
npx playwright test -g "Validação.*titulo"
npx playwright test -g "Editar tarefa"
npx playwright test -g "Marcar tarefa.*concluida"
npx playwright test -g "Desmarcar tarefa"
npx playwright test -g "Deletar tarefa"
```

### Suite 3: Navegação
```bash
# Todos os testes de navegação
npx playwright test -g "Testes de Navegacao"

# Testes individuais
npx playwright test -g "Voltar para home"
npx playwright test -g "Logout"
npx playwright test -g "Persistencia"
```

### Suite 4: Performance
```bash
# Todos os testes de performance
npx playwright test -g "Testes de Performance"

# Testes individuais
npx playwright test -g "Indicador.*carregamento"
npx playwright test -g "Responsividade.*mobile"
npx playwright test -g "Estado vazio"
```

---

## 🎯 OS 4 CENÁRIOS SOLICITADOS

### 1. Usuário Inválido ❌
```bash
npx playwright test -g "Falha ao entrar com usuario invalido"
```

### 2. Adicionar Tarefa ➕
```bash
npx playwright test -g "Adicionar nova tarefa com sucesso"
```

### 3. Editar Tarefa ✏️
```bash
npx playwright test -g "Editar tarefa existente"
```

### 4. Marcar Concluída ✅
```bash
npx playwright test -g "Marcar tarefa como concluida"
```

---

## 📱 DADOS DE TESTE

**Usuários válidos:**
```
admin   / 123
Maria   / 456
```

**Credenciais inválidas:**
```
usuarioInexistente / senhaErrada
```

---

## 🎬 WORKFLOW COMPLETO

```bash
# 1. Prepare os servidores (3 terminais diferentes)
npm start                                      # Terminal 1
npx json-server --watch data/data/bancoDeDados.json      # Terminal 2

# 2. Execute os testes (Terminal 3)
npx playwright test tests/login-tarefas.spec.ts

# 3. Visualize resultados
npx playwright show-report
```

---

## 🐛 DEBUG

```bash
# Modo debug interativo
npx playwright test --debug

# Ver tudo que está acontecendo
npx playwright test --headed

# Com logs detalhados
npx playwright test --trace=on

# Teste específico em debug
npx playwright test -g "seu teste" --debug
```

---

## 📊 RELATÓRIOS

```bash
# Abre último relatório
npx playwright show-report

# Relatório em texto
npx playwright test --reporter=list

# Relatório JSON
npx playwright test --reporter=json > results.json

# Múltiplos relatórios
npx playwright test --reporter=html --reporter=list
```

---

## ✅ VERIFICAÇÃO RÁPIDA

```bash
# Verificar instalação
npx playwright --version

# Listar browsers disponíveis
npx playwright install

# Executar teste de exemplo
npx playwright test tests/example.spec.ts
```

---

## 📁 ARQUIVOS PRINCIPAIS

```
tests/login-tarefas.spec.ts    ← ARQUIVO DE TESTES (20+ testes)
COMEÇAR_AQUI.md               ← LEIA PRIMEIRO
RESUMO_EXECUTIVO_TESTES.md    ← OS 4 CENÁRIOS EXPLICADOS
PLANO_DE_TESTES.md            ← DOCUMENTAÇÃO COMPLETA
DIAGRAMA_VISUAL_TESTES.md     ← FLUXOS VISUAIS
```

---

## 🎓 ORDEM DE LEITURA RECOMENDADA

1. 👉 **COMEÇAR_AQUI.md** (2 min)
2. **RESUMO_EXECUTIVO_TESTES.md** (10 min)
3. **DIAGRAMA_VISUAL_TESTES.md** (5 min)
4. **PLANO_DE_TESTES.md** (opcional, completo)

---

## ⚡ ATALHOS MAIS USADOS

```bash
# Todos os testes rápido
npx playwright test

# Ver relatório
npx playwright show-report

# Um teste específico
npx playwright test -g "Adicionar"

# Debug mode
npx playwright test --debug

# Com browser visível
npx playwright test --headed
```

---

## 🔗 LINKS ÚTEIS

- [Playwright Docs](https://playwright.dev/)
- [Test Selectors](https://playwright.dev/docs/locators)
- [API Reference](https://playwright.dev/docs/api/class-test)

---

## 📝 NOTAS IMPORTANTES

⚠️  3 terminais devem estar rodando:
   - Expo em :8081
   - JSON Server em :3000
   - Terminal de testes

⚠️  Testes criam dados com timestamp para evitar conflitos

⚠️️  Modo debug para inspecionar elementos

⚠️  Usar `--headed` para ver o que está acontecendo

---

**Última atualização:** Maio 2026  
**Status:** ✅ Pronto para Uso  
**Versão:** 1.0
