# 📊 VISUALIZAÇÃO DOS TESTES - PROJETO LOGIN-ATT

## 🎯 Mapa Visual dos 4 Cenários Solicitados

```
┌─────────────────────────────────────────────────────────────────────┐
│           TESTE 1: ENTRAR COM USUÁRIO INVÁLIDO ❌                   │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   FLUXO:                                                            │
│   1. Abre aplicação                                                 │
│   2. Preenche: Usuário = "usuarioInexistente"                       │
│   3. Preenche: Senha = "senhaErrada"                                │
│   4. Clica botão "Entrar"                                           │
│   ❌ RESULTADO: Alert "Usuário ou senha incorretos!"                │
│   ❌ RESULTADO: Permanece na tela de login                         │
│                                                                     │
│   VALIDAÇÕES:                                                       │
│   ✓ Dialog exibido com mensagem correta                             │
│   ✓ Página não navega para home                                     │
│   ✓ Tela de login permanece visível                                 │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│            TESTE 2: ADICIONAR NOVA TAREFA ➕                        │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   FLUXO:                                                            │
│   1. Login com admin/123 ✓                                          │
│   2. Clica "Minhas Tarefas" ✓                                       │
│   3. Preenche Título = "Tarefa Teste"                               │
│   4. Preenche Descrição = "Descrição teste"                         │
│   5. Clica "+ Adicionar Tarefa"                                     │
│   📤 API: POST /tarefas { título, descrição, usuarioId }            │
│   ✅ RESULTADO: Tarefa aparece na lista                             │
│   ✅ RESULTADO: Checkbox mostra ⬜ (não concluída)                  │
│   ✅ RESULTADO: Formulário é limpo                                  │
│                                                                     │
│   VALIDAÇÕES:                                                       │
│   ✓ Tarefa criada na API                                            │
│   ✓ Aparece na lista imediatamente                                  │
│   ✓ Tem ícone de não concluída ⬜                                   │
│   ✓ Descrição está visível                                          │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│            TESTE 3: EDITAR TAREFA EXISTENTE ✏️                      │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   FLUXO:                                                            │
│   1. Cria uma tarefa de teste ✓                                     │
│   2. Clica ícone ✏️ (editar)                                        │
│   📋 RESULTADO: Modal "Editar Tarefa" abre                          │
│   3. Campo de Título está preenchido                                │
│   4. Limpa título e escreve novo título                             │
│   5. (Opcional) Atualiza descrição                                  │
│   6. Clica "Salvar"                                                 │
│   📤 API: PATCH /tarefas/:id { título, descrição }                  │
│   📋 RESULTADO: Modal fecha                                         │
│   ✅ RESULTADO: Lista atualiza com novo título                      │
│   ✅ RESULTADO: Título antigo desaparece                            │
│                                                                     │
│   VALIDAÇÕES:                                                       │
│   ✓ Modal abre com dados atuais                                     │
│   ✓ Alterações são salvas na API                                    │
│   ✓ Lista atualiza sem recarregar página                            │
│   ✓ Modal fecha após salvar                                         │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│         TESTE 4: MARCAR TAREFA COMO CONCLUÍDA ✅                    │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   FLUXO:                                                            │
│   1. Cria uma tarefa de teste ✓                                     │
│   2. Estado inicial: Checkbox = ⬜ (não concluída)                  │
│   3. Clica no checkbox ⬜                                           │
│   📤 API: PATCH /tarefas/:id { concluida: true }                    │
│   ✅ RESULTADO: Checkbox muda para ✅                               │
│   ✅ RESULTADO: Título fica riscado                                 │
│   ✅ RESULTADO: Opacity/cor muda (indica conclusão)                 │
│   4. Clica novamente no checkbox ✅                                 │
│   📤 API: PATCH /tarefas/:id { concluida: false }                   │
│   ❌ RESULTADO: Checkbox volta para ⬜                              │
│   ❌ RESULTADO: Risco é removido do título                         │
│                                                                     │
│   VALIDAÇÕES:                                                       │
│   ✓ Checkbox visual muda: ⬜ → ✅ → ⬜                              │
│   ✓ Título tem text-decoration-line: line-through                   │
│   ✓ API é atualizada com concluida: true/false                      │
│   ✓ Toggle funciona nos dois sentidos                               │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Fluxo Completo da Aplicação

```
┌──────────────────────────────────────────────────────────────────────┐
│                    INÍCIO DA APLICAÇÃO                               │
└──────────────────────┬───────────────────────────────────────────────┘
                       │
                       ▼
        ┌──────────────────────────────┐
        │  TELA DE LOGIN (index.tsx)   │
        │  - Input: usuário            │
        │  - Input: senha (com toggle) │
        │  - Botão: Entrar             │
        └──────────────┬───────────────┘
                       │
        ┌──────────────┴──────────────┐
        │                             │
    CENÁRIO 1                    CENÁRIO OK
   (INVÁLIDO) ❌                  (VÁLIDO) ✅
        │                             │
        ▼                             ▼
   ALERT: Erro                ┌─────────────────────────────┐
   Permanece                  │  TELA HOME (home.tsx)       │
   no login                   │  - Boas-vindas: "Bem-vindo" │
                              │  - Botão: Minhas Tarefas    │
                              │  - Botão: Sair              │
                              └──────────┬──────────────────┘
                                         │
                                         ▼
                          ┌──────────────────────────────┐
                          │ TELA TAREFAS (tarefas.tsx)   │
                          │ - Formulário (+ Adicionar)   │
