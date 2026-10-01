import { MemberAppBar } from "@/components/MemberAppBar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MemberAppBar />
      {children}
    </>
  );
}
