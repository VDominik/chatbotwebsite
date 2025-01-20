import Link from 'next/link';
import styles from './success.module.css';

export default function SuccessPage() {
  return (
    <div className={styles.successContainer}>
      <div className={styles.successIcon}>✓</div>
      <h1>Payment Successful!</h1>
      <p>Thank you for subscribing to our AI Chatbot service. You'll receive a confirmation email shortly with further instructions.</p>
      <Link href="/" className={styles.backButton}>
        Return to Homepage
      </Link>
    </div>
  );
} 