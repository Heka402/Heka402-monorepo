'use client';

interface Chain {
  id: number;
  name: string;
}

interface ChainSelectorProps {
  chains: Chain[];
  selectedChains: number[];
  onChainsChange: (chains: number[]) => void;
}

export function ChainSelector({
  chains,
  selectedChains,
  onChainsChange,
}: ChainSelectorProps) {
  const toggleChain = (chainId: number) => {
    if (selectedChains.includes(chainId)) {
      onChainsChange(selectedChains.filter((id) => id !== chainId));
    } else {
      onChainsChange([...selectedChains, chainId]);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
      <h3 className="text-white font-bold text-lg mb-4">Select Chains for Split Payment</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {chains.map((chain) => (
          <button
            key={chain.id}
            onClick={() => toggleChain(chain.id)}
            className={`px-4 py-3 rounded-lg font-semibold transition-all ${
              selectedChains.includes(chain.id)
                ? 'bg-blue-600 text-white border-2 border-blue-400'
                : 'bg-white/10 text-blue-200 border-2 border-white/20 hover:bg-white/20'
            }`}
          >
            {chain.name}
          </button>
        ))}
      </div>
      <p className="text-blue-300 text-sm mt-4">
        Selected: {selectedChains.length} chain(s) - Payment will be split equally
      </p>
    </div>
  );
}

