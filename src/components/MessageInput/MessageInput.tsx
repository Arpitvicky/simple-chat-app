// src/components/MessageInput.tsx
import { useState } from "react";
import styles from "./MessageInput.module.css";

interface Props {
  onMessageSend: (msg: string) => void;
}
export const MessageInput = ({ onMessageSend }: Props) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) alert("Please enter your message");
    onMessageSend(message.trim());
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        className={styles.input}
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit" className={styles.button}>
        Send
      </button>
    </form>
  );
};
