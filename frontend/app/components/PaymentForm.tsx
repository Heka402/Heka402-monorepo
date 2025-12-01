'use client';

import { useState } from 'react';
import { ethers } from 'ethers';
import { Heka402SDK } from '@heka402/sdk';

interface PaymentFormProps {
  address: string;
  selectedChains: number[];
  currentChain: any;
  onSwitchNetwork?: (chainId?: number) => void;
}

export function PaymentForm({
  address,
  selectedChains,
  currentChain,
  onSwitchNetwork,
}: PaymentFormProps) {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePayment = async () => {
    if (!recipient || !amount) {
      setError('Please fill in all fields');
      return;
    }

    if (!ethers.isAddress(recipient)) {
      setError('Invalid recipient address');
      return;
    }

    setLoading(true);
    setError(null);
    setTxHash(null);

    try {
      // Initialize provider and signer
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Load circuit files (in production, these would be hosted)
      // For now, we'll use placeholder paths
      const wasmResponse = await fetch('/circuits/payment.wasm');
      const zkeyResponse = await fetch('/circuits/payment.zkey');
      
      if (!wasmResponse.ok || !zkeyResponse.ok) {
        throw new Error('Circuit files not found. Please ensure circuits are compiled.');
      }

      const wasm = await wasmResponse.arrayBuffer();
      const zkey = await zkeyResponse.arrayBuffer();

      // Contract address (should be deployed)
      const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0x...';

      // Initialize SDK
      const sdk = new Heka402SDK(provider, signer, contractAddress, wasm, zkey);

      // Execute payment (5-line flow)
      const hash = await sdk.executePayment({
        recipient,
        amount: ethers.parseEther(amount).toString(),
        chains: selectedChains,
      });

      setTxHash(hash);
    } catch (err: any) {
      setError(err.message || 'Payment failed');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
      <h2 className="text-2xl font-bold text-white mb-6">Privacy Payment</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-white font-semibold mb-2">
            Recipient Address
          </label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="0x..."
            className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-white font-semibold mb-2">
            Amount (ETH)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.1"
            step="0.001"
            min="0"
            className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <p className="text-blue-200 text-sm mb-2">
            Selected Chains: {selectedChains.join(', ')}
          </p>
          <p className="text-blue-300 text-xs">
            Payment will be split across {selectedChains.length} chain(s)
          </p>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500 rounded-lg p-4">
            <p className="text-red-200">{error}</p>
          </div>
        )}

        {txHash && (
          <div className="bg-green-500/20 border border-green-500 rounded-lg p-4">
            <p className="text-green-200 font-semibold mb-2">Payment Successful!</p>
            <a
              href={`${currentChain?.blockExplorers?.default?.url}/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-300 hover:text-green-200 underline text-sm"
            >
              View Transaction: {txHash.slice(0, 10)}...
            </a>
          </div>
        )}

        <button
          onClick={handlePayment}
          disabled={loading || !recipient || !amount}
          className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Processing...' : 'Execute Privacy Payment'}
        </button>
      </div>

      <div className="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
        <p className="text-blue-200 text-xs">
          🔒 This payment uses zero-knowledge proofs to protect your privacy.
          The payment will be split across {selectedChains.length} chain(s) for additional privacy.
        </p>
      </div>
    </div>
  );
}

