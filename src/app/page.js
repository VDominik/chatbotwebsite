"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import StripeButton from "@/components/StripeButton";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "@/components/Navbar";
import Footer from "@/app/Footer/Footer";
import ContactForm from "@/app/ContactForm/ContactForm";
import PricingPlans from "./PricingPlans/PricingPlans";
import {
  Bot,
  Brain,
  Globe,
  Clock,
  Shield,
  BarChart,
  CheckCircle2,
  Check,
  Contact,
} from "lucide-react";
import ChatPreview from "@/components/ChatPreview";

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
            tooltipFontSize: 16,
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

  return (
    <div className={styles.page}>
      <Navbar />
      <main>
        <section id="hero" className={styles.hero}>
          <span className="hero-span">Introducing UpTalk AI Chat</span>
          <h1>Transform Customer Support with Intelligent AI Chat</h1>
          <p className="hero-paragraph">
            Deploy a sophisticated AI chatbot that understands your customers,
            solves problems instantly, and scales with your business.
          </p>
          <div className={styles.heroButtons}>
            <Link href="#contact">
              <button className={styles.buttonPrimary}>Get Started</button>
            </Link>
            <Link href="#contact">
              <button className={styles.buttonSecondary}>Get Started</button>
            </Link>
          </div>
        </section>

        <section id="features" className={styles.features}>
          <div className={styles.featuresText}>
            <span className={styles.featuresSpan}>Powerful Capabilities</span>
            <h2>Next-Generation AI Features</h2>
            <p className={styles.featuresParagraph}>
              Our chatbot combines cutting-edge artificial intelligence with
              intuitive design to deliver exceptional customer experiences.
            </p>
          </div>
          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <Bot size={24} />
              </div>
              <h3>Natural Conversations</h3>
              <p className={styles.featuresCardParagraph}>
                Engage users with human-like dialogue that understands context,
                idioms, and customer sentiment.
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <Brain size={24} />
              </div>
              <h3>Adaptive Learning</h3>
              <p className={styles.featuresCardParagraph}>
                The AI learns from each interaction, continually improving its
                responses and customer experience.
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <Globe size={24} />
              </div>
              <h3>Multilingual Support</h3>
              <p className={styles.featuresCardParagraph}>
                Engage customers globally with seamless multilingual
                communication.
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <Clock size={24} />
              </div>
              <h3>24/7 Availability</h3>
              <p className={styles.featuresCardParagraph}>
                Provide instant support around the clock, eliminating wait times
                and enhancing satisfaction.
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <Shield size={24} />
              </div>
              <h3>Secure & Compliant</h3>
              <p className={styles.featuresCardParagraph}>
                Enterprise-grade security with full GDPR, CCPA, and
                industry-specific compliance built in.
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <BarChart size={24} />
              </div>
              <h3>Analytics Dashboard</h3>
              <p className={styles.featuresCardParagraph}>
                Gain valuable insights from conversations to improve products
                and customer experience.
              </p>
            </div>
          </div>
        </section>

        <section id="demo" className={styles.demo}>
          <div id="chatbot" className={styles.demoChatbot}>
            <ChatPreview />
          </div>
          <div className={styles.demoText}>
            <span className={styles.featuresSpan}>Interactive Demo</span>

            <h2>Experience the AI Difference</h2>
            <p className={styles.demoParagraph}>
              See how our AI chatbot delivers natural, helpful responses that
              solve customer problems in real-time. This interactive preview
              demonstrates the intelligence and personality of your future
              virtual assistant.
            </p>

            <div className={styles.demoChecks}>
              <div className={styles.demoCheck}>
                <div className={styles.demoCheckIcon}>
                  <CheckCircle2 />
                </div>
                <div className={styles.demoCheckText}>
                  Understands natural language and context
                </div>
              </div>
              <div className={styles.demoCheck}>
                <div className={styles.demoCheckIcon}>
                  <CheckCircle2 />
                </div>
                <div className={styles.demoCheckText}>
                  Learns from every customer interaction
                </div>
              </div>
              <div className={styles.demoCheck}>
                <div className={styles.demoCheckIcon}>
                  <CheckCircle2 />
                </div>
                <div className={styles.demoCheckText}>
                  Seamlessly transfers to human agents when needed
                </div>
              </div>
              <div className={styles.demoCheck}>
                <div className={styles.demoCheckIcon}>
                  <CheckCircle2 />
                </div>
                <div className={styles.demoCheckText}>
                  Integrates with your existing tools and CRM
                </div>
              </div>
              <div className={styles.demoCheck}>
                <div className={styles.demoCheckIcon}>
                  <CheckCircle2 />
                </div>
                <div className={styles.demoCheckText}>
                  Customizable to match your brand voice
                </div>
              </div>
              <div className={styles.demoCheck}>
                <div className={styles.demoCheckIcon}>
                  <CheckCircle2 />
                </div>
                <div className={styles.demoCheckText}>
                  Real-time analytics and performance tracking
                </div>
              </div>
              <i className={styles.demoItalic}>
                Try sending a message in the demo to see how the chatbot
                responds.
              </i>
            </div>
          </div>
        </section>

        <section id="benefits" className={styles.benefits}>
          <div className={styles.benefitsText}>
            <h2 className={styles.benefitsHeading2}>
              The Future of Customer Engagement
            </h2>
            <div className={styles.benefitsTextWrapper}>
              <p className={styles.benefitsParagraph}>
                As customer expectations evolve, businesses need AI solutions
                that can keep pace. Our platform doesn't just solve today's
                challenges—it prepares you for tomorrow's opportunities.
              </p>
              <div className={styles.demoCheck}>
                <div className={styles.benefitsCheckIcon}>
                  <Check size={12} />
                </div>
                <div className={styles.demoCheckText}>
                  Personalized customer journeys based on behavior and history
                </div>
              </div>
              <div className={styles.demoCheck}>
                <div className={styles.benefitsCheckIcon}>
                  <Check size={12} />
                </div>
                <div className={styles.demoCheckText}>
                  Proactive support that anticipates needs before they arise
                </div>
              </div>
              <div className={styles.demoCheck}>
                <div className={styles.benefitsCheckIcon}>
                  <Check size={12} />
                </div>
                <div className={styles.demoCheckText}>
                  Cross-channel consistency for seamless customer experiences
                </div>
              </div>
            </div>
          </div>
          <div className={styles.benefitsPercentage}>
            <div className={styles.benefitsPercentageText}>
              <h2>76%</h2>
              <p>
                of customers prefer self-service over talking to a company
                representative
              </p>
            </div>
            <p className="infotext">Source: Forrester Research</p>
          </div>
        </section>

        <PricingPlans isDashboard={false} />

        <ContactForm />
      </main>

      <Footer />

      <ToastContainer position="bottom-left" />
    </div>
  );
}
