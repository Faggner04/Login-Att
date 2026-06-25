# Relatorio de Testes Automatizados

Data da execucao: 22/06/2026  
Projeto: Agenda e Gerenciamento de Tarefas  
Resultado final: 10 testes executados, 10 aprovados, 0 falhas

## Ambiente Utilizado

| Item | Valor |
|---|---|
| Sistema | Windows |
| Node.js | v24.14.0 |
| npm | 11.9.0 |
| Expo | ~54.0.33 |
| React Native | 0.81.5 |
| Playwright | 1.60.0 |
| Navegador | Chromium via Playwright |
| URL de teste | http://127.0.0.1:8081 |

## Ferramentas Utilizadas

| Ferramenta | Uso |
|---|---|
| Expo Web | Servidor local da aplicacao |
| Playwright | Automacao dos fluxos de interface |
| AsyncStorage | Persistencia local dos dados |
| npm audit | Auditoria de dependencias |

## Comando Executado

```bash
npm test -- --project=chromium
```

## Tabela dos Testes Executados

| # | Cenario | Resultado | Duracao | Evidencia |
|---|---|---:|---:|---|
| 1 | Cadastro de usuario | Aprovado | 3.984s | [01-cadastro-usuario.png](evidencias/01-cadastro-usuario.png) |
| 2 | Login valido | Aprovado | 4.184s | [02-login-valido.png](evidencias/02-login-valido.png) |
| 3 | Login invalido | Aprovado | 3.628s | [03-login-invalido.png](evidencias/03-login-invalido.png) |
| 4 | Logout | Aprovado | 4.277s | [04-logout.png](evidencias/04-logout.png) |
| 5 | Criar tarefa | Aprovado | 4.288s | [05-criar-tarefa.png](evidencias/05-criar-tarefa.png) |
| 6 | Editar tarefa | Aprovado | 4.747s | [06-editar-tarefa.png](evidencias/06-editar-tarefa.png) |
| 7 | Excluir tarefa | Aprovado | 5.364s | [07-excluir-tarefa.png](evidencias/07-excluir-tarefa.png) |
| 8 | Concluir tarefa | Aprovado | 6.153s | [08-concluir-tarefa.png](evidencias/08-concluir-tarefa.png) |
| 9 | Criar tarefa recorrente | Aprovado | 4.805s | [09-tarefa-recorrente.png](evidencias/09-tarefa-recorrente.png) |
| 10 | Verificar persistencia dos dados apos reiniciar | Aprovado | 6.170s | [10-persistencia-dados.png](evidencias/10-persistencia-dados.png) |

## Evidencias Geradas

![Cadastro de usuario](evidencias/01-cadastro-usuario.png)
![Login valido](evidencias/02-login-valido.png)
![Login invalido](evidencias/03-login-invalido.png)
![Logout](evidencias/04-logout.png)
![Criar tarefa](evidencias/05-criar-tarefa.png)
![Editar tarefa](evidencias/06-editar-tarefa.png)
![Excluir tarefa](evidencias/07-excluir-tarefa.png)
![Concluir tarefa](evidencias/08-concluir-tarefa.png)
![Criar tarefa recorrente](evidencias/09-tarefa-recorrente.png)
![Persistencia dos dados](evidencias/10-persistencia-dados.png)

## Resumo Final

A suite automatizada validou os principais fluxos funcionais do sistema: autenticacao, logout, manipulacao completa de tarefas, recorrencia e persistencia local. Todos os 10 cenarios foram executados com Chromium via Playwright e aprovados na execucao final.

Observacao: houve uma primeira tentativa bloqueada por permissao do ambiente ao abrir o Chromium. A execucao final foi realizada com permissao adequada e gerou as evidencias reais listadas acima.
