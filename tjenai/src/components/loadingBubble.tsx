import React from "react";

function LoadingBubble() {
  return (
    <div
      style={{ backgroundColor: "#B1BAE5" }}
      className="self-start max-w-[80%]  text-gray-800 px-6 py-4 rounded-2xl rounded-bl-none mb-3 shadow-md"
    >
      <div>Thinking...</div>
    </div>
  );
}

export default LoadingBubble;
