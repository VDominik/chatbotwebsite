import React, { useState, useEffect, useRef } from "react";
import ChatBubble from "./ChatBubble.js";
import { SendHorizonal, Mic } from "lucide-react";
import Link from "next/link";

const defaultConversation = [
  { message: "Hi there! How can I help you today?", isUser: false, delay: 800 },
  {
    message:
      "I need help setting up automated customer service for my online store.",
    isUser: true,
    delay: 2000,
  },
  {
    message:
      "I'd be happy to help with that! Our AI chatbot can handle customer inquiries 24/7, answer FAQs, process returns, and even provide personalized product recommendations. Would you like me to explain how to implement this?",
    isUser: false,
    delay: 3500,
    typing: true,
  },
];

export default function ChatPreview() {
  const [messages, setMessages] = useState(defaultConversation);
  const [input, setInput] = useState("");
  const [isDemo, setIsDemo] = useState(false);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    setMessages((prev) => [
      ...prev,
      { message: input, isUser: true, delay: 0 },
    ]);
    setInput("");
    setIsDemo(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          message:
            "Thanks for your message! This is a demonstration of how our AI chatbot responds to customer inquiries. In a real implementation, our AI would provide specific answers based on your business needs.",
          isUser: false,
          delay: 0,
          typing: true,
        },
      ]);
    }, 1000);
  };

  return (
    <div
      style={{
        height: "100%",
        maxHeight: "500px",
      }}
    >
      <div
        style={{
          height: "50px",
          backgroundColor: "#3B81F6",
          borderRadius: "12px 12px 0 0",
          color: "white",
          fontSize: "18px",
          display: "flex",
          alignItems: "center",
          paddingLeft: "16px",
        }}
      >
        UpTalk Studio Bot
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          maxHeight: "500px",
          overflow: "scroll",
          border: "1px solid #eee",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          backgroundColor: "white",
          position: "relative", // optional if needed for absolute positioning
          padding: "10px",
          borderRadius: "0 0 12px 12px",
        }}
      >
        <div
          ref={chatContainerRef}
          style={{
            flex: 1,
            overflowY: "auto",
            paddingBottom: "60px", // to keep enough space for the form
          }}
        >
          {messages.map((msg, index) => (
            <ChatBubble
              key={index}
              message={msg.message}
              isUser={msg.isUser}
              delay={msg.delay}
              typing={msg.typing}
            />
          ))}
        </div>
        <form
          onSubmit={handleSendMessage}
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "auto", // pushes form to the bottom of the flex container
          }}
        >
          <div
            style={{
              borderRadius: "10px",
              display: "flex",
              width: "100%",
              padding: "5px",
              border: "1px solid #eee",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              style={{
                flex: 1,
                padding: "10px",
                border: "none",
                marginRight: "10px",
              }}
            />
            <div>
              <button
                style={{
                  backgroundColor: "white",
                  color: "#3B81F6",
                  border: "none",
                  padding: "10px 15px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                <Mic size={20} />
              </button>

              <button
                type="submit"
                style={{
                  backgroundColor: "white",
                  color: "#3B81F6",
                  border: "none",
                  padding: "10px 15px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                <SendHorizonal size={20} />
              </button>
            </div>
          </div>
        </form>
        <div
          style={{
            display: "flex",
            gap: "8px",
            alignContent: "center",
            justifyContent: "center",
            fontSize: "12px",
            paddingTop: "10px",
          }}
        >
          <p>Powered by</p>
          <Link
            href={"/"}
            style={{
              textDecoration: "none",
              fontWeight: "bold",
              color: "#333",
            }}
          >
            Uptalk Studio
          </Link>
        </div>
      </div>
    </div>
  );
}
