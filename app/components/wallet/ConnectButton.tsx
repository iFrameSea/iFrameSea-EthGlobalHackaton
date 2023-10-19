'use client';
import { useAccount, useDisconnect } from 'wagmi';

function ConnectButton({ className = '' }: { className?: string }) {
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();

  const getAddress = () => {
    if (address)
      return (
        address.slice(0, 4) +
        '...' +
        address.slice(address.length - 4, address.length)
      );
  };

  const openPopup = () => {
    const modal = document.getElementById(
      'walletPopup'
    ) as HTMLDialogElement | null;

    modal?.showModal();
  };

  const connectWallet = () => {
    isConnected ? disconnect() : openPopup();
  };

  return (
    <button className={`btn btn-primary ${className}`} onClick={connectWallet}>
      {!isConnected ? 'Connect' : getAddress()}
    </button>
  );
}

export default ConnectButton;
