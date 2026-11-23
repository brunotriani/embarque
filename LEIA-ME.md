# Embarque Idiomas

**Versão 3:** conversa livre com IA (role-play com correção, avaliação e frases para revisão) e correção das respostas de entrevista. Grátis: dentro do Claude usa o Claude; no GitHub usa o Gemini com chave gratuita (Ajustes › Conversa com IA).

**Versão 2:** trilha Profissional (entrevista e reuniões), novos cenários de viagem (Aeroporto, Hotel, Compras, Transporte), treino do dia, blocos de frases com shadowing, revisão espaçada, Minhas respostas e página de método com sites gratuitos.

App gratuito para treinar idiomas de viagem: inglês americano, espanhol, italiano, francês, alemão e japonês. Funciona no iPhone, Android e Windows como app instalado (PWA).

## Arquivos

| Arquivo | Para que serve |
|---|---|
| `index.html` | O app inteiro (telas, conteúdo, voz, plano) |
| `manifest.webmanifest` | Nome e ícone para instalar como app |
| `sw.js` | Faz o app abrir sem internet |
| `icon-192.png`, `icon-512.png`, `apple-touch-icon.png` | Ícones |
| `artifact.html` | Só a prévia do Claude. Não precisa subir no GitHub |

## 1. Publicar no GitHub Pages (grátis)

1. No GitHub, crie um repositório público chamado `embarque`.
2. Em **Add file › Upload files**, envie todos os arquivos acima (menos `artifact.html` e este LEIA-ME, se quiser).
3. Em **Settings › Pages**, escolha **Deploy from a branch**, branch `main`, pasta `/ (root)` e salve.
4. Em 1 ou 2 minutos o app estará em `https://brunotriani.github.io/embarque/`.

## 2. Ativar login e sincronização (Firebase grátis)

Você pode usar o mesmo projeto Firebase da Caderneta. Assim o mesmo e-mail e senha funcionam nos dois apps.

1. No console do Firebase, abra o projeto e vá em **Configurações do projeto › Seus apps › Adicionar app › Web**. Dê o nome "Embarque".
2. Copie o objeto `firebaseConfig` que aparece.
3. Abra `index.html`, procure `const FIREBASE_CONFIG = null;` e troque `null` pelo objeto copiado:
   ```js
   const FIREBASE_CONFIG = {
     apiKey: "...",
     authDomain: "...",
     projectId: "...",
     appId: "..."
   };
   ```
4. Em **Authentication › Método de login**, confirme que **E-mail/senha** está ativo.
5. Em **Authentication › Configurações › Domínios autorizados**, confirme que `brunotriani.github.io` está na lista.
6. Em **Firestore Database › Regras**, acrescente este bloco dentro de `match /databases/{database}/documents { ... }`, sem apagar as regras da Caderneta:
   ```
   match /embarque/{uid} {
     allow read, write: if request.auth != null && request.auth.uid == uid;
   }
   ```
7. Suba o `index.html` alterado no GitHub.

Sem esse passo o app funciona do mesmo jeito, salvando o progresso só no aparelho.

## 3. Instalar nos aparelhos

- **iPhone:** abra o link no Safari › Compartilhar › Adicionar à Tela de Início.
- **Android:** abra no Chrome › menu ⋮ › Instalar app.
- **Windows:** abra no Edge ou Chrome › ícone de instalar na barra de endereço.

## 4. Vozes

O app usa as vozes do próprio aparelho. Se um idioma ficar mudo ou com sotaque errado, instale a voz:

- **Windows:** Configurações › Hora e idioma › Fala › Adicionar vozes.
- **iPhone:** Ajustes › Acessibilidade › Conteúdo Falado › Vozes (baixe as vozes "Aprimoradas").
- **Android:** Configurações › Saída de conversão de texto em voz › Mecanismo do Google › instalar dados de voz.

O reconhecimento de fala funciona melhor no Chrome e no Edge. No iPhone funciona no Safari; se falhar com o app aberto pela tela inicial, abra o link direto no Safari.

## 5. Publicar mudanças

Ao trocar o `index.html`, mude também a linha `const CACHE = "embarque-v1";` em `sw.js` para `v2`, `v3`… Assim os aparelhos baixam a versão nova.
