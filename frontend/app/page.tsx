'use client';

import { useState } from 'react';
import { useAccount, useConnect, useDisconnect, useChainId, useChains, useSwitchChain } from 'wagmi';
import { PaymentForm } from './components/PaymentForm';
import { ChainSelector } from './components/ChainSelector';

export default function Home() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();
  const chains = useChains();
  const { switchChain } = useSwitchChain();
  const currentChain = chains.find(c => c.id === chainId);

  const [selectedChains, setSelectedChains] = useState<number[]>([
    11155111, // Sepolia
  ]);

  const supportedChains = [
    { id: 11155111, name: 'Sepolia' },
    { id: 11155420, name: 'Optimism Sepolia' },
    { id: 421614, name: 'Arbitrum Sepolia' },
    { id: 80002, name: 'Polygon Amoy' },
    { id: 84532, name: 'Base Sepolia' },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-4">
              Heka402
            </h1>
            <p className="text-xl text-blue-200 mb-2">
              Cross-chain Privacy Payments over x402
            </p>
            <p className="text-sm text-blue-300">
              Zero-knowledge proofs + Account Abstraction + Multi-chain
            </p>
          </div>

          {/* Wallet Connection */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/20">
            {!isConnected ? (
              <div className="text-center">
                <p className="text-white mb-4">Connect your wallet to start</p>
                <div className="flex gap-4 justify-center">
                  {connectors.map((connector) => (
                    <button
                      key={connector.id}
                      onClick={() => connect({ connector })}
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
                    >
                      Connect {connector.name}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-semibold">Connected</p>
                  <p className="text-blue-200 text-sm font-mono">{address}</p>
                  <p className="text-blue-300 text-xs mt-1">
                    Chain: {currentChain?.name || 'Unknown'} ({currentChain?.id || chainId})
                  </p>
                </div>
                <button
                  onClick={() => disconnect()}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors"
                >
                  Disconnect
                </button>
              </div>
            )}
          </div>

          {/* Chain Selector */}
          {isConnected && (
            <div className="mb-8">
              <ChainSelector
                chains={supportedChains}
                selectedChains={selectedChains}
                onChainsChange={setSelectedChains}
              />
            </div>
          )}

          {/* Payment Form */}
          {isConnected && (
              <PaymentForm
              address={address!}
              selectedChains={selectedChains}
              currentChain={currentChain}
              onSwitchNetwork={(chainId) => chainId && switchChain({ chainId })}
            />
          )}

          {/* Features */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <h3 className="text-white font-bold text-lg mb-2">🔐 Zero-Knowledge</h3>
              <p className="text-blue-200 text-sm">
                Prove payment knowledge without revealing identity
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <h3 className="text-white font-bold text-lg mb-2">🔗 Multi-Chain</h3>
              <p className="text-blue-200 text-sm">
                Split payments across multiple EVM chains
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <h3 className="text-white font-bold text-lg mb-2">🌐 x402 Protocol</h3>
              <p className="text-blue-200 text-sm">
                HTTP-native payment standard for AI agents
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

