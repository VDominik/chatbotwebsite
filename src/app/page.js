"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import StripeButton from "@/components/StripeButton";
import Link from "next/link";

export default function Home() {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "module";
    script.textContent = `
    import Chatbot from "https://cdn.jsdelivr.net/npm/flowise-embed/dist/web.js"
    Chatbot.init({
        chatflowid: "f5739421-2bf0-4baa-b597-621a0ccb75db",
        apiHost: "https://flowisetest-hc47.onrender.com",
        chatflowConfig: {
          /* Chatflow Config */
        },
        observersConfig: {
          /* Observers Config */
        },
        theme: {
          button: {
            backgroundColor: '#3B81F6',
            right: 20,
            bottom: 20,
            size: 48,
            dragAndDrop: true,
            iconColor: 'white',
            customIconSrc: '/messenger2.png',
            autoWindowOpen: {
              autoOpen: false,
              openDelay: 2,
              autoOpenOnMobile: false
            }
          },
          tooltip: {
            showTooltip: true,
            tooltipMessage: 'Hi There 👋 Ask me!',
            tooltipBackgroundColor: 'black',
            tooltipTextColor: 'white',
            tooltipFontSize: 16
          },
          disclaimer: {
            title: 'Disclaimer',
            message: "By using this chatbot, you agree to the <a target='_blank' href='https://flowiseai.com/terms'>Terms & Condition</a>",
            textColor: 'black',
            buttonColor: '#3b82f6',
            buttonText: 'Start Chatting',
            buttonTextColor: 'white',
            blurredBackgroundColor: 'rgba(0, 0, 0, 0.4)',
            backgroundColor: 'white'
          },
          customCSS: 'button.fixed{border-radius: 50%; overflow: visible; padding: 10px;} button.fixed img{border-radius: 0;} figure.rounded-full img{border-radius: 0}', 
            chatWindow: {
                showTitle: true,
                showAgentMessages: true,
                title: 'DoggoBot',
                titleAvatarSrc: '/messenger2.png',
                welcomeMessage: 'Ask me anything about dogs',
                errorMessage: 'This is a custom error message',
                backgroundColor: '#ffffff',
                backgroundImage: 'enter image path or link',
                height: 700,
                width: 400,
                fontSize: 16,
                starterPrompts: [
                    "Tell me something interesting about Golden Retrievers",
                    "Tell me something interesting about Poodles",
                ],
                starterPromptFontSize: 15,
                clearChatOnReload: false,
                sourceDocsTitle: 'Sources:',
                renderHTML: true,
                botMessage: {
                    backgroundColor: '#f7f8ff',
                    textColor: '#303235',
                    showAvatar: true,
                    avatarSrc: '/messenger2.png'
                },
                userMessage: {
                    backgroundColor: '#3B81F6',
                    textColor: '#ffffff',
                    showAvatar: true,
                    avatarSrc: '/messenger.png'
                },
                textInput: {
                    placeholder: 'Type your question',
                    backgroundColor: '#ffffff',
                    textColor: '#303235',
                    sendButtonColor: '#3B81F6',
                    maxChars: 50,
                    maxCharsWarningMessage: 'You exceeded the characters limit. Please input less than 50 characters.',
                    autoFocus: true,
                },
                feedback: {
                    color: '#303235'
                },
                dateTimeToggle: {
                    date: true,
                    time: true
                },
                footer: {
                    textColor: '#303235',
                    text: 'Powered by',
                    company: 'Huddll',
                    companyLink: '/'
                }
            }
        }
    });
    `;
    document.body.appendChild(script);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
  
    if (response.ok) {
      alert('Email sent successfully');
    } else {
      alert('Error sending email');
    }
  };

  return (
    <div className={styles.page}>
      <header>
        <nav>
          <div className={styles.logo}>
            <Link href="/">
              <img src="/LogoSmall.png" alt="Logo" />
            </Link>
          </div>
          <div className={styles.navLinks}>
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#contact">Contact</a>
          </div>
        </nav>
      </header>

      <main>
        <section id="hero" className={styles.hero}>
          <h1>Transform Your Business with AI Chatbots</h1>
          <p>
            24/7 customer support, increased engagement, and better user
            experience
          </p>
          <button className={styles.ctaButton}>Get Started</button>
        </section>

        <section id="features" className={styles.features}>
          <h2>Features</h2>
          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <h3>24/7 Availability</h3>
              <p>Always ready to assist your customers</p>
            </div>
            <div className={styles.featureCard}>
              <h3>Custom Training</h3>
              <p>Tailored to your business needs</p>
            </div>
            <div className={styles.featureCard}>
              <h3>Multi-language Support</h3>
              <p>Connect with customers globally</p>
            </div>
          </div>
        </section>

        <section id="pricing" className={styles.pricing}>
          <h2>Pricing Plans</h2>
          <div className={styles.pricingGrid}>
            <div className={styles.pricingCard}>
              <h3>Basic</h3>
              <p className={styles.price}>$99/month</p>
              <ul>
                <li>Basic chatbot functionality</li>
                <li>Up to 1000 messages/month</li>
                <li>Email support</li>
              </ul>
              <StripeButton priceId="price_1Qiv3KKzyhM3L3BGPrSyf7fP">
                Select Basic Plan
              </StripeButton>
            </div>
            <div className={`${styles.pricingCard} ${styles.featured}`}>
              <h3>Professional</h3>
              <p className={styles.price}>$199/month</p>
              <ul>
                <li>Advanced AI capabilities</li>
                <li>Unlimited messages</li>
                <li>24/7 support</li>
                <li>Custom training</li>
              </ul>
              <StripeButton priceId="price_1QiuyRKzyhM3L3BGcMPw7NEC">
                Select Pro Plan
              </StripeButton>
            </div>
          </div>
        </section>

        <section id="contact" className={styles.contact}>
          <h2>Contact Us</h2>
          <form id="contact-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            <button type="submit">Send Message</button>
          </form>
        </section>
        
      </main>

      <footer className={styles.footer}>
        <p>&copy; 2024 Huddll. All rights reserved.</p>
      </footer>
    </div>
  );
}
