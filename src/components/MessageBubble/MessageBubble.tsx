import dayjs from "dayjs";
import type { Message } from "../../types/message";
import styles from "./MessageBubble.module.css";

export const MessageBubble = ({ message }: { message: Message }) => {
  const isSelf = message.author === "Arpit vicky";

  return (
    <div className={`${styles.bubble} ${isSelf ? styles.own : styles.other}`}>
      <div className={styles.author}>{message.author}</div>
      <div className={styles.message}>{message.message}</div>
      <div className={styles.time}>
        {dayjs(message.createdAt).format("D MMM YYYY HH:mm")}
      </div>
    </div>
  );
};
