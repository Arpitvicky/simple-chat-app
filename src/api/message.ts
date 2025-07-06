import type { Message } from "../types/message";
const BASE_URL = "http://localhost:3000/api/v1/messages";
const TOKEN = "super-secret-doodle-token";
export const fetchMessages = async (): Promise<Message[]> => {
  const data = await fetch(BASE_URL, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  const response = await data.json();
  return response;
};

export const sendMessage = async (message: string, author: string) => {
  const data = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message, author }),
  });
  const response = await data.json();
  return response;
};
