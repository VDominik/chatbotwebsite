'use client';

import { useState } from 'react';
import styles from '@/app/page.module.css'; // Import styles from your main CSS module

export default function StripeButton({ priceId, children }) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId }),
      });

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleClick} 
      disabled={loading}
      className={styles.selectPlan}
    >
      {loading ? 'Loading...' : children}
    </button>
  );
}
