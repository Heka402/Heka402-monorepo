# Heka402 - Cross-chain Privacy Payments over x402

A privacy-preserving, multi-chain payment system built on x402 protocol with zero-knowledge proofs and account abstraction.

## Features

- 🔐 **Zero-Knowledge Privacy**: zk-SNARKs prove payment knowledge without revealing identity
- 🔗 **Multi-Chain Support**: Deploy on 5 testnets (Sepolia, Optimism Sepolia, Arbitrum Sepolia, Polygon Amoy, Base Sepolia)
- 💼 **Account Abstraction**: ERC-4337 smart contract wallets for seamless UX
- 🌐 **x402 Protocol**: HTTP-native payment standard for AI agents
- 🔄 **Split Payments**: Distribute payments across multiple EVM chains
- 🛡️ **Double Privacy Layer**: zk proofs + split payments across chains

## Architecture

```
┌─────────────────┐
│   Next.js UI    │
└────────┬────────┘
         │
┌────────▼────────┐
│  TypeScript SDK │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
┌───▼───┐ ┌──▼──────┐
│ Circom│ │ Smart   │
│Circuit│ │Contracts│
└───────┘ └─────────┘
```

## Project Structure

```
Heka402/
├── contracts/          # Solidity smart contracts
├── circuits/           # Circom zk-SNARK circuits
├── sdk/                # TypeScript SDK
├── frontend/           # Next.js frontend
├── backend/            # Serverless functions
└── deployments/        # Deployment scripts
```

## Quick Start

### Prerequisites

