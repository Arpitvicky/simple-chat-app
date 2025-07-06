import { useCallback, useEffect, useRef, useState } from "react";
import { fetchMessages, sendMessage } from "../../api/message";
import type { Message } from "../../types/message";
import { debounce } from "../../utils/debounce";
import { MessageBubble } from "../MessageBubble/MessageBubble";
import { MessageInput } from "../MessageInput/MessageInput";
import styles from "./ChatWindow.module.css";

export const ChatWindow = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [isMore, setIsMore] = useState<boolean>(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesWrapperRef = useRef<HTMLDivElement>(null);

  // requestAnimationFrame for smoother updates
  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      requestAnimationFrame(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      });
    }
  }, []);

  const loadMessages = useCallback(
    async (before: string = "", isAppend: boolean = false) => {
      try {
        setLoading(true);
        const messages = await fetchMessages(before);
        messages.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );

        setMessages((prev: Message[]) =>
          isAppend ? [...messages, ...prev] : messages
        );
        setIsMore(messages.length > 0); // check if messages are still coming or not
        setLoading(false);
      } catch (error) {
        setIsError(true);
        console.log("API couldn't load the data ", error);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    loadMessages();
  }, []);

  const handleSend = useCallback(
    async (text: string) => {
      try {
        await sendMessage(text, "Arpit vicky");
        await loadMessages();
        scrollToBottom();
      } catch (error) {
        alert("Sorry, looks like some issue sending message");
        console.log("API couldn't post the message  ", error);
      }
    },
    [loadMessages, scrollToBottom]
  );

  const handleScroll = useCallback(
    debounce(() => {
      if (!messagesWrapperRef.current || loading || !isMore) return;
      const { scrollTop } = messagesWrapperRef.current;
      // load messages when user is withing 50px from top
      if (scrollTop < 50 && messages.length > 0) {
        loadMessages(messages[0].createdAt, true);
      }
    }, 200),
    [loading, isMore, messages, loadMessages]
  );

  if (loading) return <p>loading messages....</p>;
  return (
    <>
      <div
        className={styles.messagesWrapper}
        onScroll={handleScroll}
        ref={messagesWrapperRef}
      >
        {isError ? (
          <h2>Sorry, at this moment messages can't be fetched</h2>
        ) : (
          <>
            {messages.map((message) => (
              <MessageBubble key={message._id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>
      <div className={styles.inputWrapper}>
        <MessageInput onMessageSend={handleSend} />
      </div>
    </>
  );
};
