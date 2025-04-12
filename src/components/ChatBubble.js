import React, { useState, useEffect } from "react";

export default function ChatBubble({
  message,
  isUser = false,
  delay = 0,
  typing = false,
}) {
  const [visible, setVisible] = useState(delay === 0);
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(typing);
  const [typingIndex, setTypingIndex] = useState(0);

  useEffect(() => {
    if (delay > 0) {
      const timer = setTimeout(() => {
        setVisible(true);
        if (typing) {
          setIsTyping(true);
        }
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [delay, typing]);

  useEffect(() => {
    if (isTyping && typingIndex < message.length) {
      const timer = setTimeout(() => {
        setTypedText((prev) => prev + message[typingIndex]);
        setTypingIndex((prev) => prev + 1);
      }, 50); // Simulate typing speed
      return () => clearTimeout(timer);
    } else {
      setIsTyping(false);
    }
  }, [isTyping, typingIndex, message]);

  if (!visible) {
    return null;
  }

  return (
    <div
      className={`chat-bubble ${isUser ? "user-bubble" : "bot-bubble"}`}
      style={{
        backgroundColor: isUser ? "#3B81F6" : "#f7f8ff",
        color: isUser ? "#fff" : "#000",
        padding: "10px",
        borderRadius: "10px",
        maxWidth: "70%",
        margin: isUser ? "10px 0 10px auto" : "10px auto 10px 0",
        textAlign: "left",
      }}
    >
      {isTyping ? typedText : message}
    </div>
  );
}
