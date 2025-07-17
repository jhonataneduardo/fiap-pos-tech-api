# FIAP Pos Tech API

API para gerenciamento de vendas de veículos desenvolvida como parte do Tech Challenge do curso de Arquitetura de Software da FIAP.

## Descrição

Esta API implementa um sistema completo de gerenciamento de vendas de veículos, seguindo os princípios da Clean Architecture e Domain-Driven Design (DDD). O sistema permite o cadastro de clientes, veículos, realização de vendas e integração com webhooks para atualização de status de pagamento.

## Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **TypeScript** - Linguagem de programação
- **Express.js** - Framework web
- **Prisma** - ORM para banco de dados
- **PostgreSQL** - Banco de dados relacional
- **Docker** - Containerização
- **Jest** - Framework de testes
- **Swagger** - Documentação da API
- **UUID v7** - Geração de identificadores únicos

## Estrutura do Projeto

```
src/
├── app.ts                          # Configuração principal da aplicação
├── server.ts                       # Servidor HTTP
├── config/                         # Configurações da aplicação
│   └── index.ts
├── core/                           # Camada central da aplicação
│   ├── application/
│   │   ├── use-case.interface.ts   # Interface para casos de uso
│   │   └── errors/                 # Erros da aplicação
│   ├── domain/
│   │   └── entities/               # Entidades base
│   └── infrastructure/
│       ├── database/               # Configuração do banco
│       │   ├── prisma.client.ts    # Cliente Prisma
│       │   ├── seed.ts             # Dados de exemplo
│       │   └── transaction.ts      # Transações
│       ├── di/                     # Injeção de dependências
│       ├── http/                   # Configuração HTTP
│       │   ├── routes.ts           # Rotas principais
│       │   └── responses.ts        # Respostas padronizadas
│       └── swagger/                # Documentação Swagger
└── modules/
    └── vehicle_sales/              # Módulo de vendas de veículos
        ├── application/
        │   ├── dtos/               # Data Transfer Objects
        │   │   ├── customer.dto.ts
        │   │   ├── vehicle.dto.ts
        │   │   └── sale.dto.ts
        │   └── usecases/           # Casos de uso
        │       ├── customer/       # Casos de uso de clientes
        │       ├── vehicle/        # Casos de uso de veículos
        │       └── sale/           # Casos de uso de vendas
        ├── domain/
        │   ├── entities/           # Entidades do domínio
        │   │   ├── customer.entity.ts
        │   │   ├── vehicle.entity.ts
        │   │   ├── sale.entity.ts
        │   │   └── enums.ts
        │   └── repositories/       # Interfaces dos repositórios
        │       ├── customer-respository.interface.ts
        │       ├── vehicle-respository.interface.ts
        │       └── sale-respository.interface.ts
        └── infrastructure/
            ├── controllers/        # Controladores HTTP
            │   ├── customer.controller.ts
            │   ├── vehicle.controller.ts
            │   └── sale.controller.ts
            ├── database/           # Implementação dos repositórios
            │   └── repositories/
            │       ├── customer.repository.ts
            │       ├── vehicle.repository.ts
            │       └── sale.repository.ts
            ├── factories/          # Factories para casos de uso
            │   ├── customer-usecase.factory.ts
            │   ├── vehicle-usecase.factory.ts
            │   └── sale-usecase.factory.ts
            └── http/               # Rotas HTTP
                ├── customer.routes.ts
                ├── vehicle.routes.ts
                └── sale.routes.ts
```

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

**Ambiente de Produção:**
```bash
docker-compose --profile production up --build
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

5. **Para produção:**
```bash
npm run build
npm start
```

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

---

*Desenvolvido como parte do Tech Challenge do curso de Arquitetura de Software da FIAP.*