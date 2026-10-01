import { StewardAppBar } from "@/components/StewardAppBar";

export default function StewardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StewardAppBar />
      {children}
    </>
  );
}
