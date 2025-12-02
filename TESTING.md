# Testing Strategy - fiap-pos-tech-api

## Current Status

### Test Coverage
- **Current Coverage**: ~28-30%
- **Target Coverage**: 80%
- **Test Files**: 11 spec files
- **Passing Tests**: 54 tests

### Coverage Breakdown (Current)
```
File                      | % Stmts | % Branch | % Funcs | % Lines
--------------------------|---------|----------|---------|----------
All files                 |   28.67 |    25.45 |   28.72 |   29.44
Domain Entities           |     100 |      100 |     100 |     100
Application Use Cases     |   61.29 |    66.66 |      50 |   63.33
Infrastructure Mappers    |     100 |      100 |     100 |     100
Core Components           |   60.97 |       72 |      80 |   60.97
```

## CI/CD Pipeline Configuration

### Workflows Updated
1. **ci.yml** - Runs on Pull Requests
   - Executes all tests with coverage
   - Uploads coverage to Codecov
   - Archives test artifacts (7 days retention)

2. **cd.yml** - Runs on Deploy to Staging/Production
   - ✅ Real test execution (replaced mocks)
   - ✅ PostgreSQL service container
   - ✅ Coverage validation (30% threshold)
   - ✅ Codecov upload with `deployment-tests` flag
   - ✅ Test artifacts archived (7 days retention)

3. **code-quality.yml** - Code Quality Checks
   - ✅ New `unit-tests` job added
   - ✅ Coverage enforcement (30% threshold)
   - ✅ Codecov upload with `quality-check` flag
   - ✅ Coverage artifacts (30 days retention)

## Migration Changes

### Sale Module Removal
The `Sale` functionality was migrated to the `fiap-pos-tech-api-sale` microservice.

**Removed Files:**
- `/src/modules/vehicles/domain/entities/sale.entity.ts`
- `/src/modules/vehicles/domain/entities/sale.entity.spec.ts`
- `/src/modules/vehicles/domain/repositories/sale-respository.interface.ts`
- `/src/modules/vehicles/application/usecases/sale/*.ts`
- `/src/modules/vehicles/application/controllers/sale.controller.ts`
- `/src/modules/vehicles/application/dtos/sale.dto.ts`
- `/src/modules/vehicles/infrastructure/database/repositories/sale.repository.ts`
- `/src/modules/vehicles/infrastructure/database/mappers/sale.mapper.ts`
- `/src/modules/vehicles/infrastructure/database/mappers/sale.mapper.spec.ts`
- `/src/modules/vehicles/infrastructure/controllers/http/sale-api.controller.ts`
- `/src/modules/vehicles/infrastructure/http/sale.routes.ts`
- `/src/modules/vehicles/infrastructure/presenters/register-sale.presenter.ts`
- `/src/modules/vehicles/infrastructure/presenters/update-payment-status.presenter.ts`
- `/src/core/infrastructure/swagger/paths/sale.ts`
- `/src/core/infrastructure/swagger/schemas/sale.ts`

**Database Migration:**
- Migration `20251201201452_remove_sales_table` drops the `sales` table
- Foreign key constraints removed
- `SaleStatus` enum removed from Prisma schema

## Testing Roadmap

### Phase 1: Current (30% Coverage) ✅
- [x] Domain entities tests
- [x] Core error handling tests
- [x] HTTP response handler tests
- [x] Database mappers tests
- [x] Selected use case tests

### Phase 2: Increase to 50% Coverage 🎯
**Priority: High**
- [ ] Complete use case tests
  - [ ] `get-all-vehicles.usecase.ts`
  - [ ] `get-vehicle-by-id.usecase.ts`
  - [ ] `register-new-customer.usecase.ts`
- [ ] Repository layer tests
  - [ ] `vehicle.repository.ts`
  - [ ] `customer.repository.ts`
- [ ] DTO validation tests

### Phase 3: Increase to 70% Coverage 🎯
**Priority: Medium**
- [ ] Application controllers tests
  - [ ] `vehicle.controller.ts`
  - [ ] `customer.controller.ts`
- [ ] Presenter layer tests
- [ ] HTTP API controllers tests (integration)

### Phase 4: Reach 80% Coverage Target 🎯
**Priority: Low**
- [ ] Infrastructure routes tests
- [ ] Middleware tests (auth.middleware.ts)
- [ ] Edge cases and error scenarios
- [ ] Integration tests

## Test Configuration

### Jest Configuration
- **Preset**: ts-jest
- **Test Environment**: node
- **Coverage Reporters**: text, lcov, html
- **Max Workers**: 2 (in CI)
- **Timeout**: 15 minutes (in CI)

### Coverage Exclusions
Files excluded from coverage calculation:
- Type definitions (`*.d.ts`)
- Entry points (`server.ts`, `app.ts`)
- Configuration files (`config/**`)
- Index files (`**/index.ts`)
- Infrastructure setup (DI, Swagger, Prisma client)
- Route definitions (`*.routes.ts`)
- Enums (`**/enums.ts`)
- Controllers and Presenters (low test priority)
- Middlewares (infrastructure)

### Database Setup for Tests
Tests use PostgreSQL service container:
```yaml
services:
  postgres:
    image: postgres:16-alpine
    env:
      POSTGRES_USER: testuser
      POSTGRES_PASSWORD: testpass
      POSTGRES_DB: testdb
```

## Running Tests Locally

### Run all tests
```bash
yarn test
```

### Run tests with coverage
```bash
yarn test --coverage
```

### Run tests in watch mode
```bash
yarn test:watch
```

### Run specific test file
```bash
yarn test src/path/to/file.spec.ts
```

### Run tests matching pattern
```bash
yarn test --testNamePattern="should create vehicle"
```

## Coverage Reports

### Codecov Integration
- **CI Tests**: Flag `unittests`
- **CD Tests**: Flag `deployment-tests`
- **Quality Tests**: Flag `quality-check`

### Local Coverage Reports
After running `yarn test --coverage`:
- **HTML Report**: `coverage/index.html`
- **LCOV Report**: `coverage/lcov.info`
- **Console Summary**: Printed after test execution

## Contributing

When adding new features:
1. Write tests first (TDD approach recommended)
2. Ensure tests pass: `yarn test`
3. Check coverage: `yarn test --coverage`
4. Aim for 80%+ coverage on new code
5. CI will validate coverage threshold (currently 30%)

## Notes

- Coverage threshold will be progressively increased as more tests are added
- Current threshold: **30%** (branches, functions, lines, statements)
- Target threshold: **80%** (all metrics)
- Infrastructure layers (controllers, presenters) have lower test priority
- Focus on domain logic and use cases for maximum value
