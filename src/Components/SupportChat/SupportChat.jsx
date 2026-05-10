import React, { useEffect, useRef, useState, useCallback } from "react";
import { pickAgentReply } from "../../data/chatAgentReplies";
import "./SupportChat.css";

const OPENING_LINE =
  "Hi — Amazon.co.za help (demo). Ask about orders, delivery, cart, returns… or type help.";

function SupportChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(() => [
    { id: "welcome", role: "agent", text: OPENING_LINE },
  ]);
  const [thinking, setThinking] = useState(false);
  const listRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      if (listRef.current) {
        listRef.current.scrollTop = listRef.current.scrollHeight;
      }
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, open, thinking, scrollToBottom]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const sendMessage = () => {
    const text = input.trim();
    if (!text || thinking) return;
    const userMsg = {
      id: `u-${Date.now()}`,
      role: "user",
      text,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setThinking(true);

    window.setTimeout(() => {
      const reply = pickAgentReply(text);
      setMessages((prev) => [
        ...prev,
        { id: `a-${Date.now()}`, role: "agent", text: reply },
      ]);
      setThinking(false);
    }, 520);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <div className="support-chat" aria-live="polite">
      {!open ? (
        <button
          type="button"
          className="support-chat-bubble"
          onClick={() => setOpen(true)}
          aria-expanded="false"
          aria-controls="support-chat-panel"
          title="Customer support chat (demo)"
        >
          <i className="fas fa-comment-dots" aria-hidden />
        </button>
      ) : (
        <div id="support-chat-panel" className="support-chat-panel" role="dialog" aria-labelledby="support-chat-title">
          <header className="support-chat-header">
            <div>
              <h2 id="support-chat-title">Support</h2>
              <p className="support-chat-sub">Demo replies only</p>
            </div>
            <button
              type="button"
              className="support-chat-close"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              <i className="fas fa-times" aria-hidden />
            </button>
          </header>
          <div ref={listRef} className="support-chat-messages" tabIndex={0}>
            {messages.map((m) => (
              <div
                key={m.id}
                className={`support-chat-msg support-chat-msg--${m.role}`}
              >
                <span className="support-chat-msg-role">
                  {m.role === "agent" ? "Assistant" : "You"}
                </span>
                <p className="support-chat-msg-text">{m.text}</p>
              </div>
            ))}
            {thinking ? (
              <div className="support-chat-thinking" aria-busy="true">
                <span className="dot" />
                <span className="dot" />
                <span className="dot" />
              </div>
            ) : null}
          </div>
          <form className="support-chat-form" onSubmit={onSubmit}>
            <label htmlFor="support-chat-input" className="visually-hidden">
              Message support
            </label>
            <input
              id="support-chat-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a question…"
              autoComplete="off"
              disabled={thinking}
            />
            <button type="submit" disabled={thinking || !input.trim()}>
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default SupportChat;
