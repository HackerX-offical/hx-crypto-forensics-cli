# hx-crypto-forensics-cli architecture

Educational hash forensics CLI: hash inputs with SHA-256/Bcrypt/Argon2, analyze stored digests, and export JSON reports. Crypto primitives stay in engines; validation and reporters are unit-tested with mocks (no live cracking).

## Layout

```
src/
  cli/commands.ts
  core/types.ts
  engines/HashEngine.ts, SaltEngine.ts, AnalysisEngine.ts
  explainers/ExplainerService.ts, content.ts
  reporters/json.ts
  utils/validation.ts, formatting.ts, hash-preview.ts
  *.spec.ts                 # Co-located Jest tests
```

## Develop

```bash
npm install
npm run build
npm test
```

## Deep bar

`org-standards/verify-deep.sh`: ≥12 non-test `.ts` in `src/`, ≥6 `*.spec.ts` files.

See [SECURITY.md](./SECURITY.md) for authorized use.
