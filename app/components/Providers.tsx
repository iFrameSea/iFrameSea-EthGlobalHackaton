'use client';
import { WalletProvider } from '@/app/components/wallet';
import EmitteryProvider from './EmitteryProvider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <EmitteryProvider>
      <WalletProvider>{children}</WalletProvider>
    </EmitteryProvider>
  );
}
