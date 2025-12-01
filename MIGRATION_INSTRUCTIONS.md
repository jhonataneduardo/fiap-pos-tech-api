# Migration Instructions - Remove Sales Table

## Context
As vendas foram migradas para o serviço `fiap-pos-tech-api-read`. O serviço `fiap-pos-tech-api` agora mantém apenas Customer e Vehicle.

## Changes Made

### 1. Prisma Schema Updated
- ✅ Removed `Sale` model
- ✅ Removed `SaleStatus` enum
- ✅ Removed `sales` relation from `Customer` model
- ✅ Removed `sales` relation from `Vehicle` model

### 2. Swagger Documentation
- ✅ Arquivos de sale no Swagger já não estão sendo importados
- ℹ️ Os arquivos físicos `sale.ts` ainda existem mas não são usados:
  - `/src/core/infrastructure/swagger/paths/sale.ts`
  - `/src/core/infrastructure/swagger/schemas/sale.ts`

## Required Steps

### Step 1: Create Prisma Migration
Execute no terminal `api`:
```bash
cd /home/jhonatan/Workspaces/fiap/fiap-pos-tech-development-environment/fiap-pos-tech-api
docker compose exec fiap-pos-tech-api-dev npx prisma migrate dev --name remove_sales_table
```

### Step 2: (Optional) Remove Swagger Sale Files
Os arquivos abaixo podem ser deletados manualmente se desejado (não afetam o funcionamento):
```bash
rm /home/jhonatan/Workspaces/fiap/fiap-pos-tech-development-environment/fiap-pos-tech-api/src/core/infrastructure/swagger/paths/sale.ts
rm /home/jhonatan/Workspaces/fiap/fiap-pos-tech-development-environment/fiap-pos-tech-api/src/core/infrastructure/swagger/schemas/sale.ts
```

### Step 3: Restart Services
```bash
docker restart fiap-pos-tech-api-dev
```

## Verification

After migration, verify:
1. ✅ Table `sales` should be dropped from database
2. ✅ Foreign key constraints removed
3. ✅ Customer and Vehicle tables remain intact
4. ✅ API continues to serve Customer and Vehicle endpoints
5. ✅ Sale endpoints only available in `fiap-pos-tech-api-read` service (port 3003)

## Rollback (if needed)
If you need to rollback, you can restore the previous schema from git history and run:
```bash
docker compose exec fiap-pos-tech-api-dev npx prisma migrate dev
```
