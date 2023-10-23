'use client';

import { useContractRead, useContractWrite } from 'wagmi';
import InitCanvas from '../webGL/initCanvas';
import { create } from 'ipfs-http-client';
import { Buffer } from 'buffer';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import IFRAMESEA from '@/artifacts/contracts/IFRAMESEA.sol/IFRAMESEA.json';
import { emitter } from '@/app/components/EmitteryProvider';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

/* configure Infura auth settings */
const projectId = process.env.IPFS_PROJECT_KEY;
const projectSecret = process.env.IPFS_PROJECT_SECRET;
const auth =
  'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const client = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth,
  },
});

export default function FramePage() {
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const { address } = useParams();
  const input = useRef<HTMLInputElement | null>(null);
  const modal = useRef<HTMLDialogElement | null>(null);

  const [data, setData] = useState({
    parent: address,
    walletAddress: address as string,
    NFTs: [],
    AvatarUrl: '',
    rot: [Math.PI / 2, Math.PI / 2, -Math.PI / 2, -Math.PI / 2, 0, 0],
    coord: [
      [47 / 4, 10 / 4, 20 / 4],
      [47 / 4, 10 / 4, 80 / 4],
      [-47 / 4, 10 / 4, 20 / 4],
      [-47 / 4, 10 / 4, 80 / 4],
      [-20 / 4, 10 / 4, 99 / 4],
      [20 / 4, 10 / 4, 99 / 4],
    ],
  });

  const { writeAsync: safeMint } = useContractWrite({
    address: process.env.CONTRACT as `0x${string}`,
    abi: IFRAMESEA.abi,
    functionName: 'safeMint',
  });

  const {
    data: NFTs,
    isFetched,
    refetch,
  } = useContractRead({
    address: process.env.CONTRACT as `0x${string}`,
    abi: IFRAMESEA.abi,
    functionName: 'tokensOwnedByAddress',
    args: [address],
  });

  const uploadToIpfs = async () => {
    if (!file || uploading) return;

    setUploading(true);

    try {
      const added = await client.add(file);
      const url = `https://ipfs.io/ipfs/${added.path}`;
      setFileUrl(url);
    } catch (error) {
      console.log('Error uploading file: ', error);
    }

    setUploading(false);
  };

  useEffect(() => {
    setData({ ...data, ...{ NFTs: NFTs?.map((nft: any) => nft.uri) } });
  }, [NFTs]);

  const mint = async () => {
    if (!fileUrl || loading) return;

    setLoading(true);

    try {
      await safeMint({ args: [fileUrl] });
    } catch (err) {
      console.log(err);
    }

    refetch();

    setLoading(false);

    emitter.emit('nft-minted', fileUrl);

    setFile(null);
    setFileUrl('');

    if (input.current) input.current.value = '';

    modal.current?.close();
  };

  return (
    <>
      <InitCanvas key={data.NFTs?.length} data={data} />
      <div className="fixed left-4 bottom-4">
        <button className="btn" onClick={() => modal.current?.showModal()}>
          Mint NFT
        </button>
        <dialog ref={modal} className="modal">
          <div className="modal-box max-w-2xl">
            <h3 className="font-bold text-lg">Mint Your NFT Art</h3>
            <p className="py-4">You can upload on IPFS</p>
            <div className="grid grid-cols-2">
              <div className="form-control w-full max-w-xs">
                <img src={fileUrl} alt="" />
                <label className="label">
                  <span className="label-text">UPload in IPFS</span>
                </label>
                <input
                  type="file"
                  ref={input}
                  onChange={({ target }) =>
                    target.files?.length && setFile(target.files[0])
                  }
                  className="file-input file-input-bordered w-full max-w-xs"
                />
              </div>
            </div>
            <div className="modal-action">
              <button
                className="btn btn-primary relative group"
                disabled={loading || uploading}
                onClick={fileUrl ? mint : uploadToIpfs}
              >
                <span className="group-disabled:invisible visible opacity-100 group-disabled:opacity-0">
                  {fileUrl ? 'Mint' : 'Upload'}
                </span>
                <span className="hidden group-disabled:flex absolute inset-0 justify-center items-center">
                  <span className="loading loading-spinner"></span>
                </span>
              </button>
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </>
  );
}
