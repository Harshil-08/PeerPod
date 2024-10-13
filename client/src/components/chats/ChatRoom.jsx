import React from "react";
import { useParams } from "react-router-dom";
import { useRoom } from "../../hooks/useRoom";
import { useAuth } from "../../hooks/useAuth";
import { Chat } from "./Chat";

export const ChatRoom = () => {
  const { roomId } = useParams();
  const { rooms } = useRoom();
  const { userRole } = useAuth();

  const room = rooms[roomId];

  if (
    !room ||
    (!room.allowedRoles.includes(userRole) && userRole !== "faculty")
  ) {
    return <div>You don't have access to this room.</div>;
  }

  return <Chat roomId={roomId} />;
};

export default ChatRoom;