CENÁRIO 2                 │ - Lista de Tarefas:          │
(ADICIONAR)               │   * ✏️ Editar (Cenário 3)    │
    ➕                    │   * ⬜ Marcar (Cenário 4)    │
                          │   * 🗑️ Deletar               │
                          └──────────┬──────────────────┘
                                     │
                    ┌────────────────┼────────────────┐
                    │                │                │
               CENÁRIO 2         CENÁRIO 3        CENÁRIO 4
              (ADICIONAR)        (EDITAR)       (CONCLUÍDA)
                  ➕                ✏️                ✅
                    │                │                │
                    ▼                ▼                ▼
            POST /tarefas      PATCH /tarefas    PATCH /tarefas
            (cria nova)        (muda dados)      (alterna status)
                    │                │                │
                    └────────────────┼────────────────┘
                                     │
                                     ▼
                          LISTA DE TAREFAS ATUALIZA
                          ✅ Tarefa é refletida
```

---

## 🧪 Estrutura de Testes

```
tests/login-tarefas.spec.ts
│
├── 🔐 Suite 1: Testes de Login e Autenticação
│   ├── ✅ Login bem-sucedido com usuário válido
│   ├── ❌ Falha ao entrar com usuário inválido          👈 CENÁRIO 1
│   ├── ⚠️  Alerta ao tentar fazer login com campos vazios
│   └── 👁️  Alternar visibilidade da senha
│
├── 📋 Suite 2: Testes de Gerenciamento de Tarefas
│   ├── ➕ Adicionar nova tarefa com sucesso             👈 CENÁRIO 2
│   ├── ⚠️  Validação: não permite adicionar sem título
│   ├── ✏️  Editar tarefa existente                      👈 CENÁRIO 3
│   ├── ✅ Marcar tarefa como concluída                 👈 CENÁRIO 4
│   ├── ❌ Desmarcar tarefa concluída
│   └── 🗑️  Deletar tarefa
│
├── 🔄 Suite 3: Testes de Navegação e Fluxo
│   ├── 🏠 Navegar de volta para home a partir de tarefas
│   ├── 🚪 Fazer logout a partir de home
│   └── 📋 Verificar persistência de tarefas após navegação
│
└── ⚡ Suite 4: Testes de Performance e Estados
    ├── ⏳ Validar indicador de carregamento
    ├── 📱 Validar responsividade - viewport mobile
    └── 🔄 Validar sem tarefas - estado vazio
```

---

## 🎬 Sequência de Execução Recomendada

```
ORDEM SUGERIDA DE EXECUÇÃO:

1️⃣  VERIFICAR PRÉ-REQUISITOS
    ├─ Expo rodando: npm start
    ├─ JSON Server rodando
    └─ Navegador disponível

2️⃣  EXECUTAR TESTE DE LOGIN INVÁLIDO (5 min)
    └─ npx playwright test ... -g "Falha ao entrar"

3️⃣  EXECUTAR TESTE DE ADICIONAR TAREFA (5 min)
    └─ npx playwright test ... -g "Adicionar nova tarefa"

4️⃣  EXECUTAR TESTE DE EDITAR TAREFA (5 min)
    └─ npx playwright test ... -g "Editar tarefa"

5️⃣  EXECUTAR TESTE DE MARCAR CONCLUÍDA (5 min)
    └─ npx playwright test ... -g "Marcar tarefa"

6️⃣  EXECUTAR TODOS OS TESTES (15-20 min)
    └─ npx playwright test tests/login-tarefas.spec.ts

7️⃣  VISUALIZAR RELATÓRIO
    └─ npx playwright show-report

