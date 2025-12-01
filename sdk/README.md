# Heka402 SDK

TypeScript SDK for privacy-preserving cross-chain payments over x402 protocol.

## Installation

```bash
npm install @heka402/sdk
```

## Quick Start (5-Line Payment)

```typescript
import { Heka402SDK } from '@heka402/sdk';
import { ethers } from 'ethers';

// 1. Initialize provider and signer
const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();

// 2. Load circuit files
const wasm = await fetch('/circuits/payment.wasm').then(r => r.arrayBuffer());
const zkey = await fetch('/circuits/payment.zkey').then(r => r.arrayBuffer());

// 3. Initialize SDK
const sdk = new Heka402SDK(
  provider,
  signer,
  '0x...', // Contract address
  wasm,
  zkey
);

// 4. Execute payment (5-line flow)
const txHash = await sdk.executePayment({
  recipient: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  amount: ethers.parseEther('0.1').toString(),
  chains: [11155111, 420, 421613], // Sepolia, Optimism, Arbitrum
});

// 5. Done!
console.log('Payment executed:', txHash);
```

## x402 Protocol Integration

```typescript
// x402-compatible payment
const result = await sdk.x402Payment({
  url: 'https://api.example.com/service',
  amount: '1000000000000000000',
  token: undefined, // Native ETH
  chains: [11155111, 420],
});

console.log('Payment:', result.txHash, result.commitment);
```

## API Reference

### `Heka402SDK`

#### Constructor

```typescript
new Heka402SDK(
  provider: ethers.Provider,
  signer: ethers.Signer,
  contractAddress: string,
  circuitWasm: ArrayBuffer,
  circuitZkey: ArrayBuffer
)
```

#### Methods

##### `executePayment(config: PaymentConfig): Promise<string>`

Execute a privacy-preserving payment across multiple chains.

**Parameters:**
- `config.recipient`: Recipient address
- `config.amount`: Amount in wei (as string)
- `config.token`: Token address (optional, undefined for native ETH)
- `config.chains`: Array of chain IDs to split payment across
- `config.secret`: Optional secret (will generate if not provided)

**Returns:** Transaction hash of the first payment

##### `x402Payment(request: X402Request): Promise<PaymentResult>`

Execute payment via x402 protocol.

**Parameters:**
- `request.url`: x402 payment URL
- `request.amount`: Amount in wei
- `request.token`: Optional token address
- `request.chains`: Optional array of chain IDs

**Returns:** `{ txHash: string, commitment: string }`

## Privacy Features

1. **Zero-Knowledge Proofs**: Proves payment knowledge without revealing identity
2. **Split Payments**: Distributes payment across multiple chains
3. **Commitment Scheme**: Uses cryptographic commitments for privacy

## Examples

See `examples/` directory for more usage examples.

