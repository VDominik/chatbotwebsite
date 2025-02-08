// src/app/api/update-subscription/route.js
import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";

// Initialize Supabase with your public URL and server-side service key
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const { sessionId, email } = await request.json();

    // Retrieve the checkout session details from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    // The subscription ID should be present in the session (if the checkout completed successfully)
    const subscriptionId = session.subscription;
    if (!subscriptionId) {
      throw new Error("Subscription ID not found in checkout session.");
    }

    // Update the subscription record in Supabase with the subscription ID
    const { data, error } = await supabase
      .from("subscriptions")
      .update({ stripe_subscription_id: subscriptionId })
      .eq("email", email);

    if (error) {
      throw error;
    }

    return new Response(JSON.stringify({ message: "Subscription updated", subscriptionId }), { status: 200 });
  } catch (err) {
    console.error("Error updating subscription:", err.message);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}