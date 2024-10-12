import { useState } from "react";

export const Chat = ({ messages }) => {
  const [allMessages, setAllMessages] = useState(messages);
  const [newMessage, setNewMessage] = useState("");

  const handleMessageSend = () => {
    if (newMessage.trim()) {
      setAllMessages((p) => [...p, newMessage]);
      setNewMessage("");
    }
  };

  const handleMessage = (e) => {
    setNewMessage(e.target.value);
  };

  return (
    <div className="flex h-screen antialiased text-gray-800">
      <div className="flex flex-row h-full w-full overflow-x-hidden">
        <div className="flex flex-col flex-auto h-[95%] p-6">
          <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
            <div className="flex flex-col h-full overflow-x-auto mb-4">
              <div className="flex flex-col h-full">
                <div className="grid grid-cols-12 gap-y-2">
                  {allMessages.map((m, i) => (
                    <MessageLeft key={i} message={m} />
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center h-16 drop-shadow-lg rounded-xl bg-white w-full px-4">
              <div className="flex-grow ml-4">
                <div className="relative w-full">
                  <input
                    value={newMessage}
                    onChange={handleMessage}
                    onKeyDown={handleMessage}
                    placeholder="type something..."
                    type="text"
                    className="flex w-full border border-gray-400/50 rounded-xl focus:outline-none focus:border-indigo-500 pl-4 h-10"
                  />
                  <button className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="ml-4">
                <button
                  onClick={handleMessageSend}
                  className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                >
                  <span>Send</span>
                  <span className="ml-2">
                    <svg
                      className="w-4 h-4 transform rotate-45 -mt-px"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      ></path>
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MessageLeft = ({ message }) => {
  return (
    <div className="col-start-1 col-end-8 p-3 rounded-lg">
      <div className="flex flex-row items-center">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 text-gray-50 flex-shrink-0">
          {message[0]}
        </div>
        <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
          <div>{message}</div>
        </div>
      </div>
    </div>
  );
};
