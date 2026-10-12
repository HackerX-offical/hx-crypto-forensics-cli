# hx-crypto-forensics-cli

Educational hash forensics: SHA-256, Bcrypt, Argon2 analysis and JSON reports.

## Why this exists

Incident responders compare digest formats and parameters locally. This CLI explains
hashes without live cracking farms.

## Features

- Hash, salt, and analysis engines
- Explainer content for learners
- Jest specs with mocked crypto

## Install

```bash
git clone https://github.com/HackerX-offical/hx-crypto-forensics-cli.git
cd hx-crypto-forensics-cli
npm install && npm run build
```

## Quick start

```bash
npm run build && npm start
```

## Output

Stdout analysis and JSON export from reporters.

## Develop

```bash
npm test
npm run format:check
```

## Architecture

See [ARCHITECTURE.md](./ARCHITECTURE.md) for module layout and extension points.

## Ethics

Use only on systems and content you are **authorized** to test. See
[SECURITY.md](./SECURITY.md).

## License

Licensed under the [HackerX License](./LICENSE). Redistributions must retain copyright,
license text, and [NOTICE](./NOTICE) attribution per the license terms.
