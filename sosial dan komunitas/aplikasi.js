import { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

export default function ChatApp() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("message", message);
      setMessage("");
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-xl font-bold">Live Chat</h1>
      <div className="border p-4 h-64 overflow-y-auto mb-4">
        {messages.map((msg, index) => (
          <div key={index} className="p-2 bg-gray-200 rounded my-2">
            {msg}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="border p-2 w-full"
        placeholder="Type a message..."
      />
      <button onClick={sendMessage} className="mt-2 p-2 bg-blue-500 text-white rounded w-full">
        Send
      </button>
    </div>
  );
}
