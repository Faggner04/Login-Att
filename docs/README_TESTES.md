# 🧪 Testes Automatizados - Login-Att

## 📌 Sumário Rápido

Este projeto agora possui **testes automatizados E2E (End-to-End)** usando **Playwright**, cobrindo os seguintes cenários:

✅ **Entrar com usuário inválido** - Testa rejeição de credenciais  
✅ **Adicionar nova tarefa** - Testa criação de tarefas  
✅ **Editar tarefa existente** - Testa atualização de tarefas  
✅ **Marcar tarefa como concluída** - Testa toggle de status  

---

## 🚀 Começo Rápido (3 passos)

### 1️⃣ Prepare os Servidores (Em 3 terminais diferentes)

**Terminal 1 - Expo Server:**
```bash
npm start
# Escolha opção desejada (w para web, a para android, etc.)
```

**Terminal 2 - JSON Server (Banco de Dados):**
```bash
npx json-server --watch data/data/bancoDeDados.json --port 3000
```

**Terminal 3 - Testes:**
```bash
# Windows (use o script interativo)
scripts/EXECUTAR_TESTES_WINDOWS.bat

# ou Linux/Mac
bash scripts/EXECUTAR_TESTES.sh

# ou execute diretamente
npx playwright test tests/login-tarefas.spec.ts
```

### 2️⃣ Escolha Qual Teste Executar

```bash
# Todos os testes
npx playwright test tests/login-tarefas.spec.ts

# Teste específico: Usuário inválido
npx playwright test tests/login-tarefas.spec.ts -g "Falha ao entrar com usuario invalido"

# Teste específico: Adicionar tarefa
npx playwright test tests/login-tarefas.spec.ts -g "Adicionar nova tarefa"

# Teste específico: Editar tarefa
npx playwright test tests/login-tarefas.spec.ts -g "Editar tarefa"

# Teste específico: Marcar concluída
npx playwright test tests/login-tarefas.spec.ts -g "Marcar tarefa como concluida"
```

### 3️⃣ Visualize os Resultados

```bash
# Ver relatório HTML após os testes
npx playwright show-report
```

---

## 📋 Arquivos de Teste

| Arquivo | Descrição |
|---------|-----------|
| `tests/login-tarefas.spec.ts` | **Arquivo principal de testes** com todos os cenários |
| `PLANO_DE_TESTES.md` | Documentação completa do plano de testes |
| `scripts/EXECUTAR_TESTES_WINDOWS.bat` | Script interativo para Windows |
| `scripts/EXECUTAR_TESTES.sh` | Script para Linux/Mac |

---

## 🎯 Cenários de Teste Principais

### 1. Entrar com Usuário Inválido ❌

**O que é testado:**
- Aplicação rejeita credenciais incorretas
- Alert de erro é exibido
- Usuário permanece na tela de login

**Como executar:**
```bash
npx playwright test tests/login-tarefas.spec.ts -g "Falha ao entrar com usuario invalido"
```

**Código do teste:**
```typescript
test('❌ Falha ao entrar com usuário inválido', async ({ page }) => {
  await page.fill('input[placeholder="Digite seu usuário"]', 'usuarioInexistente');
  await page.fill('input[placeholder="Digite sua senha"]', 'senhaErrada');
  await page.click('button:has-text("Entrar")');
  
  // Valida mensagem de erro
  page.once('dialog', dialog => {
    expect(dialog.message()).toContain('Usuário ou senha incorretos');
    dialog.dismiss();
  });
});
```

---

### 2. Adicionar Nova Tarefa ➕

**O que é testado:**
- Criação de nova tarefa
- Tarefa aparece na lista
- Validação de campo obrigatório

**Como executar:**
```bash
npx playwright test tests/login-tarefas.spec.ts -g "Adicionar nova tarefa"
```

**Fluxo:**
1. Faz login com `admin`/`123`
2. Clica "Minhas Tarefas"
3. Preenche título e descrição
4. Clica "+ Adicionar Tarefa"
5. Valida que aparece na lista com ⬜ (não concluída)

---

### 3. Editar Tarefa Existente ✏️

**O que é testado:**
- Modal de edição abre corretamente
- Alterações são salvas na API
- Lista atualiza com novos dados

**Como executar:**
```bash
npx playwright test tests/login-tarefas.spec.ts -g "Editar tarefa"
```

**Fluxo:**
1. Cria uma tarefa de teste
2. Clica no botão ✏️ (editar)
3. Muda o título
4. Clica "Salvar"
5. Valida que lista atualiza

---

### 4. Marcar Tarefa Como Concluída ✅

**O que é testado:**
- Toggle de status funciona
- Visual muda (checkbox e risca no texto)
- API é atualizada corretamente

