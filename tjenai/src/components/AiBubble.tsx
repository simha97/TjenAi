import React from "react";

interface UserBubbleProps {
  reply: string;
  correction?: string;
}

function AiBubble({ reply, correction }: UserBubbleProps) {
  return (
    <div
      style={{ backgroundColor: "#ffffff" }}
      className="self-start max-w-[80%]  text-gray-800 px-6 py-4 rounded-2xl rounded-bl-none mb-3 shadow-md"
    >
      <div className="border-l-2 mb-4 pl-3 text-gray-400">
        {correction === "✅" ? "✅" : `❌ ${correction}`}
      </div>
      <div>{reply}</div>
    </div>
  );
}

export default AiBubble;
