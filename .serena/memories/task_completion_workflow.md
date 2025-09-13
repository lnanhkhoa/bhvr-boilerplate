# BHVR Task Completion Workflow 🦫

## When a Task is Completed

### 1. Code Quality Checks
```bash
# Run linting to ensure code standards
bun run lint

# Perform type checking for type safety
bun run type-check

# Format code with Prettier
bun run format
```

### 2. Build Verification
```bash
# Ensure all workspaces build successfully
bun run build

# Test individual builds if needed
bun run build:client
bun run build:server
```

### 3. Testing (when applicable)
```bash
# Run test suite across all workspaces
bun run test

# Run specific workspace tests if needed
bun test --filter=server
bun test --filter=client
```

### 4. Development Testing
```bash
# Start development servers to verify functionality
bun dev

# Test API endpoints at:
# - http://localhost:3000/doc (Swagger UI)
# - http://localhost:3000/scalar (Scalar API Reference)
# - http://localhost:5173 (Client application)
```

### 5. Git Workflow
```bash
# Stage changes
git add .

# Commit with descriptive message
git commit -m "feat: implement peaceful middleware structure 🦫"

# Push to repository
git push origin main
```

### 6. Documentation Updates
- Update README.md if new features are added
- Add JSDoc comments for new public APIs
- Update API documentation if endpoints change
- Create or update memory files for significant changes

### 7. Environment Considerations
- Verify .env.example is updated with new variables
- Test both development and production configurations
- Ensure deployment compatibility across environments

## Quality Gates
- ✅ All linting passes without errors
- ✅ TypeScript compilation succeeds
- ✅ Code is properly formatted
- ✅ All tests pass (when present)
- ✅ Development servers start successfully
- ✅ API documentation is accessible
- ✅ No console errors in browser/server logs