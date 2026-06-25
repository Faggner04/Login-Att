# 📋 Plano de Testes - Projeto Login-Att

## 📌 Visão Geral

Este documento apresenta o plano abrangente de testes de integração/E2E (End-to-End) para a aplicação **Login-Att** usando **Playwright**. O objetivo é validar todos os fluxos críticos da aplicação, garantindo qualidade, confiabilidade e performance.

---

## 🎯 Objetivos dos Testes

- ✅ Validar fluxo de autenticação (login/logout)
- ✅ Testar CRUD completo de tarefas (Create, Read, Update, Delete)
- ✅ Garantir navegação correta entre telas
- ✅ Validar tratamento de erros e campos obrigatórios
- ✅ Testar responsividade em diferentes viewports
- ✅ Validar persistência de dados entre navegações
- ✅ Simular comportamento real do usuário

---

## 🏗️ Estrutura de Testes

Os testes estão organizados em **4 suites principais**, cada uma cobrindo um aspecto diferente da aplicação:

### 1. **🔐 Testes de Login e Autenticação**
Valida todo o fluxo de entrada na aplicação.

| Teste | Descrição | Cenário |
|-------|-----------|---------|
| ✅ Login bem-sucedido | Entrada com credenciais válidas | Usuário: `admin`, Senha: `123` |
| ❌ Login inválido | Tentativa com credenciais erradas | Usuário/Senha inexistentes |
| ⚠️ Campos vazios | Validação de obrigatoriedade | Tenta clicar em "Entrar" sem preencher |
| 👁️ Toggle Senha | Mostrar/ocultar senha | Alterna visibilidade com botão de olho |

**Fluxo:**
```
Login Screen → Digite credenciais → Clique "Entrar" → Home Screen / Erro
```

---

### 2. **📋 Testes de Gerenciamento de Tarefas**
Valida o CRUD completo de tarefas.

| Teste | Descrição | Ação |
|-------|-----------|------|
| ➕ Adicionar Tarefa | Criar nova tarefa com título e descrição | POST /tarefas |
| ⚠️ Validação de Título | Não permite tarefa sem título | Valida campo obrigatório |
| ✏️ Editar Tarefa | Modificar título e descrição existentes | PATCH /tarefas/:id |
| ✅ Marcar Concluída | Alternar status de conclusão | PATCH /tarefas/:id |
| ❌ Desmarcar Tarefa | Retornar tarefa para não concluída | Toggle de status |
| 🗑️ Deletar Tarefa | Remover tarefa com confirmação | DELETE /tarefas/:id |

**Fluxo:**
```
Home → "Minhas Tarefas" → Tela de Tarefas → Criar/Editar/Deletar → API atualiza → Lista atualiza
```

---

### 3. **🔄 Testes de Navegação e Fluxo**
Valida navegação entre telas e consistência de dados.

| Teste | Descrição | Caminho |
|-------|-----------|---------|
| 🏠 Voltar de Tarefas | Navegação reversa com botão "Voltar" | Tarefas → Home |
| 🚪 Logout | Sair da aplicação retorna ao login | Home → Sair → Login |
| 📋 Persistência | Dados se mantêm após navegação | Criar → Voltar → Retornar → Validar |

---

### 4. **⚡ Testes de Performance e Estados**
Valida comportamento em diferentes contextos.

| Teste | Descrição | Validação |
|-------|-----------|-----------|
| ⏳ Indicador de Carregamento | Mostra loading durante requisições | Spinner/ActivityIndicator |
| 📱 Responsividade Mobile | Funciona em viewport 375x667px | Layout e interações responsivas |
| 🔄 Estado Vazio | Mensagem quando não há tarefas | "Nenhuma tarefa ainda..." |

---

## 🚀 Como Executar os Testes

### **Pré-requisitos**

1. **Servidor Expo rodando:**
   ```bash
   npm start
   ```
   (Mantenha rodando em outro terminal)

2. **JSON Server rodando:**
   ```bash
   npx json-server --watch data/data/bancoDeDados.json --port 3000 --host 10.125.214.183
   ```
   (Mantenha rodando em outro terminal)

### **Executar Todos os Testes**

```bash
npx playwright test tests/login-tarefas.spec.ts
```

