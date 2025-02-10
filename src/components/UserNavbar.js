import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import styles from "@/app/page.module.css"; // Update this path if needed
import Link from "next/link";

// Replace these with your own Supabase project URL and anon key
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Create a single supabase client for interacting with your database
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function Navbar() {
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error);
    } else {
      router.push("/"); // Redirect to the login page after logout
    }
  };

  return (
    <header>
      <nav>
        <div className={styles.logo}>
          <Link href="/">
            <img src="/logo.png" alt="Logo" />
          </Link>
        </div>
        <div className={styles.navLinks}>
          <a href="#" onClick={handleLogout}>Logout</a>
        </div>
      </nav>
    </header>
  );
}