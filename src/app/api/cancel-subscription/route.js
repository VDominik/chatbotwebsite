// src/app/api/cancel-subscription/route.js
import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";

// Initialize Supabase (server-side) with the correct service key
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const { email } = await request.json();

    // First, fetch the subscription record to get the Stripe subscription ID
    const { data: subscription, error: fetchError } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("email", email)
      .maybeSingle();

    if (fetchError || !subscription) {
      throw new Error("Subscription not found.");
    }

    // Assume the record has a column named 'stripe_subscription_id'
    const stripeSubscriptionId = subscription.stripe_subscription_id;

    if (stripeSubscriptionId) {
      // Cancel the subscription on Stripe if the ID exists
      await stripe.subscriptions.cancel(stripeSubscriptionId);
      console.log("Stripe cancellation result:", stripeSubscriptionId);
    }

    // Delete the subscription record from Supabase based on the email
    const { data, error: deleteError } = await supabase
      .from("subscriptions")
      .delete()
      .eq("email", email);

    if (deleteError) {
      throw deleteError;
    }

    return new Response(
      JSON.stringify({
        message: "Subscription cancelled and deleted from database."
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Error cancelling subscription:", err.message);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500
    });
  }
}