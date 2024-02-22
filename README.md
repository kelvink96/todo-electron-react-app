# todo-electron-react-app

A todo desktop application built using Electron, React(Vite), Better-Sqlite3 and Ant Design.

![image](https://github.com/kelvink96/todo-electron-react-app/assets/26582923/14dcec28-df82-4170-8312-96afb59c5e73)

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Project Setup

### Install

```bash
$ pnpm install
```

### Development

```bash
$ pnpm dev
```

### Build

```bash
# For windows
$ pnpm build:win

# For macOS
$ pnpm build:mac

# For Linux
$ pnpm build:linux
```

## Project File Structure
- models
  - dbManager.ts - contains all db initializer configs
  - taskManager.ts - contains all SQL CRUD queries and statements for interacting with the tasks table
- interfaces - contains declared types/interfaces
- src
  - preload - has the written window api configurations serving as a middleware connecting database executions and exposing these functions to the client side in the renderer function
  - renderer - contains all the client side pages, routes (and respective configs), and components
