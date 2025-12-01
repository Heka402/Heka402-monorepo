# Remix Deployment Guide

## Step 1: Open Remix IDE

1. Go to https://remix.ethereum.org
2. Create a new workspace called "Heka402"

## Step 2: Create Contract Files

Create the following files in Remix:

1. `PrivacyPaymentAccount.sol`
2. `MerkleCommitmentRegistry.sol`
3. `CrossChainReplayProtection.sol`
4. `Verifier.sol`

Copy the contract code from the `contracts/` directory.

## Step 3: Install Dependencies

In Remix, you'll need to install OpenZeppelin contracts:

1. Go to File Explorer
2. Right-click and select "New File"
3. Create `lib/openzeppelin-contracts/contracts/...` structure
4. Or use Remix's GitHub import feature

Alternatively, use Remix's import feature:
- Click "Import from GitHub"
- Enter: `OpenZeppelin/openzeppelin-contracts`
- Select version: `v5.0.0`

## Step 4: Compile Contracts

1. Go to "Solidity Compiler" tab
2. Set compiler version to `0.8.30`
3. Enable optimizer (runs: 200)
4. Compile each contract:
   - Start with `Verifier.sol`
   - Then `MerkleCommitmentRegistry.sol`
   - Then `PrivacyPaymentAccount.sol`

## Step 5: Deploy Contracts

1. Go to "Deploy & Run Transactions" tab
2. Select environment: "Injected Provider - MetaMask"
3. Connect your MetaMask wallet
4. Switch to desired testnet (Sepolia, etc.)

### Deploy Order:

1. **Verifier**
   - Deploy with no constructor parameters
   - Copy the deployed address

2. **MerkleCommitmentRegistry**
   - Constructor: `_owner` (your address)
   - Copy the deployed address

3. **PrivacyPaymentAccount**
   - Constructor: `_verifier` (Verifier address), `_owner` (your address)
   - Copy the deployed address

## Step 6: Verify Contracts

1. Go to Etherscan/Polygonscan for the respective chain
2. Navigate to the contract address
3. Click "Verify and Publish"
4. Paste the contract source code
5. Select compiler version and settings
6. Submit for verification

## Step 7: Update Configuration

Update your frontend `.env.local` with the deployed contract addresses:

```
NEXT_PUBLIC_CONTRACT_ADDRESS=<PrivacyPaymentAccount address>
```

## Network RPC URLs

- **Sepolia**: https://sepolia.infura.io/v3/YOUR_KEY
- **Optimism Goerli**: https://goerli.optimism.io
- **Arbitrum Goerli**: https://goerli-rollup.arbitrum.io/rpc
- **Polygon Mumbai**: https://matic-mumbai.chainstacklabs.com

## Gas Estimation

Approximate gas costs (may vary):
- Verifier: ~500,000 gas
- MerkleCommitmentRegistry: ~1,000,000 gas
- PrivacyPaymentAccount: ~2,000,000 gas

Make sure you have enough testnet ETH/MATIC for deployment.

