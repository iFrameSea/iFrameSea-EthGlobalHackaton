'use client';
import { sepolia } from 'wagmi/chains';

import { WagmiConfig, createConfig, configureChains } from 'wagmi';

import { publicProvider } from 'wagmi/providers/public';

import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import WalletPopup from './WalletPopup';

export const ganache = {
  id: 1337,
  name: 'Ganache',
  network: 'ganache',
  nativeCurrency: {
    decimals: 18,
    name: 'ETH',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['http://127.0.0.1:7545'],
    },
    public: {
      http: ['http://127.0.0.1:7545'],
    },
  },
};

// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
const { chains, publicClient } = configureChains([sepolia], [publicProvider()]);

// Set up wagmi config
const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({
      chains: [sepolia],
    }),
    // new InjectedConnector({
    //   chains: [sepolia],
    //   options: {
    //     name: 'Injected',
    //     shimDisconnect: true,
    //     getProvider: () =>
    //       typeof window !== 'undefined' && window?.trustWallet
    //         ? window.trustWallet
    //         : undefined,
    //   },
    // }),
    new WalletConnectConnector({
      options: {
        projectId: '6ca8086a73c362ecf676554fee174e4f',
        metadata: {
          name: 'ETHEREMPIRES',
          description: 'ETHEREMPIRES',
          url: 'https://etherempires.io',
          icons: ['https://etherempires.io/favicon.ico'],
        },
      },
    }),
    new CoinbaseWalletConnector({
      chains: [sepolia],
      options: {
        appName: 'wagmi',
      },
    }),
  ],
  publicClient,
});

function WalletProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={config}>
      <WalletPopup />
      {children}
    </WagmiConfig>
  );
}

export default WalletProvider;
