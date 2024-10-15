import React from "react";
import { useParams } from "react-router-dom";
import { useRoom } from "../../hooks/useRoom";
import { Chat } from "./Chat";
import { useAuth } from "../../hooks/useAuth";

export const ChatRoom = () => {
  const { roomId } = useParams();
  const { rooms } = useRoom();
  const { role } = useAuth();

  const room = rooms[roomId];

  if (
    !room ||
    !room.allowedRoles.includes(role.toLowerCase()) ||
    !role.toLowerCase() === "faculty"
  ) {
    return <div>You don't have access to this room.</div>;
  }

  return <Chat roomId={roomId} />;
};

export default ChatRoom;
