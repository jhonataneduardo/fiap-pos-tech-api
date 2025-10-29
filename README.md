# FIAP Pos Tech API

[![CI](https://github.com/jhonataneduardo/fiap-pos-tech-api/workflows/CI/badge.svg)](https://github.com/jhonataneduardo/fiap-pos-tech-api/actions/workflows/ci.yml)
[![CD](https://github.com/jhonataneduardo/fiap-pos-tech-api/workflows/CD/badge.svg)](https://github.com/jhonataneduardo/fiap-pos-tech-api/actions/workflows/cd.yml)
[![Code Quality](https://github.com/jhonataneduardo/fiap-pos-tech-api/workflows/Code%20Quality%20%26%20Security/badge.svg)](https://github.com/jhonataneduardo/fiap-pos-tech-api/actions/workflows/code-quality.yml)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

API para gerenciamento de vendas de veículos desenvolvida como parte do Tech Challenge do curso de Arquitetura de Software da FIAP.

## Descrição

Esta API implementa um sistema completo de gerenciamento de vendas de veículos, seguindo os princípios da Clean Architecture e Domain-Driven Design (DDD). O sistema permite o cadastro de clientes, veículos, realização de vendas e integração com webhooks para atualização de status de pagamento.

## Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **TypeScript** - Linguagem de programação
- **Express.js** - Framework web
- **Prisma** - ORM para banco de dados
- **PostgreSQL** - Banco de dados relacional
- **Keycloak** - Autenticação e autorização (integrado via fiap-pos-tech-auth)
- **JWT** - JSON Web Tokens para autenticação
- **Docker** - Containerização
- **Jest** - Framework de testes
- **Swagger** - Documentação da API
- **UUID v7** - Geração de identificadores únicos

## Estrutura do Projeto

O projeto segue os princípios de **Clean Architecture** e **Domain-Driven Design (DDD)**, organizando o código em camadas bem definidas:

```
fiap-pos-tech-api/
├── src/
│   ├── app.ts                              # Configuração do Express
│   ├── server.ts                           # Entry point da aplicação
│   │
│   ├── config/                             # Configurações de ambiente
│   │   └── index.ts                        # Variáveis de ambiente centralizadas
│   │
│   ├── core/                               # Núcleo da aplicação (camadas compartilhadas)
│   │   ├── application/                    # Camada de aplicação
│   │   │   ├── use-case.interface.ts       # Interface base para casos de uso
│   │   │   └── errors/
│   │   │       └── app.error.ts            # Erros customizados da aplicação
│   │   │
│   │   ├── domain/                         # Camada de domínio
│   │   │   └── entities/
│   │   │       └── base.entity.ts          # Entidade base
│   │   │
│   │   └── infrastructure/                 # Camada de infraestrutura compartilhada
│   │       ├── database/                   # Configuração do banco de dados
│   │       │   ├── prisma.client.ts        # Cliente Prisma singleton
│   │       │   ├── seed.ts                 # Seed de dados de exemplo
│   │       │   └── transaction.ts          # Gerenciamento de transações
│   │       │
│   │       ├── di/                         # Dependency Injection
│   │       │   ├── container.ts            # Container de dependências
│   │       │   └── setup.ts                # Configuração das dependências
│   │       │
│   │       ├── http/                       # Configuração HTTP
│   │       │   ├── routes.ts               # Registro de rotas
│   │       │   ├── responses.ts            # Respostas padronizadas
│   │       │   └── middlewares/
│   │       │       └── auth.middleware.ts  # Middleware de autenticação JWT
│   │       │
│   │       └── swagger/                    # Documentação da API
│   │           ├── index.ts                # Configuração do Swagger
│   │           ├── paths/                  # Definições de endpoints
│   │           │   ├── customer.ts
│   │           │   ├── health.ts
│   │           │   ├── index.ts
│   │           │   ├── sale.ts
│   │           │   └── vehicle.ts
│   │           └── schemas/                # Schemas de dados
│   │               ├── common.ts
│   │               ├── customer.ts
│   │               ├── index.ts
│   │               ├── sale.ts
│   │               └── vehicle.ts
│   │
│   └── modules/                            # Módulos de domínio
│       └── vehicle_sales/                  # Módulo de vendas de veículos
│           │
│           ├── application/                # Camada de aplicação do módulo
│           │   ├── controllers/            # Controllers de negócio
│           │   │   ├── customer.controller.ts
│           │   │   ├── sale.controller.ts
│           │   │   └── vehicle.controller.ts
│           │   │
│           │   ├── dtos/                   # Data Transfer Objects
│           │   │   ├── customer.dto.ts
│           │   │   ├── sale.dto.ts
│           │   │   └── vehicle.dto.ts
│           │   │
│           │   └── usecases/               # Casos de uso (regras de negócio)
│           │       ├── customer/
│           │       │   ├── list-all-customers.usecase.ts
│           │       │   └── register-new-customer.usecase.ts
│           │       ├── vehicle/
│           │       │   ├── find-available-vehicles.usecase.ts
│           │       │   ├── find-sold-vehicles.usecase.ts
│           │       │   ├── list-all-vehicles.usecase.ts
│           │       │   ├── register-new-vehicle.usecase.ts
│           │       │   └── update-vehicle.usecase.ts
│           │       └── sale/
│           │           ├── register-new-sale.usecase.ts
│           │           └── update-payment-status.usecase.ts
│           │
│           ├── domain/                     # Camada de domínio do módulo
│           │   ├── entities/               # Entidades de domínio
│           │   │   ├── customer.entity.ts
│           │   │   ├── enums.ts
│           │   │   ├── sale.entity.ts
│           │   │   └── vehicle.entity.ts
│           │   │
│           │   └── repositories/           # Interfaces de repositórios
│           │       ├── customer-respository.interface.ts
│           │       ├── sale-respository.interface.ts
│           │       └── vehicle-respository.interface.ts
│           │
│           └── infrastructure/             # Camada de infraestrutura do módulo
│               ├── controllers/            # Controllers HTTP (API)
│               │   └── http/
│               │       ├── customer-api.controller.ts
│               │       ├── sale-api.controller.ts
│               │       └── vehicle-api.controller.ts
│               │
│               ├── database/               # Persistência de dados
│               │   ├── mappers/            # Conversão entre entidades e Prisma
│               │   │   ├── customer.mapper.ts
│               │   │   ├── sale.mapper.ts
│               │   │   └── vehicle.mapper.ts
│               │   │
│               │   └── repositories/       # Implementação dos repositórios
│               │       ├── customer.repository.ts
│               │       ├── sale.repository.ts
│               │       └── vehicle.repository.ts
│               │
│               ├── http/                   # Rotas HTTP
│               │   ├── customer.routes.ts
│               │   ├── sale.routes.ts
│               │   └── vehicle.routes.ts
│               │
│               └── presenters/             # Formatação de respostas
│                   ├── available-vehicles.presenter.ts
│                   ├── list-customers.presenter.ts
│                   ├── list-vehicles.presenter.ts
│                   ├── register-customer.presenter.ts
│                   ├── register-sale.presenter.ts
│                   ├── register-vehicle.presenter.ts
│                   ├── sold-vehicles.presenter.ts
│                   ├── update-payment-status.presenter.ts
│                   └── update-vehicle.presenter.ts
│
├── prisma/                                 # Prisma ORM
│   ├── schema.prisma                       # Schema do banco de dados
│   └── migrations/                         # Migrações do banco
│       ├── migration_lock.toml
│       └── 20250709172545_init/
│           └── migration.sql
│
├── docs/                                   # Documentação adicional
│   └── diagrams/                           # Diagramas de arquitetura
│
├── init-scripts/                           # Scripts de inicialização do DB
│
├── .kubernetes/                            # Configurações Kubernetes
│   ├── api-deployment.yaml
│   ├── api-service.yaml
│   ├── cleanup-kuberntes.sh
│   ├── configmap.yaml
│   ├── deploy-kuberntes.sh
│   ├── hpa.yaml
│   ├── namespace.yaml
│   ├── postgres-deployment.yaml
│   ├── postgres-pv.yaml
│   ├── postgres-service.yaml
│   └── secret.yaml
│
├── .env                                    # Variáveis de ambiente (não versionado)
├── .env.example                            # Exemplo de variáveis de ambiente
├── .gitignore                              # Arquivos ignorados pelo Git
├── .dockerignore                           # Arquivos ignorados pelo Docker
├── docker-compose.yml                      # Orquestração dos serviços
├── Dockerfile                              # Build de produção
├── Dockerfile.dev                          # Build de desenvolvimento
├── jest.config.js                          # Configuração do Jest
├── package.json                            # Dependências e scripts
├── tsconfig.json                           # Configuração do TypeScript
├── webpack.config.js                       # Configuração do Webpack
└── README.md                               # Este arquivo
```

### Explicação da Arquitetura

**Clean Architecture em 3 Camadas:**

1. **Domain (Domínio)** 🏛️
   - Entidades de negócio (`entities/`)
   - Interfaces de repositórios (`repositories/`)
   - Enums e tipos de domínio
   - Regras de negócio puras, independentes de frameworks

2. **Application (Aplicação)** 💼
   - Casos de uso (`usecases/`)
   - Controllers de negócio (`controllers/`)
   - DTOs para validação e transformação de dados (`dtos/`)
   - Orquestra a lógica de negócio

3. **Infrastructure (Infraestrutura)** 🔧
   - Implementação de repositórios (Prisma)
   - Controllers HTTP/API
   - Rotas e middlewares
   - Mappers para conversão de dados
   - Presenters para formatação de respostas
   - Integrações externas (banco de dados, APIs, etc.)

**Padrões de Design Utilizados:**

- **Repository Pattern**: Abstração da camada de dados
- **Use Case Pattern**: Encapsulamento de regras de negócio
- **Factory Pattern**: Criação de instâncias (via DI)
- **Mapper Pattern**: Conversão entre entidades e modelos de dados
- **Presenter Pattern**: Formatação de respostas HTTP
- **Dependency Injection**: Inversão de controle e gerenciamento de dependências
- **SOLID Principles**: Código limpo e manutenível

## Instalação e Execução

### Pré-requisitos

- Node.js 18+
- Docker e Docker Compose
- Yarn ou npm

### Configuração do Ambiente

1. **Clone o repositório:**
```bash
git clone https://github.com/jhonataneduardo/fiap-pos-tech-api.git
cd fiap-pos-tech-api
```

2. **Configure as variáveis de ambiente:**
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:
```env
DATABASE_URL=postgresql://fiap_pos_tech_user:fiap_pos_tech_password@fiap-pos-tech-db:5432/fiap_pos_tech_db
PORT=3001
NODE_ENV=development
WEBHOOK_SECRET=your_webhook_secret_key
POSTGRES_DB=fiap_pos_tech_db
POSTGRES_USER=fiap_pos_tech_user
POSTGRES_PASSWORD=fiap_pos_tech_password
DB_PORT=5432
```

### Execução com Docker (Recomendado)

**Ambiente de Desenvolvimento:**
```bash
docker-compose --profile dev up --build
```

### Execução Local

1. **Instale as dependências:**
```bash
npm install
```

2. **Execute as migrações do banco:**
```bash
npx prisma migrate dev
```

3. **Execute o seed do banco (opcional):**
```bash
npm run db:seed:dev
```

4. **Inicie o servidor de desenvolvimento:**
```bash
npm run dev
```

## Autenticação

Esta API utiliza **autenticação baseada em JWT** fornecida pelo serviço [fiap-pos-tech-auth](https://github.com/jhonataneduardo/fiap-pos-tech-auth) integrado com **Keycloak**.

### Rotas Protegidas

**Todas as rotas da API requerem autenticação**, exceto:
- `GET /health` - Health check do sistema

### Como Obter um Token

1. **Inicie o serviço de autenticação:**
```bash
cd ../fiap-pos-tech-auth
docker-compose up -d
```

2. **Registre um novo usuário:**
```bash
curl -X POST http://localhost:3002/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "cpf": "12345678901",
    "password": "SenhaForte123",
    "email": "usuario@example.com",
    "firstName": "João",
    "lastName": "Silva"
  }'
```

3. **Faça login para obter os tokens:**
```bash
curl -X POST http://localhost:3002/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "cpf": "12345678901",
    "password": "SenhaForte123"
  }'
```

Resposta:
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJSUzI1NiIsInR5cC...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cC...",
    "expiresIn": 3600,
    "tokenType": "Bearer"
  }
}
```

### Usando o Token

Inclua o token no header `Authorization` de todas as requisições:

```bash
curl -X GET http://localhost:3001/api/v1/customers \
  -H "Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cC..."
```

### Renovando o Token

Quando o access token expirar (após 1 hora), use o refresh token:

```bash
curl -X POST http://localhost:3002/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cC..."
  }'
```

### Configuração do Keycloak

Certifique-se de configurar as variáveis de ambiente no `.env`:

```env
KEYCLOAK_URL=http://localhost:8080
KEYCLOAK_REALM=fiap-pos-tech
KEYCLOAK_CLIENT_ID=pos-tech-api
```

**Importante:** O Keycloak deve estar rodando e acessível para que a validação de tokens funcione corretamente.

## Documentação da API

### Swagger UI
A documentação interativa da API está disponível em:
```
http://localhost:3001/api-docs
```

### Base URL
```
http://localhost:3001/api/v1
```

## Configuração

### Variáveis de Ambiente

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `DATABASE_URL` | URL de conexão com PostgreSQL | `postgresql://user:pass@localhost:5432/db` |
| `PORT` | Porta do servidor | `3001` |
| `NODE_ENV` | Ambiente de execução | `development` |
| `WEBHOOK_SECRET` | Chave secreta para webhooks | `your_webhook_secret_key` |
| `POSTGRES_DB` | Nome do banco de dados | `fiap_pos_tech_db` |
| `POSTGRES_USER` | Usuário do PostgreSQL | `fiap_pos_tech_user` |
| `POSTGRES_PASSWORD` | Senha do PostgreSQL | `fiap_pos_tech_password` |
| `DB_PORT` | Porta do PostgreSQL | `5432` |
| `KEYCLOAK_URL` | URL do Keycloak | `http://localhost:8080` |
| `KEYCLOAK_REALM` | Nome do realm | `fiap-pos-tech` |
| `KEYCLOAK_CLIENT_ID` | ID do client | `pos-tech-api` |

### Aliases de Importação

O projeto utiliza aliases para simplificar as importações:

- `@/` → `src`
- `@core/` → `src/core`
- `@modules/` → `src/modules`
- `@config/` → `src/config`

## Arquitetura

O projeto segue os princípios da **Clean Architecture** com **Domain-Driven Design**:

### Camadas

1. **Domain** - Entidades e regras de negócio
2. **Application** - Casos de uso e DTOs
3. **Infrastructure** - Implementações técnicas (banco, HTTP, etc.)

### Padrões Utilizados

- **Repository Pattern** - Abstração da camada de dados
- **Factory Pattern** - Criação de instâncias
- **Dependency Injection** - Inversão de controle
- **Use Case Pattern** - Encapsulamento de regras de negócio
- **SOLID**: Princípios de design de software
- **TypeScript**: Tipagem forte e interfaces bem definidas

## Status da Aplicação

### Funcionalidades Implementadas

- ✅ **Clientes**
  - Cadastro de clientes
  - Listagem de clientes com filtros
  - Busca de cliente por CPF
  - Validação de CPF único

- ✅ **Veículos**
  - Cadastro de veículos
  - Listagem de veículos
  - Atualização parcial de veículos
  - Listagem de veículos disponíveis
  - Listagem de veículos vendidos

- ✅ **Vendas**
  - Criação de vendas
  - Geração automática de código de pagamento
  - Webhook de atualização de status de pagamento
  - Validação de cliente e veículo existentes

- ✅ **Sistema**
  - Health check endpoint
  - Seed de dados de exemplo
  - Migrações automáticas
  - Containerização com Docker
  - Logging com Morgan
  - Segurança com Helmet
  - CORS configurado
  - Documentação Swagger

### Regras de Negócio

1. **Clientes**
   - Email deve ser único
   - CPF deve ser único
   - Status pode ser ACTIVE ou INACTIVE

2. **Veículos**
   - Todos os campos são obrigatórios
   - Preço deve ser um número positivo
   - Ano deve ser um número inteiro

3. **Vendas**
   - Cliente deve existir e estar ativo
   - Veículo deve existir e estar disponível
   - Código de pagamento é gerado automaticamente (PAY-XXXXXXXX)
   - Status inicial é sempre PENDING
   - Preço total é copiado do preço do veículo

## Links Úteis

- [Documentação do Prisma](https://www.prisma.io/docs)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Domain-Driven Design](https://martinfowler.com/bliki/DomainDrivenDesign.html)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Swagger Documentation](https://swagger.io/docs/)