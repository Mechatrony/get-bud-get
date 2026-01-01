# Project-Specific Instructions

## Project Structure

### Key Directories
- `docs/` - Project documentation (ARCHITECTURE.md, SPEC.md, TODO.md)
- `prisma/` - Database schema and seeds
- `src/` - Source code (app, components, lib, types)

### Branch-Only Files
- `docs/TODO.md` - Excluded from commits (already in .gitignore)

## Testing

### Test Execution Environment Issue
- **Important**: When running `npm test` via Claude Code's Bash tool, tests may fail with "No test suite found" error
- This is an environment-specific issue (Bash vs PowerShell)
- **Solution**: Ask the user to run tests directly in their terminal to verify test functionality
- The test code and configuration are correct; only the execution environment differs

### Test Commands
```bash
npm test              # Watch mode
npm run test:ui       # UI mode
npm run test:coverage # Coverage report
```

## References
- Workflow and PR guidelines: See global `~/.claude/CLAUDE.md`
- Project specifications: [docs/SPEC.md](docs/SPEC.md)
- System architecture: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
