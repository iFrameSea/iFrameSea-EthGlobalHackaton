'use client';
import { sepolia } from 'wagmi/chains';
import { useEffect, useState } from 'react';
import { BiLoaderAlt } from 'react-icons/bi';
import { Connector, useAccount, useConnect, useSwitchNetwork } from 'wagmi';
import Image from 'next/image';
import { ganache } from './WalletProvider';
import { toast } from 'react-toastify';

function WalletPopup() {
  const { connect, connectors, isLoading, isError, data } = useConnect();
  const [selectedProvider, setSelectedProvider] = useState('');
  const tabs = [
    {
      connector: connectors[0],
      image: '/MetaMask_Fox.svg',
      name: 'Metamask',
    },
    {
      connector: connectors[2],
      image: '/wallet-connect.svg',
      name: 'WalletConnect',
    },
  ];

  const { isConnected } = useAccount();

  const closePopup = () => {
    const modal = document.getElementById(
      'walletPopup'
    ) as HTMLDialogElement | null;

    modal?.close();
  };

  useEffect(() => {
    if (isError) toast.error('Your wallet not connected');
  }, [isError]);

  useEffect(() => {
    closePopup();

    setSelectedProvider('');
  }, [isConnected]);

  const connectWallet = (connector: Connector, provider: string) => {
    if (!isLoading) connect({ connector, chainId: sepolia.id });

    setSelectedProvider(provider);
  };

  return (
    <dialog id="walletPopup" className="modal">
      <div className="modal-box max-w-2xl w-full">
        <h2 className="text-center sm:text-4xl font-bold mb-10">
          CONNECT WALLET
        </h2>
        <div className="grid">
          <div className="bg-black/20 w-full p-4 sm:p-12 rounded-3xl -mt-4">
            <p className="text-white/75 text-center text-xs sm:text-xl">
              {/* {tabs[currentTab].description} */}
            </p>

            <div className="flex items-center space-x-8 justify-around mt-8">
              {tabs.map(({ connector, image, name }, index) => (
                <button
                  key={index}
                  className="grid gap-2 content-center w-44 h-32 btn"
                  onClick={() => connectWallet(connector, name)}
                >
                  {isLoading && selectedProvider == name && (
                    <span className="absolute inset-0 flex items-center justify-center text-primary bg-white/20">
                      <BiLoaderAlt size={44} className="animate-spin" />
                    </span>
                  )}
                  <Image
                    width={56}
                    height={56}
                    src={image}
                    alt={name}
                    className="mx-auto w-10 sm:w-14"
                  />
                  <span className="text-white text-sm font-light">{name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}

export default WalletPopup;
