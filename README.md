# FIAP Pos Tech API

[![CI](https://github.com/jhonataneduardo/fiap-pos-tech-api/workflows/CI/badge.svg)](https://github.com/jhonataneduardo/fiap-pos-tech-api/actions/workflows/ci.yml)
[![CD](https://github.com/jhonataneduardo/fiap-pos-tech-api/workflows/CD/badge.svg)](https://github.com/jhonataneduardo/fiap-pos-tech-api/actions/workflows/cd.yml)
[![Code Quality](https://github.com/jhonataneduardo/fiap-pos-tech-api/workflows/Code%20Quality%20%26%20Security/badge.svg)](https://github.com/jhonataneduardo/fiap-pos-tech-api/actions/workflows/code-quality.yml)

API de gerenciamento de clientes e veículos (Write + Read) construída com Clean Architecture e DDD.

## 🚀 Quick Start

### Com Docker (Recomendado)

```bash
# 1. Clone e configure
cp .env.example .env

# 2. Inicie os serviços
docker compose --profile dev up -d

# 3. Execute as migrations
docker exec -it fiap-pos-tech-api-dev npx prisma migrate dev

# 4. Popule o banco (opcional)
docker exec -it fiap-pos-tech-api-dev npm run db:seed:dev
```

**Acesso:** http://localhost:3001/api-docs

### Local

```bash
npm install
npx prisma migrate dev
npm run db:seed:dev  # opcional
npm run dev
```

## 📚 Stack Técnica

- **Runtime:** Node.js 18+ + TypeScript
- **Framework:** Express.js
- **ORM:** Prisma + PostgreSQL
- **Auth:** JWT (Keycloak via fiap-pos-tech-auth)
- **Docs:** Swagger UI
- **Tests:** Jest
- **Container:** Docker

## 🏗️ Arquitetura

Clean Architecture em 3 camadas + DDD:

```
src/
├── core/                    # Infraestrutura compartilhada
│   ├── application/         # Interfaces de use cases
│   ├── domain/              # Entidades base
│   └── infrastructure/      # Database, HTTP, DI, Swagger
│
└── modules/
    └── vehicles/            # Bounded Context
        ├── domain/          # Entidades + Interfaces de Repositórios
        ├── application/     # Use Cases + DTOs + Controllers
        └── infrastructure/  # HTTP Controllers + Repositories + Presenters
```

**Aliases de importação:**
- `@/` → `src`
- `@core/` → `src/core`
- `@modules/` → `src/modules`
- `@config/` → `src/config`

## 🔐 Autenticação

Todas as rotas (exceto `/health`) requerem JWT do [fiap-pos-tech-auth](../fiap-pos-tech-auth).

```bash
# 1. Obter token
curl -X POST http://localhost:3002/auth/login \
  -H "Content-Type: application/json" \
  -d '{"cpf":"12345678901","password":"SenhaForte123"}'

# 2. Usar nas requisições
curl http://localhost:3001/api/v1/customers \
  -H "Authorization: Bearer <TOKEN>"
```

## 📡 API Endpoints

### Clientes
- `POST /customers` - Cadastrar cliente
- `GET /customers` - Listar todos

### Veículos
- `POST /vehicles` - Cadastrar veículo
- `GET /vehicles` - Listar todos
- `GET /vehicles/:id` - Buscar veículo por ID
- `PATCH /vehicles/:id` - Atualizar veículo

### Sistema
- `GET /health` - Health check (pública)

**Documentação completa:** http://localhost:3001/api-docs

> **Nota:** Endpoints de vendas foram movidos para o serviço [fiap-pos-tech-api-sale](../fiap-pos-tech-api-sale).

## 🗄️ Banco de Dados

### Schema Principal

```prisma
model Customer {
  id        String   @id @default(uuid())
  name      String
  email     String   @unique
  cpf       String   @unique
  status    Status   @default(ACTIVE)
}

model Vehicle {
  id          String        @id @default(uuid())
  brand       String
  model       String
  year        Int
  price       Decimal
  color       String
  status      VehicleStatus @default(AVAILABLE)
}

enum Status { ACTIVE, INACTIVE }
enum VehicleStatus { AVAILABLE, SOLD }
```

> **Nota:** O modelo `Sale` foi removido deste serviço. Vendas agora são gerenciadas exclusivamente pelo [fiap-pos-tech-api-sale](../fiap-pos-tech-api-sale).

### Comandos Úteis

```bash
# Migrations
npx prisma migrate dev         # Criar e aplicar migration
npx prisma migrate reset       # Reset completo

# Seed
npm run db:seed:dev            # Popular dados de exemplo

# Studio (GUI)
npx prisma studio              # http://localhost:5555
```

## 🛠️ Desenvolvimento

### Scripts NPM

```bash
npm run dev          # Dev server (hot reload)
npm run build        # Build produção
npm start            # Rodar build
npm test             # Testes
npm test:watch       # Testes em watch mode
```

### Docker Compose

```bash
# Dev
docker compose --profile dev up -d
docker compose --profile dev logs -f

# Produção
docker compose --profile prd up -d --build

# Gerenciar
docker compose ps
docker compose down
docker exec -it fiap-pos-tech-api-dev sh
```

### Variáveis de Ambiente

```env
# Database
DATABASE_URL=postgresql://fiap_pos_tech_user:fiap_pos_tech_password@fiap-pos-tech-api-db:5432/fiap_pos_tech_db

# Server
PORT=3001
NODE_ENV=development

# Auth
KEYCLOAK_URL=http://fiap-keycloak:8080
KEYCLOAK_REALM=fiap-pos-tech
KEYCLOAK_CLIENT_ID=pos-tech-api
```

## 🧪 Testes

```bash
npm test              # Rodar todos os testes
npm test:watch        # Watch mode
```

## 🚀 CI/CD

Pipeline completo com GitHub Actions:

- **CI:** Testes + Code Quality + Security Scan (PRs)
- **CD:** Deploy automático (main/develop)
- **Release:** Semantic versioning automático

**Conventional Commits:**
```bash
feat: nova funcionalidade      # MINOR
fix: correção de bug           # PATCH
docs: documentação             
refactor: refatoração          # PATCH
```

📖 [Documentação completa do CI/CD](docs/CI-CD-PIPELINE.md)

## 🔗 Ecossistema

Este serviço faz parte de uma arquitetura de microserviços:

- **[fiap-pos-tech-auth](../fiap-pos-tech-auth)** - Autenticação (Keycloak)
- **[fiap-pos-tech-api-sale](../fiap-pos-tech-api-sale)** - Vendas e Consultas (Read)
- **[fiap-pos-tech-development-environment](../)** - Orquestração local

## 📄 Licença

MIT

---

**FIAP Pós-Tech - Arquitetura de Software**
