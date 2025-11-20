# Copilot Instructions for NestJS Tasks API

## Architecture Overview
This is a NestJS-based REST API for task management. The project follows NestJS modular architecture:
- **Entry point**: `src/main.ts` bootstraps the app on port 3000 (or PORT env var)
- **Root module**: `src/app.module.ts` imports all feature modules
- **Feature modules**: Follow the pattern `src/{feature}/{feature}.module.ts` structure

## Module Structure Pattern
Each feature module follows this convention:
```
src/tasks/
  ├── tasks.module.ts     # Module definition with controllers/providers
  ├── tasks.controller.ts # Route handlers with @Controller('tasks') decorator
  ├── tasks.service.ts    # Business logic with @Injectable() decorator
  └── task.model.ts       # TypeScript interfaces and enums
```

## Key Development Patterns

### Service Layer Pattern
- Services use in-memory arrays for data storage (e.g., `private tasks: Task[] = []`)
- All services are decorated with `@Injectable()` for dependency injection
- Business logic is encapsulated in service methods, not controllers

### Controller Patterns
- Controllers are decorated with `@Controller('route-prefix')`
- Route methods use NestJS decorators: `@Get("/all")`, `@Post()`, etc.
- Constructor injection pattern: `constructor(private serviceName: Service) {}`

### Model Definitions
- Use TypeScript interfaces for data structures: `export interface Task {}`
- Enums follow PascalCase: `enum TaskStatusProperty { PENDING = 'PENDING' }`

## Development Workflow

### Running the Application
```bash
npm run start:dev    # Development with watch mode
npm run start:debug  # Debug mode with --inspect-brk
npm run start:prod   # Production mode (requires build)
```

### Testing Commands
```bash
npm run test        # Unit tests with Jest
npm run test:e2e    # End-to-end tests in test/ directory
npm run test:cov    # Coverage report
```

### Code Quality
```bash
npm run lint        # ESLint with auto-fix
npm run format      # Prettier formatting
```

## Important Configuration Notes
- TypeScript config uses strict mode with decorators enabled
- ESLint configuration is in `eslint.config.mjs`
- Jest tests look for `*.spec.ts` files in `src/` directory
- E2E tests are in `test/` directory with separate Jest config

## Common Pitfalls to Avoid
- Don't forget `@Injectable()` decorator on services
- Module imports array must include all feature modules
- Controller route paths are relative to the controller decorator path
- E2E tests expect different endpoints than the current implementation (check test expectations)

## API Endpoints
Current implementation provides:
- `GET /tasks/all` - Returns all tasks from TasksService

## Next Development Steps
The codebase appears to be in early development with incomplete service implementation (note the syntax error in TasksService). Focus on:
1. Completing CRUD operations in TasksService
2. Adding proper error handling
3. Implementing data validation with class-validator
4. Adding unit tests for services and controllers