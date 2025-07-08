import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MessageBubble } from "./MessageBubble";

vi.mock("dayjs", () => {
  return {
    default: () => ({
      format: () => "6 Jul 2025 20:39",
    }),
  };
});

describe("MessageBubble", () => {
  const mockMessage = {
    _id: "1",
    author: "Arpit vicky",
    message: "Hello, world!",
    createdAt: "2025-07-06T20:39:00Z",
  };

  it("renders message, author, and timestamp for self", () => {
    render(<MessageBubble message={mockMessage} />);

    expect(screen.getByText("Arpit vicky")).toBeInTheDocument();
    expect(screen.getByText("Hello, world!")).toBeInTheDocument();
    expect(screen.getByText("6 Jul 2025 20:39")).toBeInTheDocument();
  });

  it("renders message, author, and timestamp for other user", () => {
    const otherMessage = {
      ...mockMessage,
      author: "John Doe",
    };
    render(<MessageBubble message={otherMessage} />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Hello, world!")).toBeInTheDocument();
    expect(screen.getByText("6 Jul 2025 20:39")).toBeInTheDocument();
  });
});
