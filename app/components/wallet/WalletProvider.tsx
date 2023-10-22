'use client';
import { WagmiConfig, createConfig, configureChains } from 'wagmi';

import { publicProvider } from 'wagmi/providers/public';

import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import WalletPopup from './WalletPopup';
import { sepolia } from 'wagmi/chains';
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

export const appChain = [sepolia];

// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
const { chains, publicClient } = configureChains(appChain, [publicProvider()]);

// Set up wagmi config
const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({
      chains: appChain,
    }),
    // new InjectedConnector({
    //   chains: appChain,
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
          name: 'iFrameSea',
          description: 'iFrameSea',
          url: 'http://localhost:3000',
          icons: ['http://localhost:3000/favicon.ico'],
        },
      },
    }),
    new CoinbaseWalletConnector({
      chains: appChain,
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