- Node.js 18+
- Foundry (for contract deployment)
- Circom compiler (see [Circuit Installation](#circuit-installation))
- MetaMask or compatible wallet
- Testnet ETH for gas fees

### Installation

```bash
npm run install:all
```

This installs dependencies for root project, SDK, and frontend.

### Circuit Installation

Circom 2.0 needs to be installed separately:

**Option 1: Homebrew (macOS)**
```bash
brew install circom
```

**Option 2: Download Binary**
1. Download from: https://github.com/iden3/circom/releases
2. Extract and add to PATH

**Option 3: Build from Source**
```bash
git clone https://github.com/iden3/circom.git
cd circom
cargo build --release
```

Verify installation:
```bash
circom --version
```

### Development

```bash
# Compile circuits
npm run compile:circuits

# Build SDK
npm run build:sdk

# Run frontend
npm run dev:frontend
```

Open http://localhost:3000

## Deployment

### Step 1: Compile Circuits

```bash
cd circuits
npm install
npm run compile
npm run setup
npm run generate-verifier
```

This generates:
- `payment.wasm` - WebAssembly circuit
- `payment.zkey` - Proving key
- `Verifier.sol` - Solidity verifier contract

### Step 2: Deploy Smart Contracts

#### Using Foundry (Recommended)

1. Install Foundry:
```bash
curl -L https://foundry.paradigm.xyz | bash
foundryup
```

2. Install dependencies:
```bash
cd contracts
forge install OpenZeppelin/openzeppelin-contracts
```

3. Deploy to all 5 testnets:

```bash
export PRIVATE_KEY=your_private_key

# Sepolia
forge script ../deployments/Deploy.s.sol:DeployScript \
  --rpc-url https://sepolia.infura.io/v3/YOUR_KEY \
  --broadcast --verify

# Optimism Sepolia
forge script ../deployments/Deploy.s.sol:DeployScript \
  --rpc-url https://sepolia.optimism.io \
  --broadcast

# Arbitrum Sepolia
forge script ../deployments/Deploy.s.sol:DeployScript \
  --rpc-url https://sepolia-rollup.arbitrum.io/rpc \
  --broadcast

# Polygon Amoy
forge script ../deployments/Deploy.s.sol:DeployScript \
  --rpc-url https://rpc-amoy.polygon.technology \
  --broadcast

# Base Sepolia
forge script ../deployments/Deploy.s.sol:DeployScript \
  --rpc-url https://sepolia.base.org \
  --broadcast
```

#### Using Remix

1. Go to https://remix.ethereum.org
2. Create new files and paste contract code
3. Compile contracts (Solidity 0.8.30)
4. Deploy in order:
   - Verifier
   - MerkleCommitmentRegistry
   - PrivacyPaymentAccount (with verifier address)

### Step 3: Configure Environment

Create `frontend/.env.local`:
```env
NEXT_PUBLIC_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
```

For Vercel deployment, set these environment variables:
```env
# Frontend
NEXT_PUBLIC_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id

# Backend
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY
OPTIMISM_SEPOLIA_RPC_URL=https://sepolia.optimism.io
ARBITRUM_SEPOLIA_RPC_URL=https://sepolia-rollup.arbitrum.io/rpc
POLYGON_AMOY_RPC_URL=https://rpc-amoy.polygon.technology
BASE_SEPOLIA_RPC_URL=https://sepolia.base.org
CONTRACT_ADDRESS=0x...
RELAYER_PRIVATE_KEY=your_relayer_key
CIRCUIT_WASM_URL=https://your-cdn.com/circuits/payment.wasm
CIRCUIT_ZKEY_URL=https://your-cdn.com/circuits/payment.zkey
```

### Step 4: Deploy to Vercel

#### Frontend Deployment

```bash
cd frontend
npm run build
vercel deploy --prod
```

Or use Vercel dashboard:
1. Connect GitHub repository
2. Import project (set root directory to `frontend/`)
3. Set environment variables
4. Deploy

#### Backend Functions

Backend functions are automatically deployed with the frontend via `vercel.json`. The functions are located in `backend/functions/` and will be accessible at:
- `/api/generate-proof`
- `/api/relayer`

### Step 5: Host Circuit Files

Upload circuit files to CDN or cloud storage:
- `payment.wasm`
- `payment.zkey`

Update `CIRCUIT_WASM_URL` and `CIRCUIT_ZKEY_URL` in Vercel environment variables.

## Network Configuration

### Sepolia
- **Chain ID**: 11155111
- **RPC**: https://sepolia.infura.io/v3/YOUR_KEY
- **Explorer**: https://sepolia.etherscan.io
- **Faucet**: https://sepoliafaucet.com

### Optimism Sepolia
- **Chain ID**: 11155420
- **RPC**: https://sepolia.optimism.io
- **Explorer**: https://sepolia-optimism.etherscan.io
- **Faucet**: https://app.optimism.io/faucet

### Arbitrum Sepolia
- **Chain ID**: 421614
- **RPC**: https://sepolia-rollup.arbitrum.io/rpc
- **Explorer**: https://sepolia.arbiscan.io
- **Faucet**: https://faucet.quicknode.com/arbitrum/sepolia

### Polygon Amoy
- **Chain ID**: 80002
- **RPC**: https://rpc-amoy.polygon.technology
- **Explorer**: https://amoy.polygonscan.com
- **Faucet**: https://faucet.polygon.technology

### Base Sepolia
- **Chain ID**: 84532
- **RPC**: https://sepolia.base.org
- **Explorer**: https://sepolia-explorer.base.org
- **Faucet**: https://www.coinbase.com/faucets/base-ethereum-goerli-faucet

## System Architecture

### Smart Contracts

#### PrivacyPaymentAccount.sol
- ERC-4337 compatible smart contract wallet
- Verifies zk-SNARK proofs
- Executes privacy-preserving payments
- Prevents replay attacks with nonce system
- Tracks spent commitments

#### MerkleCommitmentRegistry.sol
- Manages payment commitments in Merkle trees
- Supports cross-chain commitment verification
- Tracks commitments per chain

#### CrossChainReplayProtection.sol
- Prevents replay attacks across chains
- Uses chain ID + nonce combination
- Generates unique nonces per chain

#### Verifier.sol
- Groth16 zk-SNARK verifier
- Generated from Circom circuit
- Verifies proof validity on-chain

### Zero-Knowledge Circuit

#### payment.circom
- ~150 constraints for fast proof generation
- Proves knowledge of valid commitment
- Verifies amount without revealing sender

**Circuit Logic:**
```
commitment = hash(secret, recipientHash, amount)
Prove: User knows valid secret for commitment
```

### TypeScript SDK

**5-Line Payment Flow:**
```typescript
import { Heka402SDK } from '@heka402/sdk';

const sdk = new Heka402SDK(provider, signer, contractAddress, wasm, zkey);
await sdk.executePayment({
  recipient: '0x...',
  amount: ethers.parseEther('0.1').toString(),
  chains: [11155111, 11155420, 421614, 80002, 84532]
});
```

### Privacy Flow

**Double Privacy Layer:**

1. **zk-SNARK Layer**:
   - User generates proof of payment knowledge
   - Proof doesn't reveal sender identity
   - Commitment hash is public, secret is private

2. **Split Payment Layer**:
   - Payment split across multiple chains
   - Each chain sees only partial amount
   - Recipient receives full amount across chains

**Payment Execution Flow:**
```
1. User generates secret
2. Create commitment = hash(secret, recipient, amount)
3. Generate zk proof (proves knowledge of secret)
4. Split amount across selected chains
5. Execute payment on each chain with proof
6. Recipient receives payments on all chains
```

## Testing

1. Get testnet ETH from faucets (see Network Configuration above)
2. Connect wallet to frontend
3. Select chains for split payment
4. Enter recipient and amount
5. Execute payment

## Troubleshooting

### Circuit Files Not Found
- Ensure circuits are compiled: `cd circuits && npm run compile`
- Copy `payment.wasm` and `payment.zkey` to `frontend/public/circuits/`
- Or host on CDN and update environment variables

### Contract Not Deployed
- Make sure contracts are deployed to all target chains
- Update `NEXT_PUBLIC_CONTRACT_ADDRESS` in `.env.local` or Vercel

### Wallet Connection Issues
- Ensure MetaMask is installed
- Switch to a supported testnet
- Check browser console for errors

### Proof Generation Fails
- Ensure circuit files are accessible
- Check that circuit was compiled correctly
- Verify circuit inputs match expected format

## Technical Stack

- **Smart Contracts**: Solidity 0.8.30, Foundry
- **Zero-Knowledge**: Circom, snarkjs, Groth16
- **Frontend**: Next.js 14, React, Tailwind CSS, wagmi, viem
- **SDK**: TypeScript, ethers.js v6
- **Backend**: Serverless functions (Vercel)
- **Deployment**: Vercel, Remix IDE, Foundry

## Security Considerations

- ✅ Replay protection (nonce + chain ID)
- ✅ Commitment tracking (prevent double spending)
- ✅ Zero-knowledge proofs (privacy)
- ✅ Input validation
- ✅ Reentrancy guards

## Limitations & Future Work

- ERC-20 token support (currently native ETH only)
- Batch payments (multiple recipients)
- Privacy pools/mixer functionality
- Mobile SDK (React Native)
- Mainnet deployment
- Full ERC-4337 bundler implementation
- Optimized circuit for lower gas costs

## License

MIT
