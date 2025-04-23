"use client";
import React, { useEffect, useState } from "react";
import { sendMessageToAI } from "../../utils/server";
import UserBubble from "@/components/UserBubble";
import AiBubble from "@/components/AiBubble";
import { useSearchParams, useRouter } from "next/navigation";
import LoadingBubble from "@/components/loadingBubble";

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
  correction?: string;
}

function ChatPage() {
  const params = useSearchParams();
  const router = useRouter();

  const userLanguage = params.get("userLanguage");
  const languageToLearn = params.get("languageToLearn");
  const level = params.get("level");

  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  useEffect(() => {
    if (userLanguage && languageToLearn && level) {
      setMessages([
        {
          role: "system",
          content: `You are a friendly and concise AI language tutor helping the user learn ${languageToLearn} at a(n) ${level} level.

Always reply in ${languageToLearn}, using short, natural sentences (2–3 max). Tailor your grammar and vocabulary to match a ${level} learner.

At the end of each reply, ask a simple follow-up question in ${languageToLearn} to keep the conversation going.

If the user makes a language mistake:
- Correct it briefly.
- Provide a short explanation in ${userLanguage}.
- Include the corrected example in ${languageToLearn}.

If the user writes in a language other than ${languageToLearn}, translate their input and include the translation in the correction field.

If the message is unclear, nonsensical, or not related to language learning, return in the correction field: "I didn’t understand. Please rephrase."

Use the function **languageTutorReply** to return your response
`,
        },
      ]);
    }
  }, [userLanguage, languageToLearn, level]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setMessages((prev) => {
      const newMessages = [...prev];
      return [...newMessages, { role: "user", content: input }];
    });

    setInput("");
  };
  useEffect(() => {
    const fetchAIResponse = async () => {
      if (
        messages.length === 0 ||
        messages[messages.length - 1].role === "assistant"
      ) {
        return; //DO NOT FETCH if the last message is from assistant
      }
      try {
        // Always keep the first message (system prompt)
        setLoading(true);
        const systemMessage = messages[0];

        // Take the last 4 messages to save tokens
        const recentMessages = messages.slice(-4);

        // Build filtered array with system + recent messages only + removing the correction key before sending the messages to the AI because it is unnecessarily
        const filteredMessages = [systemMessage, ...recentMessages].map(
          ({ role, content }) => ({
            role,
            content,
          })
        );
        const response = await sendMessageToAI(filteredMessages);
        setLoading(false);
        const newAiMsg: Message = {
          role: "assistant",
          content: response.reply,
          correction: response.correction,
        };
        setMessages((prev) => [...prev, newAiMsg]);
        setError(false);
      } catch (error) {
        console.error("Error fetching response from AI:", error);
        setError(true);
      }
    };

    fetchAIResponse();
  }, [messages]);

  useEffect(() => {
    document.getElementById("chat-input")?.focus();
  }, []);

  return (
    <>
      <main className="w-full h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="flex flex-col w-full h-full max-w-2xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200">
          <div className="bg-indigo-700 text-white p-4 flex items-center justify-between shadow-md">
            {/* Back Button */}
            <button
              onClick={() => router.back()}
              className="bg-white text-indigo-700 px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors"
            >
              Back
            </button>

            {/* Title */}
            <h2 className="text-xl font-semibold text-center flex-1">
              Chat with TjenAI
            </h2>

            {/* Spacer to keep title centered */}
            <div className="w-20" />
          </div>{" "}
          {/* Scrollable messages container */}
          <div
            style={{ backgroundColor: "#f6f6f6" }}
            className="relative flex-1 p-4 overflow-y-auto flex flex-col-reverse space-y-2 space-y-reverse"
          >
            {error && (
              <h1
                aria-live="assertive"
                className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-400 text-white px-4 py-2 rounded-md shadow-lg z-50"
              >
                An error occurred, please try again
              </h1>
            )}
            {loading && <LoadingBubble />}
            {messages
              .slice()
              .reverse()
              .map((message, index) =>
                message.role === "user" ? (
                  <UserBubble key={index} text={message.content} />
                ) : message.role === "assistant" ? (
                  <AiBubble
                    key={index}
                    reply={message.content}
                    correction={message.correction}
                  />
                ) : null
              )}
          </div>
          {/* Input form */}
          <form onSubmit={handleSubmit} className="p-4">
            <div className="flex gap-2">
              <input
                id="chat-input"
                type="text"
                placeholder="Type your message..."
                autoComplete="off"
                className="flex-1 h-12 rounded-2xl px-4 text-base border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className={`bg-slate-700 text-white px-6 rounded-lg transition-colors
    ${
      !input.trim()
        ? "opacity-50 cursor-not-allowed"
        : "hover:bg-slate-900 focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
    }`}
              >
                Send
              </button>
            </div>
          </form>{" "}
        </div>
      </main>
    </>
  );
}

export default ChatPage;
