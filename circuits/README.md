# Circuit Compilation Guide

## Installation

Circom 2.0 needs to be installed separately. Choose one of these methods:

### Method 1: Install via npm (Recommended for development)

```bash
npm install -g circom
```

### Method 2: Use npx (No installation needed)

The compile script will try to use npx first, then fall back to a local installation.

### Method 3: Manual Installation

1. Download from: https://github.com/iden3/circom/releases
2. Extract and add to PATH

## Compile Circuit

```bash
npm run compile
```

This will generate:
- `payment.r1cs` - R1CS constraint file
- `payment.wasm` - WebAssembly file for proof generation
- `payment.sym` - Symbol file

## Setup (Trusted Setup)

For production, you need to run the trusted setup:

```bash
npm run setup
```

This generates the proving and verification keys.

## Generate Verifier Contract

After setup, generate the Solidity verifier:

```bash
npm run generate-verifier
```

This will create `../contracts/Verifier.sol` with the actual Groth16 verifier.

## Note

The current circuit uses a simplified hash function. For production:
1. Install circomlib: `npm install circomlib`
2. Update `payment.circom` to use Poseidon hash from circomlib
3. Recompile and regenerate verifier

