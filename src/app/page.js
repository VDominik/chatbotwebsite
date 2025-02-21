"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import StripeButton from "@/components/StripeButton";
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "@/components/Navbar";

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
                title: 'UpTalk Studio',
                titleAvatarSrc: '/messenger2.png',
                welcomeMessage: 'Ask me about our products and services',
                errorMessage: 'This is a custom error message',
                backgroundColor: '#ffffff',
                backgroundImage: 'enter image path or link',
                height: 700,
                width: 400,
                fontSize: 16,
                starterPrompts: [
                    "How does it work?",
                    "What is the pricing?",
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
                    company: 'UpTalk Studio',
                    companyLink: '/'
                }
            }
        }
    });
    `;
    document.body.appendChild(script);
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleClick = () => {
    toast.info("Please contact us or login before selecting a plan.", {
      autoClose: 5000, // The toast will automatically close after 5 seconds
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        toast.success('Email sent successfully');
        // Clear the form inputs
        setFormData({
          name: '',
          email: '',
          message: '',
        });
      } else {
        console.error('Error sending email:', result);
        toast.error(`Error sending email: ${result.message}`);
      }
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error(`Error sending email: ${error.message}`);
    }
  };

  return (
    <div className={styles.page}>
      <Navbar />
      <main>
        <section id="hero" className={styles.hero}>
          <h1>Transform Your Business with AI Chatbots</h1>
          <p>
            24/7 customer support, increased engagement, and better user
            experience
          </p>
          <Link href="#contact">
          <button className={styles.ctaButton}>Get Started</button>
          </Link>
        </section>

        <section id="features" className={styles.features}>
          <h2>Features</h2>
          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <h3>24/7 Availability</h3>
              <p>Always ready to assist your customers, ensuring instant responses at any time.</p>
            </div>
            <div className={styles.featureCard}>
              <h3>Custom Training</h3>
              <p>Tailored to your business needs for smarter, more relevant interactions.</p>
            </div>
            <div className={styles.featureCard}>
              <h3>Multi-language Support</h3>
              <p>Engage customers globally with seamless multilingual communication.</p>
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
                <li> &#10004; Essential chatbot functionality</li>
                <li> &#10004; AI-powered responses from uploaded documents</li>
                <li> &#10004; Email support</li>
              </ul>
              {/* <StripeButton priceId="price_1Qiv3KKzyhM3L3BGPrSyf7fP">
                Select Basic Plan
              </StripeButton> */}
              <Link href="#contact">
                <button onClick={handleClick} className={styles.selectPlan}>Select Basic Plan</button>
              </Link>
              <p className={styles.bestfortext}>Ideal for small businesses & individuals who need a simple yet powerful document-based chatbot without complex automation.</p>
            </div>
            <div className={`${styles.pricingCard} ${styles.featured}`}>
              <h3>Professional</h3>
              <p className={styles.price}>$149/month</p>
              <ul>
                <li>Everything in Basic, plus:</li>
                <li> &#10004; Automated lead capture</li>
                <li> &#10004; Analytics & reporting</li>
                <li> &#10004; Continuous AI learning & document updates</li>
                <li> &#10004; Conversation storage & Google Docs sync</li>

              </ul>
              {/* <StripeButton priceId="price_1QiuyRKzyhM3L3BGcMPw7NEC">
                Select Pro Plan
              </StripeButton> */}
              <Link href="#contact">
                <button onClick={handleClick} className={styles.selectPlan}>Select Pro Plan</button>
              </Link>
              <p className={styles.bestfortext}>Best for businesses that want more automation, smarter AI, and insights from customer interactions.</p>
            </div>
            <div className={`${styles.pricingCard}`}>
              <h3>Enterprise</h3>
              <p className={styles.price}>Custom Pricing</p>
              <ul>
                <li>Everything in Professional, plus</li>
                <li> &#10004; White-label chatbot</li>
                <li> &#10004;	API access for deeper integration</li>
                <li> &#10004; Personalized Setup</li>
              </ul>
              {/* <StripeButton priceId="price_1QiuyRKzyhM3L3BGcMPw7NEC">
                Select Pro Plan
              </StripeButton> */}
              <Link href="#contact">
                <button onClick={handleClick} className={styles.selectPlan}>Request a Consultation</button>
              </Link>
              <p className={styles.bestfortext}>For Companies that need full control, deeper integrations, and a chatbot that fits into their existing systems.</p>
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
        <p>&copy; 2024 UpTalk Studio. All rights reserved.</p>
      </footer>

      <ToastContainer position="bottom-left" />

    </div>
  );
}
