import styles from "./pricingPlans.module.css";
import { Check } from "lucide-react";
import Link from "next/link";
import StripeButton from "@/components/StripeButton"; // In case you want to offer an upgrade/downgrade
import { toast, ToastContainer } from "react-toastify";

export default function PricingPlans({ isDashboard, email }) {
  console.log("PricingPlans isDashboard", isDashboard);

  const handleClick = () => {
    toast.info("Please contact us or login before selecting a plan.", {
      autoClose: 5000, // The toast will automatically close after 5 seconds
    });
  };

  return (
    <section id="pricing" className={styles.pricing}>
      <span className={styles.heroSpan}>Get Started Today</span>
      <h2>Ready to Transform Your Customer Experience?</h2>
      <p className={styles.pricingParagraph}>
        Join the thousands of businesses using ChatFlow AI to deliver
        exceptional customer service, increase satisfaction, and reduce support
        costs.
      </p>
      <div className={styles.pricingGrid}>
        <div className={styles.pricingCard}>
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
                  <Check className={styles.pricingCheckIcon} size={12} />
                </div>
                <div className={styles.demoCheckText}>
                  Essential chatbot functionality
                </div>
              </div>
            </li>
            <li>
              <div className={styles.demoCheck}>
                <div className={styles.pricingCheckIconWrapper}>
                  <Check className={styles.pricingCheckIcon} size={12} />
                </div>
                <div className={styles.demoCheckText}>
                  AI-powered responses from uploaded documents
                </div>
              </div>
            </li>
            <li>
              <div className={styles.demoCheck}>
                <div className={styles.pricingCheckIconWrapper}>
                  <Check className={styles.pricingCheckIcon} size={12} />
                </div>
                <div className={styles.demoCheckText}>Email support</div>
              </div>
            </li>
          </ul>
          {/* <StripeButton priceId="price_1Qiv3KKzyhM3L3BGPrSyf7fP">
              Select Basic Plan
            </StripeButton> */}

          {isDashboard ? (
            <StripeButton
              className={styles.selectPlan}
              // priceId="price_1QpZn0KzyhM3L3BGHRqRb6XY"
              priceId="price_1Qiv3KKzyhM3L3BGPrSyf7fP"
              email={email}
              plan="Basic"
            >
              Select Basic Plan
            </StripeButton>
          ) : (
            <Link href="#contact">
              <button onClick={handleClick} className={styles.selectPlan}>
                Select Basic Plan
              </button>
            </Link>
          )}
          {/* <p className={styles.bestfortext}>
              Ideal for small businesses & individuals who need a simple yet
              powerful document-based chatbot without complex automation.
            </p> */}
        </div>
        <div className={`${styles.pricingCard} ${styles.featured}`}>
          <div className={styles.pricingMostPopular}>Most Popular</div>
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
                  <Check className={styles.pricingCheckIcon} size={12} />
                </div>
                <div className={styles.demoCheckText}>
                  Automated lead capture
                </div>
              </div>
            </li>
            <li>
              <div className={styles.demoCheck}>
                <div className={styles.pricingCheckIconWrapper}>
                  <Check className={styles.pricingCheckIcon} size={12} />
                </div>
                <div className={styles.demoCheckText}>
                  Analytics & reporting
                </div>
              </div>
            </li>
            <li>
              <div className={styles.demoCheck}>
                <div className={styles.pricingCheckIconWrapper}>
                  <Check className={styles.pricingCheckIcon} size={12} />
                </div>
                <div className={styles.demoCheckText}>
                  Continuous AI learning & document updates
                </div>
              </div>
            </li>
            <li>
              <div className={styles.demoCheck}>
                <div className={styles.pricingCheckIconWrapper}>
                  <Check className={styles.pricingCheckIcon} size={12} />
                </div>
                <div className={styles.demoCheckText}>
                  Conversation storage & Google Docs sync
                </div>
              </div>
            </li>
          </ul>
          {/* <StripeButton priceId="price_1QiuyRKzyhM3L3BGcMPw7NEC">
              Select Pro Plan
            </StripeButton> */}
          {isDashboard ? (
            <StripeButton
              className={`${styles.selectPlan} ${styles.featured}`}
              // priceId="price_1QpZo1KzyhM3L3BGadrlzguD"
              priceId="price_1QiuyRKzyhM3L3BGcMPw7NEC"
              email={email}
              plan="Professional"
            >
              Select Pro Plan
            </StripeButton>
          ) : (
            <Link href="#contact">
              <button
                onClick={handleClick}
                className={`${styles.selectPlan} ${styles.featured}`}
              >
                Select Pro Plan
              </button>
            </Link>
          )}
          {/* <p className={styles.bestfortext}>
              Best for businesses that want more automation, smarter AI, and
              insights from customer interactions.
            </p> */}
        </div>
        <div className={styles.pricingCard}>
          <h3 className={styles.pricingPlanName}>Enterprise</h3>
          <p>For large organizations</p>
          <p className={styles.price}>Custom</p>

          <ul>
            <li>Everything in Professional, plus</li>
            <li>
              <div className={styles.demoCheck}>
                <div className={styles.pricingCheckIconWrapper}>
                  <Check className={styles.pricingCheckIcon} size={12} />
                </div>
                <div className={styles.demoCheckText}>White-label chatbot</div>
              </div>
            </li>
            <li>
              <div className={styles.demoCheck}>
                <div className={styles.pricingCheckIconWrapper}>
                  <Check className={styles.pricingCheckIcon} size={12} />
                </div>
                <div className={styles.demoCheckText}>
                  API access for deeper integration
                </div>
              </div>
            </li>
            <li>
              <div className={styles.demoCheck}>
                <div className={styles.pricingCheckIconWrapper}>
                  <Check className={styles.pricingCheckIcon} size={12} />
                </div>
                <div className={styles.demoCheckText}>Personalized Setup</div>
              </div>
            </li>
          </ul>
          {/* <StripeButton priceId="price_1QiuyRKzyhM3L3BGcMPw7NEC">
              Select Pro Plan
            </StripeButton> */}
          <Link href="#contact">
            <button onClick={handleClick} className={styles.selectPlan}>
              Contact Sales
            </button>
          </Link>
          {/* <p className={styles.bestfortext}>
              For Companies that need full control, deeper integrations, and a
              chatbot that fits into their existing systems.
            </p> */}
        </div>
      </div>
      <p className={styles.pricingNote}>
        All plans come with a 14-day free trial. No credit card required.
      </p>
    </section>
  );
}
