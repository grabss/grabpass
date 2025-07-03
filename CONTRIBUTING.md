# Contributing

## Prerequisites

- Node.js ^20.0.0
- pnpm ^10.12.1

## Development Setup

```bash
# Fork the repository on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/grabpass.git
cd grabpass
pnpm install

# Build the project
npm run build

# Run tests
npm test
```

## Project Structure

The main source files are located in the `src/` directory:

- `grabpass.ts` - JWT token management
- `password.ts` - Password utilities
- `index.ts` - Main exports

## Code Standards

- Follow existing TypeScript patterns
- Use Biome for linting and formatting
- Write tests for new functionality
- Run `npm run lint` before committing

## Submitting Changes

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Issues

Report bugs or request features in [GitHub Issues](https://github.com/grabss/grabpass/issues).
