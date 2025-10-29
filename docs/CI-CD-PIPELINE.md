# 🚀 CI/CD Pipeline - FIAP Pos Tech API

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Arquitetura do Pipeline](#arquitetura-do-pipeline)
- [Workflows Implementados](#workflows-implementados)
- [Configuração Inicial](#configuração-inicial)
- [Como Trabalhar com Pull Requests](#como-trabalhar-com-pull-requests)
- [Versionamento Automático](#versionamento-automático)
- [Deploy](#deploy)
- [Secrets e Variáveis](#secrets-e-variáveis)
- [Branch Protection Rules](#branch-protection-rules)
- [Troubleshooting](#troubleshooting)

---

## 🎯 Visão Geral

Este projeto implementa um pipeline completo de **CI/CD** (Continuous Integration / Continuous Deployment) utilizando **GitHub Actions**, seguindo as melhores práticas de desenvolvimento colaborativo e DevOps.

### Objetivos do Pipeline

✅ **Automatizar** testes e validações em cada Pull Request  
✅ **Garantir** a qualidade e segurança do código  
✅ **Simplificar** o processo de deploy  
✅ **Versionar** automaticamente usando Conventional Commits  
✅ **Documentar** mudanças através de changelogs automáticos  

---

## 🏗️ Arquitetura do Pipeline

```
┌─────────────────────────────────────────────────────────────┐
│                    Developer Workflow                        │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  Feature Branch → Pull Request → Code Review                │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    CI Pipeline (PR)                          │
│  ┌────────────┐  ┌────────────┐  ┌──────────────┐          │
│  │ Code       │  │ Tests      │  │ Docker       │          │
│  │ Quality    │→ │            │→ │ Build        │          │
│  └────────────┘  └────────────┘  └──────────────┘          │
│                                                              │
│  ┌────────────┐  ┌────────────┐                            │
│  │ Security   │  │ PR         │                            │
│  │ Scan       │→ │ Feedback   │                            │
│  └────────────┘  └────────────┘                            │
└─────────────────────────────────────────────────────────────┘
                            │
                    ✅ Aprovação
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Merge to Main/Develop                     │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    CD Pipeline (Deploy)                      │
│  ┌────────────┐  ┌────────────┐  ┌──────────────┐          │
│  │ Run Tests  │→ │ Build &    │→ │ Deploy       │          │
│  │            │  │ Push Image │  │ (Staging/    │          │
│  └────────────┘  └────────────┘  │  Production) │          │
│                                   └──────────────┘          │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│            Release Management & Changelog                    │
└─────────────────────────────────────────────────────────────┘
```

---

## 📦 Workflows Implementados

### 1. 🔄 CI - Continuous Integration (`ci.yml`)

**Gatilho:** Pull Requests para `main`, `develop`, e branches `feature/*`, `bugfix/*`, `hotfix/*`

**Jobs:**

#### 📊 Code Quality Check
- ✅ Compilação TypeScript
- ✅ Validação do schema Prisma
- ✅ Verificação de mudanças não comitadas

#### 🧪 Run Tests
- ✅ Execução de testes unitários e integração
- ✅ Geração de relatórios de cobertura
- ✅ Upload para Codecov
- ✅ PostgreSQL como service container

#### 🐳 Docker Build Test
- ✅ Build da imagem Docker
- ✅ Validação da imagem
- ✅ Cache de layers

#### 🔒 Security Scan
- ✅ Auditoria de dependências (yarn audit)
- ✅ Scan com Trivy
- ✅ Upload de resultados para GitHub Security

#### 💬 PR Feedback
- ✅ Comentários automáticos no PR com status dos jobs
- ✅ Atualização dinâmica dos comentários

**Exemplo de execução:**
```bash
# Triggered automaticamente ao abrir/atualizar um PR
```

---

### 2. 🚀 CD - Continuous Deployment (`cd.yml`)

**Gatilho:** Push para `main` ou `develop`, ou execução manual via `workflow_dispatch`

**Jobs:**

#### 🎯 Setup Deployment
- ✅ Determina ambiente (staging/production)
- ✅ Gera versionamento automático

#### 🧪 Run Tests
- ✅ Execução completa de testes (se não pulado manualmente)

#### 🏗️ Build & Push Docker Image
- ✅ Build da imagem Docker
- ✅ Push para GitHub Container Registry (ghcr.io)
- ✅ Tags múltiplas (latest, version, SHA, branch)
- ✅ Metadata e labels

#### 🌐 Deploy to Staging
- ✅ Deploy automático para staging (branch develop)
- ✅ Smoke tests
- ✅ Notificações

#### 🌟 Deploy to Production
- ✅ Deploy para produção (branch main)
- ✅ Backup antes do deploy
- ✅ Smoke tests
- ✅ Criação de GitHub Release
- ✅ Notificações

#### ⚠️ Rollback
- ✅ Rollback automático em caso de falha

**Exemplo de execução manual:**
```bash
# Via GitHub UI: Actions → CD - Continuous Deployment → Run workflow
# Escolha: environment (staging/production) e skip_tests (true/false)
```

---

### 3. 🔍 Code Quality & Security (`code-quality.yml`)

**Gatilho:** Pull Requests, Push para main/develop, Schedule (segundas 9h UTC), workflow_dispatch

**Jobs:**

#### 🎨 Lint Code
- ✅ Verificação de compilação TypeScript
- ✅ Formatação de código

#### 📦 Dependency Review
- ✅ Revisão de dependências em PRs
- ✅ Detecção de licenças problemáticas

#### 🔎 CodeQL Analysis
- ✅ Análise de segurança do código
- ✅ Detecção de vulnerabilidades
- ✅ Upload para GitHub Security

#### 🐳 Container Security Scan
- ✅ Scan de vulnerabilidades na imagem Docker
- ✅ Detecção de CVEs

#### 🛡️ OWASP Dependency Check
- ✅ Análise de dependências com vulnerabilidades conhecidas
- ✅ Relatórios em JSON

#### ⚖️ License Compliance
- ✅ Verificação de licenças de dependências

#### 📈 Code Coverage Trend
- ✅ Análise de cobertura de código
- ✅ Upload para Codecov
- ✅ Geração de badges

**Execução automática semanal:**
```yaml
schedule:
  - cron: '0 9 * * 1'  # Toda segunda-feira às 9h UTC
```

---

### 4. 📝 Release Management (`release.yml`)

**Gatilho:** Push para `main`, workflow_dispatch

**Jobs:**

#### 🤖 Semantic Release
- ✅ Análise de commits (Conventional Commits)
- ✅ Versionamento automático
- ✅ Geração de changelog
- ✅ Criação de tags
- ✅ Publicação de releases

#### ✋ Manual Version Bump
- ✅ Bump manual de versão (patch, minor, major)
- ✅ Criação de tags e releases

#### 📚 Generate Changelog
- ✅ Geração automática de CHANGELOG.md

#### 📖 Update Documentation
- ✅ Atualização de badges e documentação

---

### 5. 🤖 Dependabot (`dependabot.yml`)

**Configurações:**

- **NPM Dependencies:** Verificação semanal (segunda 09h BRT)
- **GitHub Actions:** Verificação semanal (segunda 10h BRT)
- **Docker:** Verificação semanal (segunda 11h BRT)

**Características:**
- ✅ Limite de 10 PRs de dependências npm simultaneamente
- ✅ Ignora atualizações major (breaking changes)
- ✅ Labels automáticas
- ✅ Reviewers automáticos

---

## ⚙️ Configuração Inicial

### 1. Repositório GitHub

```bash
# Clone o repositório
git clone https://github.com/jhonataneduardo/fiap-pos-tech-api.git
cd fiap-pos-tech-api

# Verifique que os workflows estão presentes
ls -la .github/workflows/
```

### 2. Secrets Necessários

Configure os seguintes secrets no GitHub:

#### Repository Secrets
- `CODECOV_TOKEN` - Token do Codecov (opcional, para relatórios de cobertura)

#### Environment Secrets

**Staging:**
- `STAGING_DEPLOY_KEY` - Chave SSH ou token para deploy em staging
- `STAGING_DATABASE_URL` - URL do banco de dados de staging

**Production:**
- `PRODUCTION_DEPLOY_KEY` - Chave SSH ou token para deploy em produção
- `PRODUCTION_DATABASE_URL` - URL do banco de dados de produção

**Como configurar:**
```
GitHub → Settings → Secrets and variables → Actions → New repository secret
```

### 3. Variáveis de Ambiente

Configure as variáveis em:
```
GitHub → Settings → Secrets and variables → Actions → Variables
```

Exemplo:
- `REGISTRY_URL` - URL do registry de containers
- `APP_NAME` - Nome da aplicação

### 4. Environments

Configure os environments:

**Staging:**
```
GitHub → Settings → Environments → New environment → staging
```
- ✅ Required reviewers: (opcional)
- ✅ Deployment branches: develop

**Production:**
```
GitHub → Settings → Environments → New environment → production
```
- ✅ Required reviewers: 2 (obrigatório)
- ✅ Wait timer: 5 minutos
- ✅ Deployment branches: main

---

## 🔀 Como Trabalhar com Pull Requests

### Passo a Passo

#### 1. Criar Branch

```bash
# Para nova funcionalidade
git checkout -b feature/nome-da-feature

# Para correção de bug
git checkout -b bugfix/nome-do-bug

# Para hotfix
git checkout -b hotfix/nome-do-hotfix
```

#### 2. Desenvolver e Commitar

Use **Conventional Commits**:

```bash
# Feature
git commit -m "feat: adiciona endpoint de criação de vendas"

# Bug fix
git commit -m "fix: corrige validação de email no cadastro de cliente"

# Breaking change
git commit -m "feat!: altera estrutura de resposta da API

BREAKING CHANGE: o campo 'data' agora retorna objeto ao invés de array"

# Outros tipos
git commit -m "docs: atualiza README com instruções de deploy"
git commit -m "test: adiciona testes para controller de veículos"
git commit -m "refactor: reorganiza estrutura de pastas"
git commit -m "perf: otimiza query de listagem de vendas"
git commit -m "ci: adiciona workflow de deploy automático"
```

**Tipos de commit:**
- `feat:` - Nova funcionalidade
- `fix:` - Correção de bug
- `docs:` - Mudanças na documentação
- `style:` - Formatação, ponto e vírgula, etc
- `refactor:` - Refatoração de código
- `perf:` - Melhorias de performance
- `test:` - Adição ou correção de testes
- `build:` - Mudanças no sistema de build
- `ci:` - Mudanças no CI/CD
- `chore:` - Outras mudanças

#### 3. Push e Criação do PR

```bash
git push origin feature/nome-da-feature
```

No GitHub:
1. Acesse: `Pull requests → New pull request`
2. Selecione base branch (`develop` ou `main`)
3. Selecione compare branch (sua feature)
4. Preencha o template de PR
5. Clique em `Create pull request`

#### 4. Aguardar CI Pipeline

O pipeline de CI será executado automaticamente:

```
✅ Code Quality Check
✅ Run Tests
✅ Docker Build Test
✅ Security Scan
✅ PR Feedback (comentário automático)
```

#### 5. Code Review

- Aguarde revisão de pelo menos 1 reviewer
- Responda comentários e faça ajustes se necessário
- Mantenha a branch atualizada com a base:

```bash
git fetch origin
git rebase origin/develop  # ou main
git push --force-with-lease
```

#### 6. Merge

Após aprovação:
- ✅ Todos os checks passaram
- ✅ Reviewers aprovaram
- ✅ Sem conflitos

**Estratégia de Merge:**
- **Squash and merge** (recomendado para features)
- **Rebase and merge** (para manter histórico linear)
- **Merge commit** (para release branches)

---

## 🏷️ Versionamento Automático

### Conventional Commits → Semantic Versioning

```
feat:     → MINOR version bump (0.1.0 → 0.2.0)
fix:      → PATCH version bump (0.1.0 → 0.1.1)
perf:     → PATCH version bump
BREAKING: → MAJOR version bump (0.1.0 → 1.0.0)
```

### Configuração (.releaserc.json)

O arquivo `.releaserc.json` configura o Semantic Release:

```json
{
  "branches": ["main"],
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    "@semantic-release/npm",
    "@semantic-release/git",
    "@semantic-release/github"
  ]
}
```

### Processo Automático

1. **Merge para main** → Trigger do workflow `release.yml`
2. **Análise de commits** desde a última release
3. **Cálculo da nova versão** baseado nos commits
4. **Geração de CHANGELOG.md** automático
5. **Criação de tag** Git (ex: v1.2.3)
6. **Publicação de release** no GitHub com notas automáticas
7. **Atualização de package.json** com nova versão

### Exemplo de Release Notes Gerado

```markdown
## [1.2.0] - 2025-10-28

### ✨ Features
- feat: adiciona endpoint de criação de vendas (#123)
- feat: implementa autenticação JWT (#124)

### 🐛 Bug Fixes
- fix: corrige validação de email no cadastro (#125)
- fix: resolve problema de conexão com banco (#126)

### 📚 Documentation
- docs: atualiza README com instruções de deploy (#127)
```

---

## 🚀 Deploy

### Ambientes

#### Staging
- **Branch:** `develop`
- **URL:** https://staging-api.fiap-pos-tech.com
- **Deploy:** Automático após merge
- **Aprovação:** Não requer

#### Production
- **Branch:** `main`
- **URL:** https://api.fiap-pos-tech.com
- **Deploy:** Automático após merge
- **Aprovação:** Requer 2 reviewers

### Fluxo de Deploy

```
Developer → PR → develop → Staging Deploy → Testes → PR para main → Production Deploy
```

### Deploy Manual

Para fazer deploy manual:

```bash
# Via GitHub UI
Actions → CD - Continuous Deployment → Run workflow

# Escolha:
Environment: staging | production
Skip tests: true | false
```

### Estratégias de Deploy

#### Blue-Green Deployment
```yaml
# Implementação no cd.yml (exemplo)
- name: Deploy Blue-Green
  run: |
    # Deploy para ambiente "green"
    # Smoke tests
    # Switch traffic de "blue" para "green"
    # Manter "blue" por 24h para rollback rápido
```

#### Canary Deployment
```yaml
# Implementação no cd.yml (exemplo)
- name: Canary Deployment
  run: |
    # Deploy para 10% do tráfego
    # Monitorar métricas
    # Gradualmente aumentar para 100%
```

### Rollback

#### Automático
O workflow `cd.yml` possui job de rollback automático em caso de falha.

#### Manual
```bash
# Via GitHub UI
Actions → CD - Continuous Deployment → Últimos runs
# Selecione versão anterior
# Re-run jobs
```

---

## 🔐 Secrets e Variáveis

### Estrutura de Secrets

```
Repository Secrets (disponível em todos workflows)
├── CODECOV_TOKEN
├── GITHUB_TOKEN (automático)

Environment Secrets: staging
├── STAGING_DEPLOY_KEY
├── STAGING_DATABASE_URL
└── STAGING_API_KEY

Environment Secrets: production
├── PRODUCTION_DEPLOY_KEY
├── PRODUCTION_DATABASE_URL
└── PRODUCTION_API_KEY
```

### Variáveis de Ambiente

```
Repository Variables
├── REGISTRY_URL
├── APP_NAME
└── DEFAULT_REGION
```

### Como Acessar nos Workflows

```yaml
# Secrets
${{ secrets.CODECOV_TOKEN }}
${{ secrets.GITHUB_TOKEN }}

# Variáveis
${{ vars.APP_NAME }}

# Environment secrets
${{ secrets.PRODUCTION_DATABASE_URL }}  # Disponível apenas no job com environment: production
```

---

## 🛡️ Branch Protection Rules

### Configuração Recomendada

#### Branch: `main`

```
GitHub → Settings → Branches → Add rule → main
```

**Regras:**

- ✅ **Require a pull request before merging**
  - Required approvals: 2
  - Dismiss stale reviews: ✅
  - Require review from Code Owners: ✅

- ✅ **Require status checks to pass before merging**
  - Require branches to be up to date: ✅
  - Status checks:
    - `Code Quality Check`
    - `Run Tests`
    - `Docker Build Test`
    - `Security Scan`

- ✅ **Require conversation resolution before merging**

- ✅ **Require signed commits**

- ✅ **Include administrators**

- ✅ **Restrict who can push to matching branches**
  - Only maintainers

- ✅ **Allow force pushes**: ❌
- ✅ **Allow deletions**: ❌

#### Branch: `develop`

```
GitHub → Settings → Branches → Add rule → develop
```

**Regras:**

- ✅ **Require a pull request before merging**
  - Required approvals: 1
  - Dismiss stale reviews: ✅

- ✅ **Require status checks to pass before merging**
  - Status checks (mesmos de main)

- ✅ **Require conversation resolution before merging**

- ✅ **Allow force pushes**: ❌
- ✅ **Allow deletions**: ❌

### CODEOWNERS

Crie o arquivo `.github/CODEOWNERS`:

```
# Default owners for everything
*                           @jhonataneduardo

# Workflows and CI/CD
/.github/                   @jhonataneduardo @devops-team

# Database and Prisma
/prisma/                    @jhonataneduardo @database-team

# API Documentation
/docs/                      @jhonataneduardo @docs-team

# Security
/src/core/infrastructure/http/middlewares/auth.middleware.ts  @security-team
```

---

## 🧪 Testes

### Estrutura de Testes

```
src/
└── modules/
    └── vehicle_sales/
        └── application/
            └── usecases/
                ├── create-customer.usecase.ts
                └── create-customer.usecase.spec.ts  # ← Teste
```

### Executar Testes Localmente

```bash
# Todos os testes
yarn test

# Com cobertura
yarn test --coverage

# Modo watch
yarn test:watch

# Específico
yarn test create-customer
```

### Padrões de Teste

```typescript
describe('CreateCustomerUseCase', () => {
  let useCase: CreateCustomerUseCase;
  let repository: CustomerRepository;

  beforeEach(() => {
    // Setup
  });

  it('should create a customer successfully', async () => {
    // Arrange
    const input = { /* ... */ };
    
    // Act
    const result = await useCase.execute(input);
    
    // Assert
    expect(result).toBeDefined();
  });

  it('should throw error when email is invalid', async () => {
    // ...
  });
});
```

---

## 🐛 Troubleshooting

### Problema: Workflow não executa

**Causa:** Padrão de branch incorreto ou paths-ignore

**Solução:**
```yaml
# Verifique em .github/workflows/ci.yml
on:
  pull_request:
    branches:
      - main
      - develop
      - 'feature/**'  # Certifique-se que sua branch match
```

### Problema: Testes falhando no CI mas passam local

**Causa:** Diferenças de ambiente

**Solução:**
```bash
# Use as mesmas variáveis de ambiente do CI
export DATABASE_URL=postgresql://testuser:testpass@localhost:5432/testdb
export NODE_ENV=test

# Execute os testes
yarn test --ci
```

### Problema: Docker build falha

**Causa:** Falta de dependências ou erro no Dockerfile

**Solução:**
```bash
# Build local para verificar
docker build -t test-image .

# Verificar logs
docker build -t test-image . --progress=plain --no-cache
```

### Problema: Deploy falha

**Causa:** Secrets não configurados ou incorretos

**Solução:**
```
1. Verificar secrets em GitHub → Settings → Secrets
2. Testar conexão com ambiente de deploy
3. Verificar logs do workflow
```

### Problema: Semantic Release não cria versão

**Causa:** Commits não seguem Conventional Commits

**Solução:**
```bash
# Verifique seus commits
git log --oneline

# Devem seguir padrão:
# feat: descrição
# fix: descrição
# etc.

# Se necessário, reescreva commits:
git rebase -i HEAD~3
```

---

## 📚 Recursos Adicionais

### Documentação

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Release](https://semantic-release.gitbook.io/)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)

### Ferramentas

- [Act](https://github.com/nektos/act) - Executar GitHub Actions localmente
- [Codecov](https://codecov.io/) - Análise de cobertura de código
- [Trivy](https://trivy.dev/) - Scanner de vulnerabilidades

### Badges

Adicione badges ao README.md:

```markdown
![CI](https://github.com/jhonataneduardo/fiap-pos-tech-api/workflows/CI/badge.svg)
![CD](https://github.com/jhonataneduardo/fiap-pos-tech-api/workflows/CD/badge.svg)
[![codecov](https://codecov.io/gh/jhonataneduardo/fiap-pos-tech-api/branch/main/graph/badge.svg)](https://codecov.io/gh/jhonataneduardo/fiap-pos-tech-api)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
```

---

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/amazing-feature`)
3. Commit suas mudanças usando Conventional Commits
4. Push para a branch (`git push origin feature/amazing-feature`)
5. Abra um Pull Request seguindo o template
6. Aguarde revisão e aprovação do CI/CD

---

## 📞 Suporte

Para dúvidas ou problemas:

1. Verifique a seção [Troubleshooting](#troubleshooting)
2. Consulte os logs dos workflows
3. Abra uma issue usando os templates
4. Entre em contato com @jhonataneduardo

---

**Última atualização:** 28 de outubro de 2025  
**Versão:** 1.0.0
