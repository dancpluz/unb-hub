# UNB Hub - Gerenciador de Grade Horária

Aplicativo para gerenciamento de horários de aulas universitárias com integração de calendário e banco de dados local.

## Pré-requisitos

- Node.js (v18+)
- Expo CLI (`npm install -g expo-cli`)
- Dispositivo móvel com [Expo Go](https://expo.dev/client) ou emulador Android/iOS

## 🚀 Como Executar

1. **Clonar o repositório**
   ```bash
   git clone https://github.com/seu-usuario/unb-hub.git
   cd unb-hub
   ```
2. **Instalar dependências**
   ```bash
   npm install
   ```
3. **Iniciar o aplicativo**
   ```bash
   expo start
   ```
4. **Escanear o QR code** com o Expo Go (Android/iOS)  
   Ou pressione:
   - `a` para Android Emulator
   - `i` para iOS Simulator
   - `w` para web

## 🗓️ Funcionalidades Principais

- Visualização semanal das aulas
- Adição de novas disciplinas com:
  - Seletor de horários
  - Escolha de dias da semana
  - Seleção de cores personalizadas
- Armazenamento local com SQLite
- Interface com Tailwind CSS

## 🛠️ Tecnologias

- Expo Router
- React Native
- SQLite
- NativeWind (Tailwind para React Native)
- React Hook Form

## ⚠️ Solução de Problemas Comuns

**Erro ao construir:**  
Se ocorrerem erros relacionados ao NativeWind:
```bash
npx expo start -c
```

**Banco de Dados:**  
Os dados são criados automaticamente na primeira execução
