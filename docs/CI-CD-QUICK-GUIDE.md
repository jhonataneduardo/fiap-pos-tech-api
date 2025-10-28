# 🚀 Guia Rápido - CI/CD Pipeline

## ⚡ Comandos Essenciais

### Criar Feature Branch
```bash
git checkout -b feature/minha-feature
```

### Commit com Conventional Commits
```bash
# Nova funcionalidade
git commit -m "feat: adiciona endpoint de vendas"

# Correção de bug
git commit -m "fix: corrige validação de CPF"

# Breaking change
git commit -m "feat!: altera estrutura da API

BREAKING CHANGE: campo 'id' agora é UUID"
```

### Push e Criar PR
```bash
git push origin feature/minha-feature
# Abra PR no GitHub
```

---

## 📋 Checklist do PR

- [ ] Commits seguem Conventional Commits
- [ ] Testes passam localmente (`yarn test`)
- [ ] Build funciona (`yarn build`)
- [ ] Código está formatado
- [ ] Documentação atualizada
- [ ] PR template preenchido
- [ ] Reviewers atribuídos

---

## 🔄 Workflows Disponíveis

| Workflow | Trigger | Quando usar |
|----------|---------|-------------|
| **CI** | Pull Request | Automático em PRs |
| **CD** | Push main/develop | Automático em merge |
| **Code Quality** | PR/Push/Schedule | Automático |
| **Release** | Push main | Automático |

---

## 🏷️ Conventional Commits

| Tipo | Descrição | Versão |
|------|-----------|---------|
| `feat:` | Nova funcionalidade | MINOR |
| `fix:` | Correção de bug | PATCH |
| `docs:` | Documentação | - |
| `style:` | Formatação | - |
| `refactor:` | Refatoração | PATCH |
| `perf:` | Performance | PATCH |
| `test:` | Testes | - |
| `build:` | Build/deps | PATCH |
| `ci:` | CI/CD | - |
| `chore:` | Manutenção | - |
| `BREAKING CHANGE:` | Breaking change | MAJOR |

---

## 🔐 Secrets Necessários

### Repository Secrets
- `CODECOV_TOKEN` (opcional)

### Environment: staging
- `STAGING_DEPLOY_KEY`
- `STAGING_DATABASE_URL`

### Environment: production
- `PRODUCTION_DEPLOY_KEY`
- `PRODUCTION_DATABASE_URL`

---

## 🛡️ Branch Protection

### main
- ✅ 2 aprovações obrigatórias
- ✅ Todos os checks devem passar
- ✅ Branch atualizada
- ❌ Sem force push

### develop
- ✅ 1 aprovação obrigatória
- ✅ Todos os checks devem passar
- ❌ Sem force push

---

## 🐛 Troubleshooting Rápido

### CI falha nos testes
```bash
# Rode localmente com mesmo ambiente
export DATABASE_URL=postgresql://testuser:testpass@localhost:5432/testdb
yarn test --ci
```

### Docker build falha
```bash
docker build -t test . --no-cache --progress=plain
```

### Workflow não executa
- Verifique nome da branch (deve ser feature/*, bugfix/*, hotfix/*)
- Verifique se PR é para main ou develop

### Semantic Release não versiona
- Commits devem seguir Conventional Commits
- Use: feat:, fix:, etc.

---

## 📊 Status Checks Requeridos

- ✅ Code Quality Check
- ✅ Run Tests
- ✅ Docker Build Test
- ✅ Security Scan

---

## 🚀 Deploy Manual

```bash
# Via GitHub UI
Actions → CD - Continuous Deployment → Run workflow
```

Opções:
- **Environment:** staging | production
- **Skip tests:** true | false

---

## 📞 Links Úteis

- 📖 [Documentação Completa](./CI-CD-PIPELINE.md)
- 🔗 [Conventional Commits](https://www.conventionalcommits.org/)
- 🔗 [GitHub Actions Docs](https://docs.github.com/en/actions)

---

## 💡 Dicas

1. **Sempre** use Conventional Commits
2. **Teste localmente** antes de push
3. **Mantenha PRs pequenos** e focados
4. **Revise seu próprio código** antes de solicitar review
5. **Responda reviews** rapidamente
6. **Mantenha branch atualizada** com base

---

**Dúvidas?** Consulte a [documentação completa](./CI-CD-PIPELINE.md) ou abra uma issue.