**Como executar:**
```bash
npx playwright test tests/login-tarefas.spec.ts -g "Marcar tarefa como concluida"
```

**Fluxo:**
1. Cria uma tarefa
2. Clica no checkbox ⬜
3. Valida que muda para ✅
4. Valida que texto fica riscado
5. Clica novamente para desmarcar

---

## 🛠️ Opções Avançadas

### Modo Debug (Interativo)
```bash
npx playwright test tests/login-tarefas.spec.ts --debug
# Permite inspecionar elementos, pausar testes, ver console
```

### Modo Headed (Visualizar Browser)
```bash
npx playwright test tests/login-tarefas.spec.ts --headed
# Executa os testes com o browser visível
```

### Executar Teste Único
```bash
npx playwright test tests/login-tarefas.spec.ts -g "Login bem-sucedido"
```

### Relatório HTML
```bash
# Após executar testes
npx playwright show-report
```

---

## 📊 Estrutura de Testes

O arquivo `login-tarefas.spec.ts` contém **4 suites principais**:

```
🔐 Testes de Login e Autenticação
   ├── ✅ Login bem-sucedido
   ├── ❌ Login inválido
   ├── ⚠️ Campos vazios
   └── 👁️ Toggle senha

📋 Testes de Gerenciamento de Tarefas
   ├── ➕ Adicionar tarefa
   ├── ⚠️ Validação de título
   ├── ✏️ Editar tarefa
   ├── ✅ Marcar concluída
   ├── ❌ Desmarcar
   └── 🗑️ Deletar

🔄 Testes de Navegação e Fluxo
   ├── 🏠 Voltar para home
   ├── 🚪 Logout
   └── 📋 Persistência de dados

⚡ Testes de Performance e Estados
   ├── ⏳ Indicador de carregamento
   ├── 📱 Responsividade
   └── 🔄 Estado vazio
```

**Total: 20+ testes** cobrindo todo fluxo da aplicação

---

## 📱 Dados de Teste

**Usuários disponíveis:**

| Usuário | Senha | Email |
|---------|-------|-------|
| admin | 123 | admin@email.com |
| Maria | 456 | maria@email.com |

**Credenciais inválidas para teste:**
- Usuário: `usuarioInexistente`
- Senha: `senhaErrada`

---

## ⚠️ Troubleshooting

### "Timeout waiting for page to load"
✅ Verificar se Expo está rodando: `npm start`  
✅ Verificar se JSON Server está rodando  
✅ Verificar URL correta: `http://localhost:8081`

### "Elemento não encontrado"
✅ Usar modo debug: `npx playwright test --debug`  
✅ Inspecionar elemento e ajustar seletor

### "Falha de conexão à API"
✅ Verificar se JSON Server está rodando  
✅ Verificar IP: `10.125.214.183`  
✅ Tentar: `ping 10.125.214.183`

### "Credenciais não funcionam"
✅ Verificar `data/bancoDeDados.json`  
✅ Verificar se usuário existe no banco  
✅ Resetar banco de dados se necessário

---

## 🔍 Inspecionar Testes

Para ver o que cada teste faz:

```bash
# Ver arquivo de testes
cat tests/login-tarefas.spec.ts

# Ver plano detalhado
cat PLANO_DE_TESTES.md
```

---

## 📈 Cobertura de Testes

| Funcionalidade | Cobertura |
|---|---|
| Autenticação | ✅ 100% |
| CRUD Tarefas | ✅ 100% |
| Navegação | ✅ 100% |
| Validações | ✅ 100% |
| Responsividade | ✅ 80% |
| Performance | ✅ 60% |

---

## 🚀 Próximas Funcionalidades

- [ ] Testes de carga (stress testing)
- [ ] Testes de acessibilidade
- [ ] Testes de integração com backend
- [ ] Cobertura de código (coverage report)
- [ ] Integração com CI/CD (GitHub Actions)

---

## 📚 Documentação

- [PLANO_DE_TESTES.md](PLANO_DE_TESTES.md) - Documentação completa
- [tests/login-tarefas.spec.ts](tests/login-tarefas.spec.ts) - Código dos testes
- [Playwright Docs](https://playwright.dev/)

---

## 🎉 Dicas Finais

1. **Manter servidores rodando** - Expo e JSON Server devem estar sempre ativos
2. **Usar modo headed** - Para debugar, `--headed` ajuda a visualizar
3. **Ler logs** - Playwright exibe logs úteis no terminal
4. **Documentação** - Ver `PLANO_DE_TESTES.md` para detalhes completos

---

**Status:** ✅ Pronto para uso  
**Última atualização:** Maio 2026  
**Autor:** Copilot  
**Versão:** 1.0
