import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MessageInput } from "./MessageInput";

describe("MessageInput", () => {
  it("renders input and button", () => {
    render(<MessageInput onMessageSend={() => {}} />);
    expect(screen.getByPlaceholderText("Message")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /send/i })).toBeInTheDocument();
  });

  it("sends message when form is submitted", () => {
    const mockSend = vi.fn();
    render(<MessageInput onMessageSend={mockSend} />);

    const input = screen.getByPlaceholderText("Message") as HTMLInputElement;
    const button = screen.getByRole("button");

    fireEvent.change(input, { target: { value: "Hello!" } });
    fireEvent.click(button);

    expect(mockSend).toHaveBeenCalledWith("Hello!");
    expect(input.value).toBe("");
  });

  it("does not send if input is empty or only spaces", () => {
    const mockSend = vi.fn();
    render(<MessageInput onMessageSend={mockSend} />);

    const input = screen.getByPlaceholderText("Message");
    const button = screen.getByRole("button");

    fireEvent.change(input, { target: { value: "   " } });
    fireEvent.click(button);

    expect(mockSend).not.toHaveBeenCalled();
  });
});
