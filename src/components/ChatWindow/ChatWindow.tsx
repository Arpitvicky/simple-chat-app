import { useEffect, useState } from "react";
import { fetchMessages } from "../../api/message";
import type { Message } from "../../types/message";
import { MessageBubble } from "../MessageBubble/MessageBubble";
import { MessageInput } from "../MessageInput/MessageInput";

export const ChatWindow = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const loadMessages = async () => {
    try {
      const messages = await fetchMessages();
      setMessages(messages);
    } catch (error) {
      console.log("API couldn't load the data ", error);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  console.log(messages);
  return (
    <>
      <h1>A simple chat application</h1>
      <MessageBubble />
      <MessageInput />
    </>
  );
};
