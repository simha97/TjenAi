export const dynamic = "force-dynamic"; //  Prevents static prerendering (CSR only)

import { Suspense } from "react";
import ChatPage from "@/components/ChatPage";

export default function ChatWrapper() {
  return (
    <Suspense
      fallback={
        <div className="p-4 text-gray-600 text-center">
          Loading chat interface...
        </div>
      }
    >
      <ChatPage />
    </Suspense>
  );
}
