import Link from 'next/link';
import styles from './cancel.module.css';

export default function CancelPage() {
  return (
    <div className={styles.cancelContainer}>
      <div className={styles.cancelIcon}>×</div>
      <h1>Payment Cancelled</h1>
      <p>Your payment was cancelled. If you experienced any issues or have questions, please don't hesitate to contact us.</p>
      <Link href="/" className={styles.backButton}>
        Return to Homepage
      </Link>
    </div>
  );
} 