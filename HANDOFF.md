# HANDOFF - Nuvio TV & Addon Catálogo Betor

## 1. Objetivo do Projeto e Stack Usada
- **Objetivo**: Disponibilizar o ecossistema Nuvio TV com streaming otimizado e catálogo em Smart TVs Samsung Tizen de entrada (especificamente Samsung Smart TV modelo **UN50NU7100**, ano 2018, Tizen 4.0 / Chromium 56), contornando limitações de hardware, bloqueios de certificados de desenvolvedor da Samsung (erro `118012`) e lentidão de renderização da GPU.
- **Stack Tecnológica**:
  - **TizenBrew Module / Frontend**: Vanilla JS ES5/ES6 com polyfills (`core-js`), CSS3 acelerado por hardware para Chromium 56 legado, Tizen WebAPIs (`webapis.avplay`).
  - **Addon Catálogo Backend**: Node.js ES Modules / Express Serverless (Vercel), catálogo de torrents/streams (Stremio Addon Protocol), TMDB API, integração Jellyfin/VLC para iPad legado (iOS 10 / Safari).
  - **Empacotamento Tizen**: `.wgt` assinado via SDB / TizenBrew Installer (porta 26101).

---

## 2. O que já foi feito (por arquivo/componente)

### A. Repositório `LeoBorba12/NuvioTVTizenBrew`
- **[`app/css/bundle.css`](file:///C:/Users/leona/Downloads/NuvioTVTizenBrew-main/NuvioTVTizenBrew-main/app/css/bundle.css)**:
  - Removidos 20 filtros pesados de `backdrop-filter: blur(...)` e mais de 170 sombras dinâmicas (`box-shadow`), que causavam engasgos de 100% de CPU na TV Samsung NU7100.
  - Substituídos por fundos sólidos translúcidos (`rgba(16, 18, 24, 0.96)`) e borda com alto contraste de foco (`outline: 3px solid #3d84ff`).
- **[`app/main.js`](file:///C:/Users/leona/Downloads/NuvioTVTizenBrew-main/NuvioTVTizenBrew-main/app/main.js)**:
  - Injetado o inicializador `initRemoteNavigation` que executa polling de autofoco em botões e elementos focáveis no boot da TV, garantindo que o controle remoto capture a navegação imediatamente.
- **[`app/app.bundle.js`](file:///C:/Users/leona/Downloads/NuvioTVTizenBrew-main/NuvioTVTizenBrew-main/app/app.bundle.js)**:
  - **Correção da navegação no menu superior "Início"**: O comando direcional `down` no menu "Início" agora salta diretamente para as linhas de conteúdo (`Streaming Services`, `Netflix`, `Prime Video`, etc.), impedindo que o cursor fique preso na pílula do cabeçalho.
  - **Prevenção do esqueleto vazio do "Continuar assistindo"**: Ajustada a preferência inicial para não travar o carregamento na grade vazia quando o usuário ainda não tiver histórico local/remoto sincronizado.

### B. Repositório `LeoBorba12/addon-catalogo-betor`
- **Modularização Arquitetural**: Monólito dividido em `api/routes.js`, `api/providers.js`, `api/utils.js` e `api/jellyfin.js`.
- **Caches com Limite de Memória (SWR)**: `catalogSliceCache` e `imdbStatsMap` com invalidação temporizada para evitar vazamento de memória na Vercel.
- **Player iPad / Safari iOS 10**: Compatibilidade ES5 estrita em `renderIpadVlcWebApp` para streaming em dispositivos Apple legados.

### C. Pacote Nativo WGT
- **`NuvioTV-Samsung-UN50NU7100.wgt`**: Criado e assinado com certificado DUID `EXCFC64RGFBJY`. Devido à trava de política da Samsung no Tizen 4.0 comercial (erro `118012` por falta de perfil Partner registrado no Seller Office), o canal principal de execução estabelecido é o **TizenBrew**.

---

## 3. O que está em andamento e o que falta (Ordem de Prioridade)

1. **[Alta Prioridade] Teste de Navegação e Reprodução na TV**:
   - Abrir o módulo atualizado `LeoBorba12/NuvioTVTizenBrew` na TV Samsung NU7100.
   - Validar se as teclas direcionais (Baixo/Direita) respondem com agilidade saindo do botão "Início" e se o clique em um título carrega os streams e abre o player nativo (`webapis.avplay`).
2. **[Média Prioridade] Ajuste de Fallback no Player Nativo**:
   - Caso algum codec de áudio/vídeo específico (ex: EAC3 / HEVC de alta taxa) apresente tela preta no player `avplay`, garantir fallback para reprodução compatível com a GPU da NU7100.
3. **[Baixa Prioridade] Empacotamento WGT Standalone Alternativo**:
   - Manter os arquivos de assinatura preparados caso o usuário decida converter o módulo em WGT com privilégios reduzidos `public` puros.

---

## 4. Decisões de Design Importantes
- **Cores & Tema**: Fundo escuro profundo (`#0d0d12` / `rgba(16, 18, 24, 0.96)`) com texto claro (`#f5f5f5`). Eliminadas transparências com blur gaussianos devido à limitação de taxa de preenchimento (fillrate) da GPU da TV 4K.
- **Indicador de Foco**: Destaque de seleção nítido e sem sombra (`outline: 3px solid #3d84ff`, `outline-offset: 2px`).
- **Tipografia**: Fontes do sistema e sans-serif padrão para reduzir custo de decodificação de fontes personalizadas na memória RAM da TV.
- **Animações**: Transições de opacidade e movimento desativadas ou simplificadas (`transform` 2D direto sem escalas pesadas) para manter 60 FPS estáveis na TV.

---

## 5. Problemas Conhecidos e Bugs
- **Erro `118012` na instalação via WGT direto**:
  - *Causa*: O firmware da Samsung UN50NU7100 exige assinatura de distribuidor com privilégios de parceiro aprovados pela Samsung para apps com certas APIs de sistema.
  - *Mitigação*: Utilizar o TizenBrew (`TizenBrewInstaller-win-x64.exe`), que executa o app em ambiente de sandbox sem rejeição de assinatura.
- **Travamento de Foco no Início**:
  - *Causa*: O componente da pílula "Início" não permitia o evento D-pad `down` saltar para o array principal de linhas. Corrigido no commit `c96210a`.

---

## 6. Próximo Passo Exato
1. Na Samsung TV, abrir o **TizenBrew**, entrar no módulo **Nuvio TV** (já sincronizado com `LeoBorba12/NuvioTVTizenBrew` no commit `c96210a`) e pressionar a **seta para Baixo**.
2. Confirmar a navegação nos cards de streaming e selecionar um filme/série para testar a reprodução do player.
