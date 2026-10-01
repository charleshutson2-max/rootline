import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="rl-site-header">
      <Link className="rl-logo" href="/">
        Rootline
      </Link>
      <nav className="rl-site-nav" aria-label="Website">
        <Link href="/">Home</Link>
        <Link href="/download">Download</Link>
        <Link href="/membership">Request access</Link>
        <Link href="/app/tree">Open app</Link>
      </nav>
    </header>
  );
}
