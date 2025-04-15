import styles from "@/app/page.module.css"; // Update this path if needed
import Link from "next/link";

export default function Navbar() {
  return (
    <header>
      <nav>
        <Link href="/">
          <div className={styles.logo}>
            <img src="/logo.png" alt="Logo" />
          </div>
        </Link>

        <div className={styles.navLinks}>
          <a href="#features">Features</a>
          <a href="#demo">Demo</a>
          <a href="#pricing">Pricing</a>
          <Link href="/login">
            <button className={styles.buttonSecondaryNav}>Sign In</button>
          </Link>
          <Link href="#contact">
            <button className={styles.buttonPrimaryNav}>Get Started</button>
          </Link>
        </div>
      </nav>
    </header>
  );
}
