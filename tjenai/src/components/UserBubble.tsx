import React from "react";

interface UserBubbleProps {
  text: string;
}

function UserBubble({ text }: UserBubbleProps) {
  return (
    <div
      style={{ backgroundColor: "#333333" }}
      className="self-end max-w-[80% text-white px-6 py-4 rounded-2xl rounded-br-none mb-3 shadow-md"
    >
      {text}
    </div>
  );
}

export default UserBubble;
