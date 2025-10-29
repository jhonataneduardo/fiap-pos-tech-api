# 🔧 Configuração do GitHub - Passo a Passo

Este guia detalha como configurar o repositório GitHub para aproveitar todos os recursos do pipeline de CI/CD implementado.

---

## 📋 Índice

1. [Configurar Secrets](#1-configurar-secrets)
2. [Configurar Environments](#2-configurar-environments)
3. [Configurar Branch Protection Rules](#3-configurar-branch-protection-rules)
4. [Habilitar GitHub Actions](#4-habilitar-github-actions)
5. [Configurar Notificações](#5-configurar-notificações-opcional)
6. [Verificar Configurações](#6-verificar-configurações)

---

## 1. Configurar Secrets

### 1.1 Repository Secrets

Acesse: `Settings → Secrets and variables → Actions → Secrets`

#### Secrets Obrigatórios

**CODECOV_TOKEN** (Opcional - para relatórios de cobertura)
```
1. Acesse https://codecov.io/
2. Conecte com GitHub
3. Selecione o repositório jhonataneduardo/fiap-pos-tech-api
4. Copie o token gerado
5. No GitHub: New repository secret
   Name: CODECOV_TOKEN
   Value: [cole o token]
```

### 1.2 Environment Secrets

#### Staging Environment

Acesse: `Settings → Environments → staging → Add secret`

**STAGING_DEPLOY_KEY**
```
Name: STAGING_DEPLOY_KEY
Value: [SSH key ou token de deploy para staging]

Como gerar:
ssh-keygen -t ed25519 -C "staging-deploy-key"
# Copie o conteúdo de ~/.ssh/id_ed25519
```

**STAGING_DATABASE_URL**
```
Name: STAGING_DATABASE_URL
Value: postgresql://user:password@staging-db-host:5432/dbname

Exemplo:
postgresql://fiap_user:senha123@staging-db.example.com:5432/fiap_pos_tech_staging
```

**STAGING_API_KEY** (se necessário)
```
Name: STAGING_API_KEY
Value: [sua API key de staging]
```

#### Production Environment

Acesse: `Settings → Environments → production → Add secret`

**PRODUCTION_DEPLOY_KEY**
```
Name: PRODUCTION_DEPLOY_KEY
Value: [SSH key ou token de deploy para produção]
```

**PRODUCTION_DATABASE_URL**
```
Name: PRODUCTION_DATABASE_URL
Value: postgresql://user:password@prod-db-host:5432/dbname

Exemplo:
postgresql://fiap_user:senhaSegura@prod-db.example.com:5432/fiap_pos_tech_prod
```

**PRODUCTION_API_KEY** (se necessário)
```
Name: PRODUCTION_API_KEY
Value: [sua API key de produção]
```

---

## 2. Configurar Environments

### 2.1 Criar Environment: staging

```
1. Acesse: Settings → Environments
2. Clique em: New environment
3. Nome: staging
4. Clique em: Configure environment
```

**Configurações do Staging:**
```
☐ Required reviewers: (deixe vazio para deploy automático)
☐ Wait timer: 0 minutes
☑ Deployment branches: Selected branches
  → Adicione: develop
```

**Environment secrets:**
- Adicione os secrets conforme seção 1.2

**Environment variables (opcional):**
```
STAGING_URL: https://staging-api.fiap-pos-tech.com
ENVIRONMENT_NAME: staging
```

### 2.2 Criar Environment: production

```
1. Acesse: Settings → Environments
2. Clique em: New environment
3. Nome: production
4. Clique em: Configure environment
```

**Configurações do Production:**
```
☑ Required reviewers: (adicione pelo menos 2 pessoas)
  → @jhonataneduardo
  → @outro-revisor (se houver)

☑ Wait timer: 5 minutes

☑ Deployment branches: Selected branches
  → Adicione: main
```

**Environment secrets:**
- Adicione os secrets conforme seção 1.2

**Environment variables (opcional):**
```
PRODUCTION_URL: https://api.fiap-pos-tech.com
ENVIRONMENT_NAME: production
```

---

## 3. Configurar Branch Protection Rules

### 3.1 Branch: main

```
1. Acesse: Settings → Branches
2. Clique em: Add branch protection rule
3. Branch name pattern: main
```

**Configurações:**

```
☑ Require a pull request before merging
  ☑ Require approvals: 2
  ☑ Dismiss stale pull request approvals when new commits are pushed
  ☑ Require review from Code Owners
  ☐ Restrict who can dismiss pull request reviews (opcional)
  ☑ Allow specified actors to bypass required pull requests (opcional)

☑ Require status checks to pass before merging
  ☑ Require branches to be up to date before merging
  
  Status checks encontrados:
  ☑ Code Quality Check
  ☑ Run Tests
  ☑ Docker Build Test
  ☑ Security Scan
  
  (Marque todos os 4 checks acima)

☑ Require conversation resolution before merging

☑ Require signed commits (recomendado)

☐ Require linear history (opcional)

☑ Require deployments to succeed before merging (opcional)
  → production

☐ Lock branch (não marcar)

☐ Do not allow bypassing the above settings

☑ Restrict who can push to matching branches
  → @jhonataneduardo
  → (adicione outros mantenedores)

☐ Allow force pushes (NÃO marcar)
☐ Allow deletions (NÃO marcar)
```

**Salvar:** Clique em `Create` ou `Save changes`

### 3.2 Branch: develop

```
1. Acesse: Settings → Branches
2. Clique em: Add branch protection rule
3. Branch name pattern: develop
```

**Configurações:**

```
☑ Require a pull request before merging
  ☑ Require approvals: 1
  ☑ Dismiss stale pull request approvals when new commits are pushed
  ☐ Require review from Code Owners (opcional)

☑ Require status checks to pass before merging
  ☑ Require branches to be up to date before merging
  
  Status checks encontrados:
  ☑ Code Quality Check
  ☑ Run Tests
  ☑ Docker Build Test
  ☑ Security Scan

☑ Require conversation resolution before merging

☐ Require signed commits (opcional)

☐ Restrict who can push to matching branches (opcional)

☐ Allow force pushes (NÃO marcar)
☐ Allow deletions (NÃO marcar)
```

**Salvar:** Clique em `Create` ou `Save changes`

### 3.3 Branch Pattern: feature/* (opcional mas recomendado)

```
1. Acesse: Settings → Branches
2. Clique em: Add branch protection rule
3. Branch name pattern: feature/*
```

**Configurações mínimas:**

```
☑ Require a pull request before merging
  ☑ Require approvals: 1

☑ Require status checks to pass before merging
  ☑ Code Quality Check
  ☑ Run Tests

☐ Allow force pushes (permitir para rebase)
☑ Allow deletions (permitir após merge)
```

---

## 4. Habilitar GitHub Actions

### 4.1 Permissões de Workflow

```
1. Acesse: Settings → Actions → General
2. Seção: Actions permissions
```

**Configuração:**

```
☑ Allow all actions and reusable workflows
```

### 4.2 Workflow Permissions

```
Seção: Workflow permissions

☑ Read and write permissions
☑ Allow GitHub Actions to create and approve pull requests
```

### 4.3 Fork Pull Request Workflows

```
☑ Require approval for all outside collaborators
```

**Salvar:** Clique em `Save`

---

## 5. Configurar Notificações (Opcional)

### 5.1 Slack Integration

Se você usa Slack, configure notificações:

```
1. Instale o GitHub App no Slack
2. No canal desejado: /github subscribe jhonataneduardo/fiap-pos-tech-api
3. Configure eventos:
   /github subscribe jhonataneduardo/fiap-pos-tech-api deployments
   /github subscribe jhonataneduardo/fiap-pos-tech-api releases
   /github subscribe jhonataneduardo/fiap-pos-tech-api reviews
```

### 5.2 Discord Integration

Se você usa Discord:

```
1. Crie um Webhook no Discord (Server Settings → Integrations → Webhooks)
2. Copie a URL do webhook
3. No GitHub: Settings → Webhooks → Add webhook
   Payload URL: [URL do Discord]/github
   Content type: application/json
   Events: Choose individual events
     ☑ Deployments
     ☑ Pull requests
     ☑ Pushes
     ☑ Releases
```

### 5.3 Email Notifications

Configure notificações por email:

```
1. Acesse: Settings → Notifications
2. Configure:
   ☑ Actions workflow runs
   ☑ Dependabot alerts
   ☑ Pull request reviews
   ☑ Security alerts
```

---

## 6. Verificar Configurações

### 6.1 Checklist de Verificação

Execute este checklist para garantir que tudo está configurado:

**Secrets:**
- [ ] CODECOV_TOKEN configurado (opcional)
- [ ] STAGING_DEPLOY_KEY configurado
- [ ] STAGING_DATABASE_URL configurado
- [ ] PRODUCTION_DEPLOY_KEY configurado
- [ ] PRODUCTION_DATABASE_URL configurado

**Environments:**
- [ ] Environment "staging" criado
- [ ] Environment "production" criado
- [ ] Production requer 2 reviewers
- [ ] Deployment branches configuradas

**Branch Protection:**
- [ ] Branch "main" protegida (2 approvals)
- [ ] Branch "develop" protegida (1 approval)
- [ ] Status checks obrigatórios configurados
- [ ] Conversation resolution habilitada
- [ ] Force push desabilitado

**GitHub Actions:**
- [ ] Workflows habilitados
- [ ] Permissões de leitura/escrita configuradas
- [ ] Allow PR creation habilitado

**Dependabot:**
- [ ] Dependabot configurado (já feito via arquivo)
- [ ] Alerts habilitados

### 6.2 Testar Configuração

#### Teste 1: Abrir um PR de Teste

```bash
# 1. Crie uma branch de teste
git checkout -b test/ci-pipeline
echo "# Test" >> TEST.md
git add TEST.md
git commit -m "test: verificar pipeline CI"
git push origin test/ci-pipeline

# 2. Abra um PR no GitHub para 'develop'
# 3. Verifique se os workflows são executados
# 4. Verifique comentário automático no PR
# 5. Feche o PR sem merge após verificação
```

#### Teste 2: Verificar Status Checks

```
1. Abra o PR de teste
2. Vá para a aba "Checks"
3. Verifique se aparecem:
   - Code Quality Check
   - Run Tests
   - Docker Build Test
   - Security Scan
   - PR Feedback
```

#### Teste 3: Simular Deploy (opcional)

```bash
# Apenas se você tem ambientes de staging/prod configurados
# 1. Faça merge de um PR para develop
# 2. Verifique se o deploy para staging é executado
# 3. Veja os logs em Actions → CD - Continuous Deployment
```

---

## 7. Troubleshooting

### Problema: Workflows não executam

**Solução:**
```
1. Verifique: Settings → Actions → General
2. Certifique-se que "Allow all actions" está selecionado
3. Verifique que os arquivos .yml estão em .github/workflows/
```

### Problema: Status checks não aparecem

**Solução:**
```
1. Execute pelo menos um workflow primeiro
2. Depois eles aparecerão na lista de status checks
3. Adicione-os nas branch protection rules
```

### Problema: Deploy falha por falta de secrets

**Solução:**
```
1. Verifique Settings → Secrets
2. Certifique-se que os nomes estão EXATAMENTE como no workflow
3. Secrets são case-sensitive
```

### Problema: Dependabot não funciona

**Solução:**
```
1. Verifique Settings → Code security and analysis
2. Habilite "Dependabot alerts"
3. Habilite "Dependabot security updates"
4. O arquivo dependabot.yml está em .github/
```

---

## 8. Comandos Úteis

### Verificar status local dos workflows

```bash
# Listar workflows
gh workflow list

# Ver runs de um workflow específico
gh run list --workflow=ci.yml

# Ver logs de uma run
gh run view [run-id] --log

# Reexecutar um workflow falhado
gh run rerun [run-id]
```

### Gerenciar secrets via CLI

```bash
# Listar secrets
gh secret list

# Adicionar secret
gh secret set SECRET_NAME

# Deletar secret
gh secret remove SECRET_NAME
```

---

## 9. Recursos Adicionais

### Documentação Oficial

- [GitHub Actions](https://docs.github.com/en/actions)
- [Branch Protection](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
- [Environments](https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment)
- [Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Dependabot](https://docs.github.com/en/code-security/dependabot)

### Ferramentas

- [GitHub CLI](https://cli.github.com/) - Gerenciar GitHub via terminal
- [Act](https://github.com/nektos/act) - Executar GitHub Actions localmente

---

## 10. Suporte

### Dúvidas Frequentes

**P: Preciso configurar todos os secrets?**
R: Apenas CODECOV_TOKEN é opcional. Os demais são necessários para deploy.

**P: Posso testar os workflows localmente?**
R: Sim, use a ferramenta [Act](https://github.com/nektos/act).

**P: Como adiciono mais reviewers ao production?**
R: Settings → Environments → production → Required reviewers

**P: Posso ter mais ambientes?**
R: Sim! Crie novos environments e adapte o workflow cd.yml.

### Precisa de Ajuda?

1. Consulte a [Documentação Completa](CI-CD-PIPELINE.md)
2. Veja o [Guia Rápido](CI-CD-QUICK-GUIDE.md)
3. Abra uma issue usando os templates
4. Entre em contato: @jhonataneduardo

---

**Última atualização:** 28 de outubro de 2025  
**Versão:** 1.0.0
