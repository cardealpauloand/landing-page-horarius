# Backlog da landing

Pendências combinadas em 03/08/2026, após o revamp competitivo (hero, páginas
por segmento, preços com selos, FAQ de objeções — merge `0a232ba`).

## Novas páginas de segmento (aguardando: medir a 1ª leva antes)

Antes de criar, olhar no Search Console a indexação e o tráfego das 4 páginas
atuais (/barbearias, /saloes-de-beleza, /clinicas-de-estetica, /pet-shops).
Criar em levas de ~4 — página rasa de nicho vira doorway page e o Google
ignora. Processo: adicionar `SegmentKey` em `src/content/types.ts` e seguir os
erros do compilador (rota, title, conteúdo, footer, ícone); copy sempre
verificado contra o que o produto entrega hoje.

### Leva 1 (encaixe forte + busca alta)
- **Dentistas/odontologia** — o hero já tem o cenário "Sorriso Odonto"; ganha
  o link do card "Saúde". Busca: "sistema de agendamento para consultório
  odontológico".
- **Esmalterias/nail designers** — o concorrente (horariusapp.com.br) mira
  esse nicho e nós ainda não. Busca: "sistema para esmalteria".
- **Sobrancelhas e cílios (lash/brow)** — idem, nicho grande de Instagram.
- **Estética automotiva/lava-rápido** — sem concorrência do horariusapp
  (só beleza); ganha o link do card "Automotivo".

### Leva 2 (bons, com ressalvas)
- **Psicólogos** — recorrência semanal encaixa; copy precisa respeitar as
  regras de publicidade do CFP e deixar claro que somos agenda, não prontuário.
- **Clínicas médicas/fisioterapia** — prometer só agendamento (não temos
  prontuário eletrônico, TISS nem receituário).
- **Personal trainers/studios de fitness**.
- **Veterinárias** — avaliar se vira página própria ou seção em /pet-shops.
- **Tatuadores** — no-show doído, volume de busca menor.

## Prova social na home (aguardando material real)

Depoimentos de clientes, números de operação (agendamentos processados,
redução de faltas) e telas reais do app. Não inventar: sem material, a seção
não entra.

## Notas técnicas

- 2 erros de lint pré-existentes (`react-hooks/set-state-in-effect` em
  `App.tsx` e `Reveal.tsx`) — anteriores ao revamp, corrigir à parte.
- Netlify serve as páginas com barra final (301 de `/barbearias` para
  `/barbearias/`) e o canonical aponta sem barra — padrão herdado de
  `/para-voce`, o Google resolve; se um dia padronizar, mudar site inteiro
  de uma vez.
- Se o produto ganhar importação de clientes, adicionar isso ao FAQ e às
  páginas de segmento (o concorrente promete "importamos seus clientes";
  hoje nós não temos e por isso não prometemos).
