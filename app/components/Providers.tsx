'use client';
import { WalletProvider } from '@/app/components/wallet';

export default function Providers({ children }: { children: React.ReactNode }) {
  return <WalletProvider>{children}</WalletProvider>;
}
