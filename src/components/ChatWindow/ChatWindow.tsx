import { useEffect, useState } from "react";
import { fetchMessages, sendMessage } from "../../api/message";
import type { Message } from "../../types/message";
import { MessageBubble } from "../MessageBubble/MessageBubble";
import { MessageInput } from "../MessageInput/MessageInput";
import styles from "./ChatWindow.module.css";

export const ChatWindow = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const loadMessages = async () => {
    try {
      setLoading(true);
      const messages = await fetchMessages();
      messages.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
      setMessages(messages);
      setLoading(false);
    } catch (error) {
      console.log("API couldn't load the data ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleSend = async (text: string) => {
    try {
      await sendMessage(text, "Arpit vicky");
      await loadMessages();
    } catch (error) {
      console.log("API couldn't post the message  ", error);
    }
  };

  if (loading) return <p>loading messages....</p>;

  return (
    <>
      <div className={styles.messagesWrapper}>
        {messages.map((message) => (
          <MessageBubble key={message._id} message={message} />
        ))}
      </div>
      <div className={styles.inputWrapper}>
        <MessageInput onMessageSend={handleSend} />
      </div>
    </>
  );
};
