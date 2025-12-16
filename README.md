# Sistema Gerenciador de Tarefas Seguro (Projeto de Estudo)

Este repositório contém um **projeto prático para estudo** com foco em **autenticação segura (JWT)**, **persistência com Prisma** e **solidificação de fundamentos** de arquitetura no backend (NestJS) e frontend (React).

O objetivo é construir (em 1–2 dias) um sistema simples de **gerenciamento de tarefas** com **login obrigatório**, seguindo práticas comuns de aplicações corporativas.

## Visão geral

- **Backend**: API REST em **NestJS (TypeScript)**, com **estrutura em camadas/MVC**, validação de dados e autenticação.
- **Frontend**: aplicação em **React + Vite** com telas de **Login** e **Lista de Tarefas** (rotas protegidas).
- **Banco de dados**: **MySQL** (via Docker ou local).  

## Stack e finalidades

### API (`api/`)

- **NestJS**: framework Node.js para construir a API de forma modular e escalável.
- **TypeScript**: tipagem estática, melhor DX e maior segurança na evolução do código.
- **JWT (`@nestjs/jwt`, `passport-jwt`)**: autenticação baseada em token.
- **Cookie HttpOnly (`cookie-parser`)**: armazenar o token de sessão de forma mais segura no navegador (não acessível por JavaScript).
- **Prisma (`prisma`, `@prisma/client`)**: ORM para modelagem e consultas ao banco, migrations e tipagem do acesso a dados.
- **bcrypt**: hash de senhas (nunca armazenar senha em texto puro).
- **class-validator / class-transformer**: validação e transformação de DTOs (entrada/saída).
- **Arquitetura (MVC/camadas)**: separar responsabilidades (Controllers, Services, Data Access/Prisma), facilitando testes, manutenção e aplicação de princípios SOLID.

### Frontend (`administration/`)

- **React**: UI declarativa e componentizada.
- **Vite**: bundler/dev server rápido para desenvolvimento.
- **TypeScript**: tipagem também no client, mantendo consistência com a API.
- **Fluxo de autenticação**: login que recebe/gera cookie HttpOnly e **rotas protegidas** para a lista de tarefas.

## Escopo funcional (MVP)

- **Autenticação**
  - Cadastro e/ou login de usuário.
  - API emite JWT e grava em **cookie HttpOnly**.
  - Logout removendo o cookie.
- **Tarefas**
  - CRUD de tarefas (listar, criar, editar, concluir, remover).
  - Tarefas vinculadas ao usuário autenticado.
- **Proteção**
  - Rotas de tarefas exigem autenticação.
  - Validação de payloads (DTOs).

## Como rodar (desenvolvimento)

### Pré-requisitos

- Node.js (LTS recomendado)
- NPM (ou PNPM/Yarn, se você preferir — o repo está com `package-lock.json`)
- Banco de dados **MySQL** (Docker ou local)

### 1) Banco de dados (MySQL)

Você pode usar MySQL local ou via Docker. Exemplo via Docker:

```bash
docker run --name tarefas-mysql ^
  -e MYSQL_ROOT_PASSWORD=root ^
  -e MYSQL_DATABASE=tarefas ^
  -p 3306:3306 ^
  -d mysql:8
```

### 2) Configurar Prisma (MySQL vs Postgres)

Arquivo: `api/prisma/schema.prisma`

- Para **MySQL**, ajuste o datasource:

```prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```

E configure a variável `DATABASE_URL` (exemplo MySQL):

```env
DATABASE_URL="mysql://root:root@localhost:3306/tarefas"
```

> Se você preferir Postgres, mantenha `provider = "postgresql"` e use uma `DATABASE_URL` compatível.

### 3) Rodar API (NestJS)

```bash
cd api
npm install
```

Gerar cliente Prisma e rodar migrations (quando existirem):

```bash
npx prisma generate
npx prisma migrate dev
```

Subir a API:

```bash
npm run start:dev
```

### 4) Criar/rodar Frontend (React + Vite)

Se o frontend ainda não foi criado:

```bash
npx create-vite@latest administration -- --template react-ts
cd administration
npm install
npm run dev
```

## Estrutura de pastas

- `api/`: backend NestJS + Prisma
- `administration/`: frontend React + Vite (planejado/reservado)

## Objetivo de aprendizado (por que este projeto existe)

Este projeto foi criado para:

- Entender **JWT na prática** (login, emissão, validação, expiração/refresh quando aplicável).
- Aprender e praticar **Prisma** (schema, migrations, relations, queries e boas práticas).
- Aplicar **arquitetura em camadas/MVC** e conceitos de **SOLID** no backend.
- Solidificar conhecimentos em **React** (componentização, estado, chamadas à API e rotas protegidas).


