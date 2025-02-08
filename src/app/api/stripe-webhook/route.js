// src/app/api/stripe-webhook/route.js
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

// Disable automatic body parsing so we can access the raw body
export const config = {
  api: {
    bodyParser: false,
  },
};

// Initialize Stripe with your secret key and set your API version (adjust as needed)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
});

// Initialize Supabase with your project URL and server-side service key
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_URL,
);

export async function POST(request) {
  // Retrieve the raw body as a buffer
  const buf = await request.arrayBuffer();
  const rawBody = Buffer.from(buf).toString("utf8");

  // Retrieve the Stripe signature from the headers
  const sig = request.headers.get("stripe-signature");

  let event;
  try {
    // Verify the event by constructing it with the raw body, signature, and webhook secret
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // Process the event based on its type
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    // Extract the subscription ID and customer email from the session
    const stripeSubscriptionId = session.subscription;
    const customerEmail = session.customer_email;

    console.log(
      `Checkout session completed for email: ${customerEmail}, subscription: ${stripeSubscriptionId}`
    );

    // Update the subscription record in Supabase to store the Stripe subscription ID.
    // Ensure that your "subscriptions" table has a column named "stripe_subscription_id"
    const { data, error } = await supabase
      .from("subscriptions")
      .update({ stripe_subscription_id: stripeSubscriptionId })
      .eq("email", customerEmail);

    if (error) {
      console.error("Error updating subscription in Supabase:", error);
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500 }
      );
    }
  }

  // Return a 200 response to acknowledge receipt of the event
  return new Response(JSON.stringify({ received: true }), { status: 200 });
}