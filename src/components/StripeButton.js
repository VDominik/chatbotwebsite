'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import styles from '@/app/page.module.css'; // Update this path if needed

export default function StripeButton({ priceId, email, plan, children }) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      // 1. Save the selected plan in your Supabase database via your API route
      const savePlanResponse = await fetch('/api/save-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, plan })
      });

      if (!savePlanResponse.ok) {
        throw new Error('Failed to save plan selection');
      }

      // 2. Create a Stripe Checkout session that includes the user's email
      const checkoutResponse = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ priceId, email })
      });

      const { url } = await checkoutResponse.json();

      if (url) {
        window.location.href = url;
      } else {
        throw new Error('Failed to create checkout session');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error("There was an issue starting the subscription process.");
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