### **Executar Suite Específica**

```bash
# Apenas testes de login
npx playwright test tests/login-tarefas.spec.ts -g "Testes de Login"

# Apenas testes de tarefas
npx playwright test tests/login-tarefas.spec.ts -g "Testes de Gerenciamento de Tarefas"

# Apenas testes de navegação
npx playwright test tests/login-tarefas.spec.ts -g "Testes de Navegação"

# Apenas testes de performance
npx playwright test tests/login-tarefas.spec.ts -g "Testes de Performance"
```

### **Executar Teste Específico**

```bash
npx playwright test tests/login-tarefas.spec.ts -g "Adicionar nova tarefa com sucesso"
```

### **Modo Debug (Interativo)**

```bash
npx playwright test tests/login-tarefas.spec.ts --debug
```

### **Modo Headed (Visualizar Browser)**

```bash
npx playwright test tests/login-tarefas.spec.ts --headed
```

### **Modo Watch (Reexecuta ao salvar)**

```bash
npx playwright test tests/login-tarefas.spec.ts --watch
```

### **Gerar Relatório HTML**

```bash
npx playwright test tests/login-tarefas.spec.ts
npx playwright show-report
```

---

## 📊 Matriz de Cobertura de Testes

| Funcionalidade | Cenário | Status | Prioridade |
|---|---|---|---|
| **Autenticação** | Login válido | ✅ | 🔴 CRÍTICO |
| | Login inválido | ✅ | 🔴 CRÍTICO |
| | Campos vazios | ✅ | 🟠 ALTA |
| | Toggle senha | ✅ | 🟡 MÉDIA |
| **CRUD Tarefas** | Criar tarefa | ✅ | 🔴 CRÍTICO |
| | Editar tarefa | ✅ | 🔴 CRÍTICO |
| | Marcar concluída | ✅ | 🔴 CRÍTICO |
| | Deletar tarefa | ✅ | 🔴 CRÍTICO |
| | Validação título | ✅ | 🟠 ALTA |
| **Navegação** | Voltar | ✅ | 🟡 MÉDIA |
| | Logout | ✅ | 🟠 ALTA |
| | Persistência dados | ✅ | 🟠 ALTA |
| **Performance** | Carregamento | ✅ | 🟡 MÉDIA |
| | Responsividade | ✅ | 🟡 MÉDIA |
| | Estado vazio | ✅ | 🟡 MÉDIA |

---

## 🔍 Detalhes dos Cenários Principais

### **Cenário 1: Entrar com Usuário Inválido**

**Objetivo:** Validar que a aplicação rejeita credenciais incorretas.

**Passos:**
1. Abrir aplicação
2. Preencher campo usuário: `usuarioInexistente`
3. Preencher campo senha: `senhaErrada`
4. Clicar "Entrar"

**Resultado Esperado:**
- ❌ Alert exibido: "Usuário ou senha incorretos!"
- Permanece na tela de login
- Campos permanecem preenchidos (opcional para UX melhorada)

**Validações:**
```typescript
page.once('dialog', dialog => {
  expect(dialog.message()).toContain('Usuário ou senha incorretos');
  dialog.dismiss();
});
```

---

### **Cenário 2: Adicionar Nova Tarefa**

**Objetivo:** Criar tarefa com título e descrição, validando CRUD create.

**Passos:**
1. Fazer login com usuário válido (`admin`/`123`)
2. Clicar "Minhas Tarefas"
3. Preencher título: "Tarefa ${timestamp}"
4. Preencher descrição: "Descrição da tarefa de teste"
5. Clicar "+ Adicionar Tarefa"

**Resultado Esperado:**
- ✅ Tarefa aparece na lista imediatamente
- Tarefa tem checkbox ⬜ (não concluída)
- Formulário é limpo para nova entrada
- API recebe POST com dados corretos

**Validações:**
```typescript
await expect(page).toContainText(novoTitulo);
await expect(page).toContainText(novaDescricao);
const tarefaCard = page.locator(`text=${novoTitulo}`);
await expect(tarefaCard).toContainText('⬜');
```

---

### **Cenário 3: Editar Tarefa Existente**

**Objetivo:** Validar atualização de tarefa (CRUD update).

