# Agenda e Gerenciamento de Tarefas

Aplicação acadêmica feita com JavaScript, Node.js, Expo, React Native, Expo Router, AsyncStorage e Playwright.

## Funcionalidades

- Cadastro, login, logout e sessão persistente.
- Tarefas separadas por usuário.
- Dashboard com tarefas do dia, próximos compromissos e contadores.
- Calendário mensal com navegação por mês e ano.
- Criação, edição, exclusão, conclusão e reabertura de tarefas.
- Tarefas com descrição, horário, cor, data inicial, data final e recorrência.
- Tarefas de múltiplos dias exibidas em todos os dias do intervalo.
- Recorrência diária, semanal, mensal e anual.
- Tema claro e escuro salvo localmente.
- Testes automatizados com Playwright para a versão Web.

## Estrutura

```text
app/                  Rotas do Expo Router
src/components        Componentes reutilizáveis
src/screens           Telas do aplicativo
src/services          Regras de autenticação, tarefas e configurações
src/storage           Leitura e gravação JSON com AsyncStorage
src/utils             Datas, calendário e recorrência
src/styles            Tema e estilos globais
src/tests             Testes Playwright
```

## Principais arquivos

- `src/App.js`: controla a sessão, a navegação entre telas e o carregamento das tarefas do usuário.
- `src/services/authService.js`: cadastro, login, logout e persistência da sessão local.
- `src/services/taskService.js`: criação, edição, exclusão e consulta das tarefas no AsyncStorage.
- `src/utils/recurrence.js`: regra que faz tarefas de múltiplos dias e recorrentes aparecerem nas datas corretas.
- `src/screens/CalendarScreen.js`: calendário mensal com navegação por mês e ano.
- `src/tests/agenda.spec.js`: testes automatizados de autenticação, calendário, tarefas e persistência.

## Instalação

```bash
npm install
```

Se o npm do Windows bloquear o cache padrão, use:

```bash
npm install --cache ./.npm-cache
```

## Executar no Expo Go

```bash
npm start
```

Depois, escaneie o QR Code com o Expo Go no Android ou iOS.

## Executar no navegador

```bash
npm run web
```

O Expo abrirá a aplicação no navegador. Caso não abra automaticamente, acesse o endereço exibido no terminal.

## Testes Playwright

```bash
npm test
```

Os testes iniciam o Expo Web na porta 8081 e verificam autenticação, calendário, tarefas e persistência.