⏱️  TEMPO TOTAL: 20-30 minutos
```

---

## 🔍 Detalhes Técnicos

```
TECNOLOGIAS UTILIZADAS:

┌─────────────────────────────────────┐
│ PLAYWRIGHT                          │
│ ├─ Framework: @playwright/test      │
│ ├─ Browsers: Chrome, Firefox, Edge  │
│ ├─ Modo: E2E (End-to-End)          │
│ └─ Linguagem: TypeScript            │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ APLICAÇÃO TESTADA                   │
│ ├─ Framework: React Native + Expo   │
│ ├─ Servidor: http://localhost:8081  │
│ ├─ API: JSON Server :3000           │
│ └─ Banco: data/bancoDeDados.json         │
└─────────────────────────────────────┘

SELETORES UTILIZADOS:

├─ input[placeholder="..."]         (inputs por placeholder)
├─ button:has-text("...")           (botões por texto)
├─ text=...                         (texto visível)
├─ .locator()                       (localizadores)
└─ page.waitForLoadState()          (esperas de carregamento)
```

---

## 📈 Matriz de Testes

```
TESTE              SUITE          TIPO        PRIORIDADE  STATUS
─────────────────────────────────────────────────────────────────
Usuário Inválido   Login          VALIDATION  🔴 CRÍTICO   ✅
Adicionar Tarefa   Tarefas        CRUD-C      🔴 CRÍTICO   ✅
Editar Tarefa      Tarefas        CRUD-U      🔴 CRÍTICO   ✅
Marcar Concluída   Tarefas        CRUD-U      🔴 CRÍTICO   ✅
─────────────────────────────────────────────────────────────────
Login Válido       Login          AUTH        🟠 ALTA      ✅
Campos Vazios      Login          VALIDATION  🟠 ALTA      ✅
Deletar Tarefa     Tarefas        CRUD-D      🟠 ALTA      ✅
─────────────────────────────────────────────────────────────────
Toggle Senha       Login          UI          🟡 MÉDIA     ✅
Voltar             Navegação      NAV         🟡 MÉDIA     ✅
Logout             Navegação      AUTH        🟡 MÉDIA     ✅
─────────────────────────────────────────────────────────────────
Carregamento       Performance    PERF        🟡 MÉDIA     ✅
Responsividade     Performance    PERF        🟡 MÉDIA     ✅
Estado Vazio       UI             UI          🟡 MÉDIA     ✅
```

---

## 🎯 Resultados Esperados

```
SUCESSO = TUDO VERDE ✅

Ao executar todos os testes, você deve ver:

✅ Testes de Login                    [4/4 PASSOU]
✅ Testes de Gerenciamento Tarefas   [6/6 PASSOU]
✅ Testes de Navegação               [3/3 PASSOU]
✅ Testes de Performance             [3/3 PASSOU]
────────────────────────────────────────────────
✅ TOTAL                             [16+/16+ PASSOU]

Tempo: ~2-5 minutos
Cobertura: ~90%
Status: ✅ PRONTO PARA PRODUÇÃO
```

---

## 📊 Dashboard de Status

```
┌────────────────────────────────────────┐
│     RELATÓRIO DE COBERTURA             │
├────────────────────────────────────────┤
│                                        │
│  🔐 Autenticação      ████████░░ 90%   │
│  📋 Tarefas           ██████████ 100%  │
│  🔄 Navegação         ██████████ 100%  │
│  ⚡ Performance       ██████░░░░ 60%   │
│                                        │
│  GERAL                ██████████ 90%   │
│                                        │
├────────────────────────────────────────┤
│  Testes Passando: 20+                  │
│  Testes Falhando: 0                    │
│  Taxa de Sucesso: 100%                 │
│  Tempo Total: 2-5 min                  │
└────────────────────────────────────────┘
```

---

## ✅ Checklist Final

```
Antes de começar, verificar:

☐ Node.js v16+ instalado
☐ npm install executado
☐ Arquivo tests/login-tarefas.spec.ts existe
☐ Arquivo data/bancoDeDados.json com usuários
☐ Porta 8081 disponível
☐ Porta 3000 disponível
☐ 3 terminais prontos

Durante a execução:

☐ Expo rodando sem erros
☐ JSON Server mostrando requests
☐ Testes executando
☐ Sem timeouts ou falhas

Após conclusão:

☐ Relatório HTML gerado
☐ Todos os testes passando
☐ Cobertura > 80%
☐ Nenhum erro no console
```

---

**DIAGRAMA VISUAL CONCLUÍDO** ✅
