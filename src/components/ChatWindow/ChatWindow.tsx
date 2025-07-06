import { MessageBubble } from "../MessageBubble/MessageBubble";
import { MessageInput } from "../MessageInput/MessageInput";

export const ChatWindow = () => {
  return (
    <>
      <h1>A simple chat application</h1>
      <MessageBubble />
      <MessageInput />
    </>
  );
};
