# HX Crypto Forensics CLI

> **Educational Cryptography Analysis Toolkit** > _Master the principles of hashing, salting, and defensive storage._

**HX Crypto Forensics CLI** is a terminal-based learning environment built by **HackerX**. It provides a hands-on way to understand how cryptographic hashing algorithms works, how salts defend against attacks, and how to analyze password storage configurations for security risks.

**⚠️ ETHICAL NOTICE**: This tool is strictly for **educational and defensive purposes**. It contains **NO** cracking, brute-forcing, or offensive capabilities. It is designed to help engineers build safer systems.

## Features

- **Hash Generation**: Explore SHA-256, bcrypt, and Argon2 behaviors.
- **Salt Lifecycle**: Simulate salt generation and understand its role in uniqueness.
- **Forensic Analysis**: Analyze hash strings to identify algorithms and potential weaknesses (e.g. low cost factors).
- **Interactive Mode**: Learn via a guided CLI experience.
- **Offline Only**: Runs entirely locally. No data leaves your machine.

## Installation

```bash
git clone https://github.com/HackerX-offical/hx-crypto-forensics-cli.git
cd hx-crypto-forensics-cli
npm install
npm run build
```

## Usage

```bash
# Hash a string
npm start hash --param "password123" --algo bcrypt

# Analyze a hash string
npm start analyze --hash "$2b$10$..."

# Compare two hashes
npm start compare --candidate "password123" --hash "$2b$10$..."

# Interactive Mode
npm start interactive
```

## Supported Algorithms

- **SHA-256**: Fast, deterministic (unsafe for passwords without hardening).
- **Bcrypt**: Adaptive, slow, salt-inclusive.
- **Argon2**: Memory-hard, modern standard.

## License

MIT © HackerX
