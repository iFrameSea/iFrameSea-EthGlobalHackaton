'use client';

import { useAccount } from 'wagmi';
import { ConnectButton } from './components/wallet';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const { isConnected, address } = useAccount();

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="grid gap-4 max-w-md">
          <Image
            src="/logo.svg"
            width={200}
            height={200}
            alt="logo"
            className="mx-auto mb-4"
          />
          <h1 className="text-5xl font-bold">iFrameSea</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          {isConnected ? (
            <Link href={`/frame/${address}`} className="btn btn-lg btn-info">
              Lunch
            </Link>
          ) : (
            <ConnectButton />
          )}
        </div>
      </div>
    </div>
  );
}
