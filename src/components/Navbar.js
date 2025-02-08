import styles from '@/app/page.module.css'; // Update this path if needed
import Link from "next/link";

export default function Navbar() {
    return(
        <header>
<nav>
  <div className={styles.logo}>
    <Link href="/">
      <img src="/LogoSmall.png" alt="Logo" />
    </Link>
  </div>
  <div className={styles.navLinks}>
    <a href="#features">Features</a>
    <a href="#pricing">Pricing</a>
    <a href="#contact">Contact</a>
    <a href="/login">Login</a>
  </div>
</nav>
</header>
    )
}