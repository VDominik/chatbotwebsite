"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./dashboard.module.css";
import StripeButton from "@/components/StripeButton"; // In case you want to offer an upgrade/downgrade
import UserNavbar from "@/components/UserNavbar";
import Modal from "@/components/Modal"; // Adjust the import path as needed
import Footer from "../Footer/Footer";
import PricingPlans from "../PricingPlans/PricingPlans";
import { Check } from "lucide-react";
import Link from "next/link";

// Create a Supabase client (using your public keys for client-side operations)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Dashboard() {
  const router = useRouter();
  const [session, setSession] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [loadingSub, setLoadingSub] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Fetch the current session when the component mounts
  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session: currentSession },
      } = await supabase.auth.getSession();
      if (!currentSession) {
        router.push("/login");
      } else {
        setSession(currentSession);
      }
    };

    fetchSession();
  }, [router]);

  // Once the session is available, fetch the subscription record for this user
  useEffect(() => {
    if (session) {
      const fetchSubscription = async () => {
        setLoadingSub(true);
        // Using maybeSingle() to gracefully handle no results
        const { data, error } = await supabase
          .from("subscriptions")
          .select("*")
          .eq("email", session.user.email)
          .maybeSingle();
        if (error) {
          console.error("Error fetching subscription:", error);
        } else {
          setSubscription(data); // data will be null if not found
        }
        setLoadingSub(false);
      };

      fetchSubscription();
    }
  }, [session]);

  // Function to cancel subscription
  const handleCancelSubscription = async () => {
    if (!subscription) return;

    setShowModal(true);
  };

  const handleConfirmCancel = async () => {
    setShowModal(false);

    try {
      const response = await fetch("/api/cancel-subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Passing the email (or subscription ID if available) to the API
        body: JSON.stringify({ email: session.user.email }),
      });
      const result = await response.json();
      if (!response.ok) {
        toast.error(result.error || "Cancellation failed.");
      } else {
        toast.success("Subscription cancelled.");
        // Optionally update the local state to reflect cancellation
        setSubscription(null);
      }
    } catch (error) {
      console.error("Error cancelling subscription:", error);
      toast.error("Cancellation failed.");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleClick = () => {
    toast.info("Please contact us or login before selecting a plan.", {
      autoClose: 5000, // The toast will automatically close after 5 seconds
    });
  };

  // While loading the session or subscription, display a loading state
  if (!session || loadingSub) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.dashboard}>
      <UserNavbar />
      <main className={styles.main}>
        {subscription ? (
          <section className={styles.subscriptionPlanSection}>
            {/* // If a subscription exists, show only that plan's details along
            with a Cancel button */}
            {/* <section className={styles.subscriptionDetails}>
              <p>Welcome, {session.user.email}</p>
              <h2>Your Subscription</h2>
              <div className={styles.pricingCard}>
                <h3>{subscription.plan} Plan</h3>
                {subscription.plan === "Basic" && (
                  <div>
                    <p>$99/month</p>
                    <ul>
                      <li>Basic chatbot functionality</li>
                      <li>Up to 1000 messages/month</li>
                      <li>Email support</li>
                    </ul>
                  </div>
                )}
                {subscription.plan === "Professional" && (
                  <div>
                    <p>$199/month</p>
                    <ul>
                      <li>Advanced AI capabilities</li>
                      <li>Unlimited messages</li>
                      <li>24/7 support</li>
                      <li>Custom training</li>
                    </ul>
                  </div>
                )}
                <button
                  onClick={handleCancelSubscription}
                  className={styles.cancelButton}
                >
                  Cancel Subscription
                </button>
              </div>
            </section> */}
            <p>Welcome, {session.user.email}</p>
            <h2>Your Subscription</h2>
            <div className={styles.pricingCard}>
              {subscription.plan === "Basic" && (
                <div>
                  <h3 className={styles.pricingPlanName}>Basic</h3>
                  <p>Perfect for small businesses</p>
                  <div className={styles.pricingPriceWrapper}>
                    <p className={styles.price}>$49</p>
                    <p>/month</p>
                  </div>
                  <ul>
                    <li>
                      <div className={styles.demoCheck}>
                        <div className={styles.pricingCheckIconWrapper}>
                          <Check
                            className={styles.pricingCheckIcon}
                            size={12}
                          />
                        </div>
                        <div className={styles.demoCheckText}>
                          Essential chatbot functionality
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className={styles.demoCheck}>
                        <div className={styles.pricingCheckIconWrapper}>
                          <Check
                            className={styles.pricingCheckIcon}
                            size={12}
                          />
                        </div>
                        <div className={styles.demoCheckText}>
                          AI-powered responses from uploaded documents
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className={styles.demoCheck}>
                        <div className={styles.pricingCheckIconWrapper}>
                          <Check
                            className={styles.pricingCheckIcon}
                            size={12}
                          />
                        </div>
                        <div className={styles.demoCheckText}>
                          Email support
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              )}
              {subscription.plan === "Professional" && (
                <div>
                  <h3 className={styles.pricingPlanName}>Professional</h3>
                  <p>For growing companies</p>

                  <div className={styles.pricingPriceWrapper}>
                    <p className={styles.price}>$99</p>
                    <p>/month</p>
                  </div>
                  <ul>
                    <li>Everything in Basic, plus:</li>
                    <li>
                      <div className={styles.demoCheck}>
                        <div className={styles.pricingCheckIconWrapper}>
                          <Check
                            className={styles.pricingCheckIcon}
                            size={12}
                          />
                        </div>
                        <div className={styles.demoCheckText}>
                          Automated lead capture
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className={styles.demoCheck}>
                        <div className={styles.pricingCheckIconWrapper}>
                          <Check
                            className={styles.pricingCheckIcon}
                            size={12}
                          />
                        </div>
                        <div className={styles.demoCheckText}>
                          Analytics & reporting
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className={styles.demoCheck}>
                        <div className={styles.pricingCheckIconWrapper}>
                          <Check
                            className={styles.pricingCheckIcon}
                            size={12}
                          />
                        </div>
                        <div className={styles.demoCheckText}>
                          Continuous AI learning & document updates
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className={styles.demoCheck}>
                        <div className={styles.pricingCheckIconWrapper}>
                          <Check
                            className={styles.pricingCheckIcon}
                            size={12}
                          />
                        </div>
                        <div className={styles.demoCheckText}>
                          Conversation storage & Google Docs sync
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              )}
              {/* <StripeButton priceId="price_1Qiv3KKzyhM3L3BGPrSyf7fP">
            Select Basic Plan
           </StripeButton> */}
              <button
                onClick={handleCancelSubscription}
                className={styles.cancelButton}
              >
                Cancel Subscription
              </button>
            </div>
          </section>
        ) : (
          // If no subscription exists, show the available plans

          // <section>
          //   <p>Welcome, {session.user.email}</p>
          //   <h2>Available Plans</h2>
          //   <div className={styles.pricingGrid}>
          //     <div className={styles.pricingCard}>
          //       <h3>Basic</h3>
          //       <p className={styles.price}>$99/month</p>
          //       <ul>
          //         <li>Basic chatbot functionality</li>
          //         <li>Up to 1000 messages/month</li>
          //         <li>Email support</li>
          //       </ul>
          //       <StripeButton
          //         // priceId="price_1QpZn0KzyhM3L3BGHRqRb6XY"
          //         priceId="price_1Qiv3KKzyhM3L3BGPrSyf7fP"
          //         email={session.user.email}
          //         plan="Basic"
          //       >
          //         Select Basic Plan
          //       </StripeButton>
          //     </div>
          //     <div className={`${styles.pricingCard} ${styles.featured}`}>
          //       <h3>Professional</h3>
          //       <p className={styles.price}>$199/month</p>
          //       <ul>
          //         <li>Advanced AI capabilities</li>
          //         <li>Unlimited messages</li>
          //         <li>24/7 support</li>
          //         <li>Custom training</li>
          //       </ul>
          //       <StripeButton
          //         // priceId="price_1QpZo1KzyhM3L3BGadrlzguD"
          //         priceId="price_1QiuyRKzyhM3L3BGcMPw7NEC"
          //         email={session.user.email}
          //         plan="Professional"
          //       >
          //         Select Pro Plan
          //       </StripeButton>
          //     </div>
          //   </div>
          // </section>
          <PricingPlans isDashboard={true} email={session.user.email} />
        )}
      </main>

      <Footer />
      <ToastContainer />
      <Modal
        show={showModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmCancel}
        message="Are you sure you want to cancel your subscription?"
      />
    </div>
  );
}
