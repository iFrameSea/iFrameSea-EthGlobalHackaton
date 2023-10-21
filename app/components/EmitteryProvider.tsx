import Emittery from 'emittery';

export const emitter = new Emittery();

export default function EmitteryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
