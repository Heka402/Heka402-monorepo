/**
 * Example: 5-Line Privacy Payment
 * 
 * This demonstrates the simplest way to execute a privacy-preserving
 * cross-chain payment using Heka402 SDK.
 */

import { Heka402SDK } from '../src';
import { ethers } from 'ethers';

async function example() {
  // Setup (one-time)
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  
  // Load circuit files (in production, host on CDN)
  const wasm = await fetch('/circuits/payment.wasm').then(r => r.arrayBuffer());
  const zkey = await fetch('/circuits/payment.zkey').then(r => r.arrayBuffer());
  
  const contractAddress = '0x...'; // Your deployed contract address
  const sdk = new Heka402SDK(provider, signer, contractAddress, wasm, zkey);

  // 5-Line Payment Flow
  // Line 1: Generate secret (automatic if not provided)
  // Line 2: Generate zk proof
  // Line 3: Split payment across chains
  // Line 4: Generate nonce for replay protection
  // Line 5: Execute payment on each chain
  
  const txHash = await sdk.executePayment({
    recipient: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
    amount: ethers.parseEther('0.1').toString(), // 0.1 ETH
    chains: [11155111, 420, 421613], // Sepolia, Optimism, Arbitrum
  });

  console.log('Payment executed:', txHash);
}

// x402 Protocol Example
async function x402Example() {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const wasm = await fetch('/circuits/payment.wasm').then(r => r.arrayBuffer());
  const zkey = await fetch('/circuits/payment.zkey').then(r => r.arrayBuffer());
  const sdk = new Heka402SDK(provider, signer, '0x...', wasm, zkey);

  // x402-compatible payment
  const result = await sdk.x402Payment({
    url: 'https://api.example.com/ai-service',
    amount: ethers.parseEther('0.05').toString(),
    chains: [11155111, 420], // Split across 2 chains
  });

  console.log('x402 Payment:', result.txHash, result.commitment);
}

