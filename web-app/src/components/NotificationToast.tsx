import { useState, useEffect } from 'react';

export default function NotificationToast() {
  const [messages, setMessages] = useState<{ id: number; text: string }[]>([]);

  // Simulate grabbing notifications. In a real scenario, this would
  // subscribe to the Zustand store or a separate pub/sub event system.
  useEffect(() => {
    // Demo notification
    const id = Date.now();
    setMessages([{ id, text: 'Welcome to Space Company!' }]);

    const timer = setTimeout(() => {
      setMessages((prev) => prev.filter((m) => m.id !== id));
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 space-y-2 z-50">
      {messages.map((m) => (
        <div key={m.id} className="bg-gray-800 text-white p-4 rounded-xl shadow-2xl border-l-4 border-blue-500 animate-slide-in-right opacity-90 hover:opacity-100 transition-opacity">
          {m.text}
        </div>
      ))}
    </div>
  );
}