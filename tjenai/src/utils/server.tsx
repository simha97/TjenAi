interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}
export const sendMessageToAI = async (messages: Message[]) => {
  const response = await fetch(
    "https://openai-api-worker.simon-hallak-3.workers.dev/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messages),
    }
  );
  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }
  return await response.json();
};