**Passos:**
1. Na lista de tarefas, clicar ícone ✏️ em uma tarefa
2. Modal "Editar Tarefa" aparece com valores atuais
3. Limpar título e inserir novo
4. (Opcional) Atualizar descrição
5. Clicar "Salvar"

**Resultado Esperado:**
- ✅ Modal fecha
- Lista atualiza com novo título
- Tarefa mantém outros dados (descrição, status)
- API recebe PATCH com id e dados atualizados

**Validações:**
```typescript
await page.fill('input[placeholder="Título"]', tituloEditado);
await page.click('button:has-text("Salvar")');
await expect(page).toContainText(tituloEditado);
await expect(page).not.toContainText(tituloOriginal);
```

---

### **Cenário 4: Marcar Tarefa Como Concluída**

**Objetivo:** Validar toggle de status de conclusão.

**Passos:**
1. Na lista, clicar no checkbox ⬜ de uma tarefa
2. Checkbox muda para ✅
3. Clique novamente para desmarcar
4. Checkbox volta para ⬜

**Resultado Esperado:**
- ✅ Checkbox visual muda (⬜ → ✅ → ⬜)
- Título fica riscado quando concluída
- Cor/opacity muda para indicar conclusão
- API atualiza com PATCH `{ concluida: true/false }`

**Validações:**
```typescript
await tarefaCard.locator('text=⬜').click();
await expect(tarefaCard).toContainText('✅');
const tarefaTitulo = tarefaCard.locator(`text=${novoTitulo}`);
await expect(tarefaTitulo).toHaveCSS('text-decoration-line', 'line-through');
```

---

## 🛠️ Configuração e Ambiente

### **Arquivo: `playwright.config.ts`**

```typescript
// Configurações relevantes:
- testDir: './tests'           // Onde os testes estão
- fullyParallel: true          // Executa testes em paralelo
- retries: 0 (dev) / 2 (CI)    // Repetições em caso de falha
- reporter: 'html'             // Gera relatório HTML
- trace: 'on-first-retry'      // Captura trace em falhas
```

### **Dados de Teste**

**Usuário Válido:**
- Usuário: `admin`
- Senha: `123`
- Email: `admin@email.com`

**Usuário Adicional (opcional):**
- Usuário: `Maria`
- Senha: `456`
- Email: `maria@email.com`

---

## 📈 Critérios de Sucesso

✅ **Todos os testes passam** em navegadores: Chrome, Firefox, Safari
✅ **Taxa de cobertura** > 80% do código crítico
✅ **Tempo de execução** < 5 minutos para suite completa
✅ **Sem alertas de console** durante execução
✅ **Sem timeouts** ou falhas intermitentes
✅ **Relatório HTML** gerado corretamente

---

## ⚠️ Troubleshooting

### **Erro: "Timeout waiting for page to load"**
- Verificar se Expo está rodando em `http://localhost:8081`
- Verificar se JSON Server está rodando em `http://10.125.214.183:3000`

### **Erro: "Usuário não encontrado"**
- Verificar se `data/bancoDeDados.json` tem usuário `admin`
- Resetar banco de dados se necessário

### **Erro: "Elemento não encontrado"**
- Elemento pode ter sido renderizado com seletor diferente
- Usar `--debug` para inspecionar e ajustar seletores

### **Erro: "Dialog não apareceu"**
- Alguns dialogs podem estar configurados diferentemente
- Usar `page.on('dialog')` para monitorar

---

## 🚀 Próximos Passos

1. ✅ Executar testes localmente
2. 📊 Revisar relatório HTML
3. 🔧 Ajustar seletores se necessário
4. 🔄 Integrar com CI/CD
5. 📈 Expandir cobertura com testes adicionais
6. 🎯 Adicionar testes de performance/carga

---

## 📞 Referências

- [Documentação Playwright](https://playwright.dev/)
- [Guia de Seletores Playwright](https://playwright.dev/docs/selectors)
- [API Testes Playwright](https://playwright.dev/docs/api/class-test)
- Projeto: `Login-Att` (React Native + Expo)
- Arquivo de testes: `tests/login-tarefas.spec.ts`

---

**Última atualização:** Maio 2026
**Versão:** 1.0
**Status:** ✅ Pronto para execução
